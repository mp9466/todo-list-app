from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models import Base  # Import Base from models.py
from app.config import settings  # Import settings from config.py

DATABASE_URL = settings.DATABASE_URL

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Ensure metadata is accessible for Alembic
Base.metadata.create_all(bind=engine) 