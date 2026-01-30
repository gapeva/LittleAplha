from datetime import datetime

def calculate_protection_status(last_dose_time: datetime):
    # Ensure we compare UTC to UTC
    # Note: last_dose_time from DB is naive UTC (default SQLAlchemy behavior)
    now = datetime.utcnow() 
    
    # Calculate difference in minutes
    diff_seconds = (now - last_dose_time).total_seconds()
    diff_minutes = diff_seconds / 60

    if diff_minutes < 30:
        return {
            "status": "DISSOLVING",
            "message": "Wait... Dose is absorbing.",
            "color": "#f59e0b", # Amber Alert
            "remaining": 30 - diff_minutes
        }
    elif 30 <= diff_minutes <= 180:
        return {
            "status": "PROTECTED",
            "message": "Safe to eat!",
            "color": "#10b981", # Emerald Life
            "remaining": 180 - diff_minutes
        }
    else:
        return {
            "status": "VULNERABLE",
            "message": "Window closed. Take next dose.",
            "color": "#0ea5e9", # Biotech Blue
            "remaining": 0
        }
