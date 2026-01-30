# Inside server/alembic/env.py
from app.models.models import Base  # <--- Import your Base
target_metadata = Base.metadata     # <--- Assign it here

# ... also ensure DATABASE_URL is read from env
import os
from dotenv import load_dotenv
load_dotenv()
config.set_main_option("sqlalchemy.url", os.getenv("DATABASE_URL"))
