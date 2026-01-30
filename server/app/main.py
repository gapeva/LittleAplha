from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import endpoints
from .models import models
from .api.deps import engine
import os
from dotenv import load_dotenv

load_dotenv()

# Create tables (For MVP - In production, use Alembic)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Little Alpha API")

# Production Security: CORS Configuration
# Ensure ALLOWED_ORIGINS is set in your Sevalla/Vercel environment variables.
# Example: "https://little-alpha.vercel.app,https://admin.little-alpha.com"
origins_str = os.getenv("ALLOWED_ORIGINS", "")
if not origins_str:
    # Fallback for local development if env var is missing
    origins = ["http://localhost:5173", "http://localhost:3000"]
else:
    origins = [origin.strip() for origin in origins_str.split(",")]

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
