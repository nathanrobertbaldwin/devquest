from app.models import db, Inventory, environment, SCHEMA
from sqlalchemy.sql import text
from .data.inventories_data import character_inventories


# Adds a demo user, you can add other users here if you want
def seed_inventory():
    for item in character_inventories:
        new_item = Inventory(
            character_id=item["character_id"],
            equipment_id=item["equipment_id"],
            equipped=item["equipped"],
        )

        db.session.add(new_item)

    db.session.commit()


def undo_inventory():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.inventories RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM inventories"))

    db.session.commit()
