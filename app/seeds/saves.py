from app.models import db, Save, environment, SCHEMA
from sqlalchemy.sql import text
from .data.saves_data import saved_games


# Adds a demo user, you can add other users here if you want
def seed_saves():
    for game in saved_games:
        new_save = Save(user_id=game["user_id"], slot_one=game["slot_one"])

        db.session.add(new_save)

    db.session.commit()


def undo_saves():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.saves RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM saves"))

    db.session.commit()
