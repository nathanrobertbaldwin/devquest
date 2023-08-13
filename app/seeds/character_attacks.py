from app.models import db, Character, Attack, character_attacks, environment, SCHEMA
from sqlalchemy.sql import text
from .data.characters_data import characters


# Adds a demo user, you can add other users here if you want
def seed_character_attacks():
    nandalf = Character.query.get(1)
    build_a_database = Attack.query.get(1)
    build_a_component = Attack.query.get(4)
    console_log = Attack.query.get(5)
    write_code = Attack.query.get(8)

    nandalf.attacks.append(build_a_database)
    nandalf.attacks.append(build_a_component)
    nandalf.attacks.append(console_log)
    nandalf.attacks.append(write_code)

    db.session.commit()


def undo_character_attacks():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.character_attacks RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM character_attacks"))

    db.session.commit()
