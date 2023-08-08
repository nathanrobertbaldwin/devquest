from app.models import db, Equipment, environment, SCHEMA
from sqlalchemy.sql import text
from .data.equipment_data import equipments


# Adds a demo user, you can add other users here if you want
def seed_equipments():
    for equipment in equipments:
        new_equipment = Equipment(
            name=equipment["name"],
            backend_boost=equipment["backend_boost"],
            frontend_boost=equipment["frontend_boost"],
            algorithms_boost=equipment["algorithms_boost"],
            css_boost=equipment["css_boost"],
            debugging_boost=equipment["debugging_boost"],
            energy_boost=equipment["energy_boost"],
            slot=equipment["slot"],
        )

        db.session.add(new_equipment)

    db.session.commit()


def undo_equipments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.equipments RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM equipments"))

    db.session.commit()
