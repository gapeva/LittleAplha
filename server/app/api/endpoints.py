import csv
import os
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..models import models
from ..schemas import schemas
from .deps import get_db, get_current_user
from .protection import calculate_protection_status
from .auth import create_user, login
from datetime import datetime, timedelta
from fastapi.security import OAuth2PasswordRequestForm
from typing import List

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
    
    streak_record = db.query(models.Streak).filter(models.Streak.user_id == current_user.id).first()
    current_streak = streak_record.current_count if streak_record else 0

    if not last_dose:
        return {
            "status": "IDLE", 
            "message": "Take a dose to start protection.", 
            "color": "#94a3b8", 
            "remaining": 0,
            "last_dose": None,
            "streak": current_streak
        }
    
    status_data = calculate_protection_status(last_dose.timestamp)
    status_data["last_dose"] = last_dose.timestamp
    status_data["streak"] = current_streak
    
    return status_data

@router.post("/dose")
def log_dose(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    new_dose = models.DoseLog(user_id=current_user.id, timestamp=datetime.utcnow())
    db.add(new_dose)
    
    streak = db.query(models.Streak).filter(models.Streak.user_id == current_user.id).first()
    if streak:
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
    meal_id = symptom_data.meal_id
    
    if not meal_id:
        recent_meal = db.query(models.MealLog)\
            .filter(models.MealLog.user_id == current_user.id)\
            .order_by(models.MealLog.timestamp.desc())\
            .first()
            
        if recent_meal:
            time_diff = datetime.utcnow() - recent_meal.timestamp
            if time_diff < timedelta(hours=4):
                meal_id = recent_meal.id

    new_symptom = models.Symptom(
        severity=symptom_data.severity,
        description=symptom_data.description,
        meal_id=meal_id,
        user_id=current_user.id,
        timestamp=datetime.utcnow()
    )
    db.add(new_symptom)
    db.commit()
    db.refresh(new_symptom)
    return new_symptom

@router.get("/history", response_model=List[schemas.TimelineEvent])
def get_history(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    doses = db.query(models.DoseLog)\
        .filter(models.DoseLog.user_id == current_user.id)\
        .order_by(models.DoseLog.timestamp.desc())\
        .limit(50)\
        .all()
        
    meals = db.query(models.MealLog)\
        .filter(models.MealLog.user_id == current_user.id)\
        .order_by(models.MealLog.timestamp.desc())\
        .limit(50)\
        .all()
        
    symptoms = db.query(models.Symptom)\
        .filter(models.Symptom.user_id == current_user.id)\
        .order_by(models.Symptom.timestamp.desc())\
        .limit(50)\
        .all()
    
    timeline = []
    
    for d in doses:
        timeline.append({
            "id": d.id, "type": "DOSE", "title": "Immunotherapy Dose", 
            "description": "Logged protection dose", "time": d.timestamp
        })
        
    for m in meals:
        timeline.append({
            "id": m.id, "type": "MEAL", "title": f"Meal: {m.food_item}",
            "description": f"Risk Level: {m.risk_level.value}", "time": m.timestamp
        })
        
    for s in symptoms:
        timeline.append({
            "id": s.id, "type": "SYMPTOM", "title": "Symptom Reported",
            "description": f"Severity {s.severity}/10 - {s.description}", "time": s.timestamp
        })
        
    timeline.sort(key=lambda x: x["time"], reverse=True)
    return timeline[:50]

# --- NEW WAITLIST ENDPOINT ---
@router.post("/waitlist")
def join_waitlist(data: schemas.WaitlistCreate):
    file_path = "marketing_waitlist.csv"
    file_exists = os.path.isfile(file_path)
    
    try:
        # Open in Append mode ('a') with UTF-8 encoding
        with open(file_path, mode='a', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            
            # Write Header if file is new
            if not file_exists:
                writer.writerow(["Timestamp", "Email", "Name", "Country", "Status", "Age", "Gender"])
            
            # Write Data
            writer.writerow([
                datetime.utcnow().isoformat(),
                data.email,
                data.full_name,
                data.country,
                data.ags_status,
                data.age_range,
                data.gender
            ])
            
        return {"message": "Added to waitlist successfully"}
    except Exception as e:
        print(f"CSV Error: {e}")
        raise HTTPException(status_code=500, detail="Could not save to waitlist")