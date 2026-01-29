from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ..models import models
from ..core.security import get_current_user # Assume dependency is built

router = APIRouter()

@router.get("/status")
def get_current_protection_status(
    db: Session = Depends(get_db), 
    current_user: models.User = Depends(get_current_user)
):
    # Fetch latest dose
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
