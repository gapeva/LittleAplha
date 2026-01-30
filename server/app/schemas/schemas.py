from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum

# --- User Schemas ---
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    created_at: datetime = datetime.utcnow()

    class Config:
        from_attributes = True

# --- Meal Schemas ---
class RiskLevel(str, Enum):
    safe = "safe"
    low = "low"
    moderate = "moderate"
    high = "high"

class MealBase(BaseModel):
    food_item: str
    risk_level: RiskLevel

class MealCreate(MealBase):
    pass

class Meal(MealBase):
    id: int
    user_id: int
    timestamp: datetime

    class Config:
        from_attributes = True

# --- Symptom Schemas ---
class SymptomBase(BaseModel):
    severity: int
    description: Optional[str] = None
    meal_id: Optional[int] = None

class SymptomCreate(SymptomBase):
    pass

class Symptom(SymptomBase):
    id: int
    user_id: int
    timestamp: datetime

    class Config:
        from_attributes = True

# --- Status Schema ---
class StatusResponse(BaseModel):
    status: str
    message: str
    color: str
    remaining: float
    last_dose: Optional[datetime] = None
    streak: int

# --- History Schema ---
class TimelineEvent(BaseModel):
    id: int
    type: str
    title: str
    description: str
    time: datetime

# --- NEW: WAITLIST SCHEMA ---
class WaitlistCreate(BaseModel):
    email: EmailStr
    full_name: str
    country: str
    ags_status: str  # e.g., "patient", "relative"
    age_range: str
    gender: str