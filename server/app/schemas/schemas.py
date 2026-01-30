from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List, Union
from ..models.models import RiskLevel

class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    class Config:
        from_attributes = True

class Dose(BaseModel):
    id: int
    timestamp: datetime
    class Config:
        from_attributes = True

class MealCreate(BaseModel):
    food_item: str
    risk_level: RiskLevel = RiskLevel.LOW

class Meal(MealCreate):
    id: int
    timestamp: datetime
    class Config:
        from_attributes = True

class SymptomCreate(BaseModel):
    severity: int
    description: str
    meal_id: Optional[int] = None

class Symptom(SymptomCreate):
    id: int
    timestamp: datetime
    class Config:
        from_attributes = True

class StatusResponse(BaseModel):
    status: str
    message: str
    color: str
    remaining: float
    last_dose: Optional[datetime] = None

# Unified Timeline Schema for Dashboard
class TimelineEvent(BaseModel):
    id: int
    type: str  # 'DOSE', 'MEAL', 'SYMPTOM'
    title: str
    description: Optional[str] = None
    time: datetime
    
    class Config:
        from_attributes = True
