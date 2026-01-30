from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..models import models
from ..schemas import schemas
from .deps import get_db, get_current_user
from .protection import calculate_protection_status
from .auth import create_user, login
from datetime import datetime
from fastapi.security import OAuth2PasswordRequestForm

router = APIRouter()

@router.post("/signup", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return create_user(user, db)

@router.post("/login")
def login_route(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    return login(db, form_data)

@router.get("/status", response_model=schemas.StatusResponse)
def get_current_protection_status(
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    last_dose = db.query(models.DoseLog)\
        .filter(models.DoseLog.user_id == current_user.id)\
        .order_by(models.DoseLog.timestamp.desc())\
        .first()
    
    if not last_dose:
        return {
            "status": "IDLE", 
            "message": "Take a dose to start protection.", 
            "color": "#94a3b8", 
            "remaining": 0,
            "last_dose": None
        }
    
    status_data = calculate_protection_status(last_dose.timestamp)
    status_data["last_dose"] = last_dose.timestamp
    return status_data

@router.post("/dose")
def log_dose(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    new_dose = models.DoseLog(user_id=current_user.id, timestamp=datetime.utcnow())
    db.add(new_dose)
    
    # Update Streak Logic
    streak = db.query(models.Streak).filter(models.Streak.user_id == current_user.id).first()
    if streak:
        # Simple daily logic: check if last dose was 'yesterday' to increment, or today to ignore
        # For MVP, we just increment count for every dose for gratification
        streak.current_count += 1
        streak.last_dose_date = datetime.utcnow()
    
    db.commit()
    return {"message": "Dose logged successfully"}

@router.post("/meals", response_model=schemas.Meal)
def log_meal(
    meal_data: schemas.MealCreate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    new_meal = models.MealLog(
        **meal_data.dict(),
        user_id=current_user.id,
        timestamp=datetime.utcnow()
    )
    db.add(new_meal)
    db.commit()
    db.refresh(new_meal)
    return new_meal

@router.post("/symptoms", response_model=schemas.Symptom)
def log_symptom(
    symptom_data: schemas.SymptomCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    new_symptom = models.Symptom(
        **symptom_data.dict(),
        user_id=current_user.id,
        timestamp=datetime.utcnow()
    )
    db.add(new_symptom)
    db.commit()
    db.refresh(new_symptom)
    return new_symptom
