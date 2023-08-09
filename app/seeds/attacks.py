from app.models import db, Attack, Character, environment, SCHEMA
from sqlalchemy.sql import text
from .data.attacks_data import character_attacks, monster_attacks


# Adds a demo user, you can add other users here if you want
def seed_attacks():
    for character_attack in character_attacks:
        new_character_attack = Attack(
            name=character_attack["name"],
            owner_type=character_attack["owner_type"],
            primary_stat=character_attack["primary_stat"],
            power=character_attack["power"],
            energy_cost=character_attack["energy_cost"],
        )

        db.session.add(new_character_attack)
    db.session.commit()

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

    for monster_attack in monster_attacks:
        new_monster_attack = Attack(
            name=monster_attack["name"],
            owner_type=monster_attack["owner_type"],
            primary_stat=monster_attack["primary_stat"],
            power=monster_attack["power"],
            energy_cost=monster_attack["energy_cost"],
        )
        db.session.add(new_monster_attack)

    db.session.commit()


def undo_attacks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.attacks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM attacks"))

    db.session.commit()
