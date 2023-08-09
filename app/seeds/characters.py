from app.models import db, Character, environment, SCHEMA
from sqlalchemy.sql import text
from .data.characters_data import characters


# Adds a demo user, you can add other users here if you want
def seed_characters():
    for character in characters:
        new_character = Character(
            user_id=character["user_id"],
            name=character["name"],
            algorithms=character["algorithms"],
            databases=character["databases"],
            css=character["css"],
            debugging=character["debugging"],
            energy=character["energy"],
        )

        db.session.add(new_character)

    db.session.commit()


def undo_characters():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.characters RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM characters"))

    db.session.commit()
