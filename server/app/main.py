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
# In production, VITE_API_URL logic in frontend must match this
origins = [
    "http://localhost:5173", # Vite local
    "http://localhost:3000",
    # Add your Vercel URL here later: e.g. "https://little-alpha.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Change to 'origins' list for strict production security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(endpoints.router, prefix="/api")

@app.get("/")
def health_check():
    return {"status": "healthy", "service": "Little Alpha"}
