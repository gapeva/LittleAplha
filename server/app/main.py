from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import endpoints
from .models import models
from .api.deps import engine
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Create Database Tables (Fallback for initial deploy, recommend Alembic for updates)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Little Alpha API",
    description="HIPAA-Compliant Companion App API for Alpha-Gal Syndrome",
    version="1.0.0"
)

# CORS Configuration
# Production Note: Set ALLOWED_ORIGINS in Sevalla/Vercel to:
# "https://little-alpha.vercel.app,http://localhost:5173"
origins_str = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173")
origins = [origin.strip() for origin in origins_str.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(endpoints.router, prefix="/api")

@app.get("/")
def health_check():
    return {"status": "healthy", "service": "Little Alpha Production API"}
