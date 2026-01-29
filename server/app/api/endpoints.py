from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models import models
from ..schemas import schemas # Added schemas import
from .deps import get_db, get_current_user # Added get_db and get_current_user
from .protection import calculate_protection_status # Fixed local import
from datetime import datetime, timedelta

router = APIRouter()

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
        return {"status": "IDLE", "message": "No dose taken today."}
    
    return calculate_protection_status(last_dose.timestamp)

@router.post("/dose")
def log_dose(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    new_dose = models.DoseLog(user_id=current_user.id)
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
        **symptom_data.dict(),
        user_id=current_user.id,
        meal_id=linked_meal.id if linked_meal else None
    )
    db.add(new_symptom)
    db.commit()
    return {"status": "success", "linked_to_meal": linked_meal.food_item if linked_meal else "None"}
