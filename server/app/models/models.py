from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Enum, Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
import enum
from datetime import datetime

Base = declarative_base()

class RiskLevel(enum.Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    
    doses = relationship("DoseLog", back_populates="owner")
    meals = relationship("MealLog", back_populates="owner")
    streak = relationship("Streak", back_populates="owner", uselist=False)

class DoseLog(Base):
    __tablename__ = "dose_logs"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    owner = relationship("User", back_populates="doses")

class MealLog(Base):
    __tablename__ = "meal_logs"
    id = Column(Integer, primary_key=True, index=True)
    food_item = Column(String)
    risk_level = Column(Enum(RiskLevel), default=RiskLevel.LOW)
    timestamp = Column(DateTime, default=datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    owner = relationship("User", back_populates="meals")
    symptoms = relationship("Symptom", back_populates="meal")

class Symptom(Base):
    __tablename__ = "symptoms"
    id = Column(Integer, primary_key=True, index=True)
    severity = Column(Integer) # 1-10
    description = Column(String)
    timestamp = Column(DateTime, default=datetime.utcnow)
    meal_id = Column(Integer, ForeignKey("meal_logs.id"), nullable=True)
    user_id = Column(Integer, ForeignKey("users.id"))

class Streak(Base):
    __tablename__ = "streaks"
    id = Column(Integer, primary_key=True, index=True)
    current_count = Column(Integer, default=0)
    last_dose_date = Column(DateTime)
    user_id = Column(Integer, ForeignKey("users.id"))
    
    owner = relationship("User", back_populates="streak")
