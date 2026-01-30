from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models import models
from ..schemas import schemas
from .deps import get_db, get_current_user
from .protection import calculate_protection_status
from datetime import datetime, timedelta

router = APIRouter()

# --- Auth Routes are handled in auth.py, but we need to ensure main.py includes auth.py router too
# For this file structure, we will merge auth functionality here or ensure main includes both.
# Assuming main.py only includes endpoints.py, we need to import auth router content here 
# OR (Better Architecture) have main.py include multiple routers.
# For simplicity with your current structure, I will add the auth routes here.
from .auth import create_user, login # Import logic from auth.py

@router.post("/signup", response_model=schemas.User)
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):
    return create_user(user, db)

from fastapi.security import OAuth2PasswordRequestForm
@router.post("/login")
def login_route(db: Session = Depends(get_db), form_data: OAuth2PasswordRequestForm = Depends()):
    return login(db, form_data)

# --- App Routes ---

@router.get("/status")
def get_current_protection_status(
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    last_dose = db.query(models.DoseLog)\
        .filter(models.DoseLog.user_id == current_user.id)\
        .order_by(models.DoseLog.timestamp.desc())\
        .first()
    
    if not last_dose:
        return {"status": "IDLE", "message": "No dose taken today.", "remaining": 0}
    
    return calculate_protection_status(last_dose.timestamp)

@router.post("/dose")
def log_dose(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    new_dose = models.DoseLog(user_id=current_user.id, timestamp=datetime.utcnow())
    db.add(new_dose)
    db.commit()
    return {"message": "Dose logged successfully"}

@router.post("/symptoms")
def log_symptom(
    symptom_data: schemas.SymptomCreate, 
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    # Logic: Find the most recent meal within the last 8 hours
    eight_hours_ago = datetime.utcnow() - timedelta(hours=8)
    linked_meal = db.query(models.MealLog).filter(
        models.MealLog.user_id == current_user.id,
        models.MealLog.timestamp >= eight_hours_ago
    ).order_by(models.MealLog.timestamp.desc()).first()

    new_symptom = models.Symptom(
        severity=symptom_data.severity,
        description=symptom_data.description,
        user_id=current_user.id,
        meal_id=linked_meal.id if linked_meal else None,
        timestamp=datetime.utcnow()
    )
    db.add(new_symptom)
    db.commit()
    return {"status": "success", "linked_to_meal": linked_meal.food_item if linked_meal else "None"}
