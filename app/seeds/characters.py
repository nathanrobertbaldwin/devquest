from app.models import db, Character, environment, SCHEMA
from sqlalchemy.sql import text
from .data.characters_data import characters


# Adds a demo user, you can add other users here if you want
def seed_characters():
    for character in characters:
        new_character = Character(
            name=character["name"],
            user_id=character["user_id"],
            backend=character["backend"],
            frontend=character["frontend"],
            algorithms=character["algorithms"],
            css=character["css"],
            debugging=character["debugging"],
            curr_energy=100,
            max_energy=100,
            curr_sanity=1,
            max_sanity=100,
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
