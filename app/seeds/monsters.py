from app.models import db, Monster, environment, SCHEMA
from sqlalchemy.sql import text
from .data.monster_data import monsters


# Adds a demo user, you can add other users here if you want
def seed_monsters():
    for monster in monsters:
        new_monster = Monster(
            name=monster["name"],
            hp=monster["hp"],
            weakness=monster["weakness"],
        )

        db.session.add(new_monster)

    db.session.commit()


def undo_monsters():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.monsters RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM monsters"))

    db.session.commit()
