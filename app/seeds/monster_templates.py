from app.models import db, MonsterTemplate, environment, SCHEMA
from sqlalchemy.sql import text
from .data.monster_template_data import monster_templates


# Adds a demo user, you can add other users here if you want
def seed_monster_templates():
    for monster in monster_templates:
        new_monster = MonsterTemplate(
            name=monster["name"],
            hp=monster["hp"],
            weakness=monster["weakness"],
            image_url=monster["image_url"],
        )

        db.session.add(new_monster)

    db.session.commit()


def undo_monster_templates():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.monster_templates RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM monster_templates"))

    db.session.commit()
