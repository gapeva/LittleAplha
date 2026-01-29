from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List
from ..models.models import RiskLevel

# Auth Schemas
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    is_active: bool
    class Config:
        from_attributes = True

# Dose Schemas
class DoseCreate(BaseModel):
    pass

class Dose(BaseModel):
    id: int
    timestamp: datetime
    class Config:
        from_attributes = True

# Symptom Schemas
class SymptomCreate(BaseModel):
    severity: int
    description: str

class Symptom(SymptomCreate):
    id: int
    timestamp: datetime
    meal_id: Optional[int]
    class Config:
        from_attributes = True
