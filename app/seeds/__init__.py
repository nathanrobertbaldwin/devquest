from flask.cli import AppGroup
from .attacks import seed_attacks, undo_attacks
from .equipments import seed_equipments, undo_equipments
from .users import seed_users, undo_users
from .monsters import seed_monsters, undo_monsters
from .characters import seed_characters, undo_characters
from .inventory import seed_inventory, undo_inventory
from .saves import seed_saves, undo_saves

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup("seed")


# Creates the `flask seed all` command
@seed_commands.command("all")
def seed():
    if environment == "production":
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_monsters()
        undo_inventory()
        undo_equipments()
        undo_attacks()
        undo_saves()
        undo_characters()
        undo_users()
    seed_users()
    seed_characters()
    seed_saves()
    seed_attacks()
    seed_equipments()
    seed_inventory()
    seed_monsters()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command("undo")
def undo():
    undo_monsters()
    undo_inventory()
    undo_equipments()
    undo_attacks()
    undo_saves()
    undo_characters()
    undo_users()
