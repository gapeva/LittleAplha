from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .api import endpoints
from .models import models
from .api.deps import engine
import os
from dotenv import load_dotenv

load_dotenv()

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Little Alpha API",
    description="HIPAA-Compliant Companion App API for Alpha-Gal Syndrome",
    version="1.0.0"
)

# ALLOW ALL ORIGINS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(endpoints.router, prefix="/api")

@app.get("/")
def health_check():
    return {"status": "healthy", "service": "Little Alpha API"}