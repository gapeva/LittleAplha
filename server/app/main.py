from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import endpoints
from .models import models
from .api.deps import engine
import os
from dotenv import load_dotenv

load_dotenv()

# Create tables (For MVP/Development)
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Little Alpha API")

# CORS Configuration
# Production Note: Set ALLOWED_ORIGINS env var to your Vercel URL (e.g., "https://little-alpha.vercel.app")
origins_str = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000")
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
    return {"status": "healthy", "service": "Little Alpha"}
