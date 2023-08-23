from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Character, Save, Attack, Inventory, Equipment
from app.forms import CharacterForm
from sqlalchemy import inspect

character_routes = Blueprint("character_routes", __name__)


@character_routes.route("/<charId>")
@login_required
def load_character(charId):
    """
    Query for a specific character by id.
    """
    character_data = Character.query.get(charId)
    character = character_data.to_dict()
    return character


@character_routes.route("/", methods=["POST"])
@login_required
def new_character():
    """
    Create a new character, apply character attacks, and create character save file.
    """

    form = CharacterForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        new_character = Character(
            name=data["name"],
            user_id=data["user_id"],
            backend=data["backend"],
            frontend=data["frontend"],
            algorithms=data["algorithms"],
            css=data["css"],
            debugging=data["debugging"],
            curr_energy=data["energy"],
            max_energy=data["energy"],
            curr_sanity=100,
            max_sanity=100,
        )

        db.session.add(new_character)

        attack_one = Attack.query.get(data["attack_one"])
        attack_two = Attack.query.get(data["attack_two"])
        attack_three = Attack.query.get(data["attack_three"])
        attack_four = Attack.query.get(data["attack_four"])

        new_character.attacks.append(attack_one)
        new_character.attacks.append(attack_two)
        new_character.attacks.append(attack_three)
        new_character.attacks.append(attack_four)

        db.session.commit()

        user_saves = Save.query.filter_by(user_id=data["user_id"]).first()
        inspector = inspect(Save)

        save_slot = None

        for column in inspector.columns:
            column_name = column.name
            column_value = getattr(user_saves, column_name)
            slot_mapper = {"slot_one": 1, "slot_two": 2, "slot_three": 3}

            if column_name in slot_mapper and column_value == None:
                setattr(user_saves, column_name, new_character.id)
                save_slot = slot_mapper[column_name]
                break

        db.session.commit()

        return {
            "new_character": new_character.to_dict(),
            "new_save": {
                save_slot: {
                    "id": new_character.id,
                    "name": new_character.name,
                }
            },
        }

    return {"message": "Error creating character."}, 500


@character_routes.route("/inventory/<int:itemId>", methods=["POST"])
@login_required
def add_inventory_item(itemId):
    """
    Add an item to a character's inventory.
    """

    item = Equipment.query.get(itemId)

    char_id = request.get_json()["char_id"]
    character = Character.query.get(char_id)

    if item and character:
        new_inventory_item = Inventory(
            character_id=char_id, equipment_id=itemId, equipped=False
        )

        db.session.add(new_inventory_item)
        db.session.commit()

        return new_inventory_item.to_dict()

    return {"message": "Error adding item to inventory. Game files corrupted."}, 500


@character_routes.route("/inventory/<int:itemId>", methods=["PUT"])
@login_required
def toggle_item_equip(itemId):
    """
    Toggle the equip status for an item in a character's inventory.
    """

    item = Inventory.query.get(itemId)

    if item:
        item.equipped = not item.equipped
        db.session.commit()
        return {"message": "Item equip status toggled."}

    return {"message": "Error: Item not found in Inventory. Inventory corrupted."}, 500


@character_routes.route("/api/inventory/<int:itemId>/drop", methods=["DELETE"])
@login_required
def drop_inventory_item(itemId):
    """
    Remove an item from a character's inventory.
    """

    item = Inventory.query.get(itemId)

    if item:
        db.session.delete(item)
        db.session.commit()
        return {"message": "Item removed from Character's inventory."}

    return {"message": "Error: Item not found in Inventory. Inventory corrupted."}, 500


@character_routes.route("/<int:charId>/energy", methods=["PUT"])
@login_required
def update_energy(charId):
    """
    Character has used an attack or rested. Update character's current energy by charId.
    """
    character = Character.query.get(charId)

    if character:
        energy_change = request.get_json()["change"]

        if energy_change > 0:
            character.curr_energy = max(0, character.curr_energy - energy_change)
        else:
            character.curr_energy = min(
                character.max_energy, character.curr_energy - energy_change
            )

        db.session.commit()

        return {
            "message": "Updated character.currEnergy",
            "character_id": charId,
            "character.currEnergy": character.curr_energy,
        }

    return {"message": "Error: Character not found. Character file is corrupted."}, 500


@character_routes.route("/<int:charId>/sanity", methods=["PUT"])
@login_required
def update_sanity(charId):
    """
    Monster has dealt sanity damage to character. Update character sanity.
    """

    print("Getting here?")
    character = Character.query.get(charId)

    if character:
        sanity_change = request.get_json()["change"]

        if sanity_change > 0:
            character.curr_sanity = max(0, character.curr_sanity - sanity_change)
        else:
            character.curr_sanity = min(
                character.max_sanity, character.curr_sanity - sanity_change
            )

        db.session.commit()

        return {
            "message": "Updated character.currSanity",
            "character_id": charId,
            "character.currEnergy": character.curr_sanity,
        }

    return {"message": "Error: Character not found. Character file is corrupted."}, 500


@character_routes.route("/<int:charId>/stage", methods=["PUT"])
@login_required
def update_stage(charId):
    """
    Update character stage.
    """
    character = Character.query.get(charId)

    if character:
        stage_change = request.get_json()["change"]

        character.stage = character.stage + stage_change

        db.session.commit()

        return {
            "message": "Updated character.stage",
            "character_id": charId,
            "stage": character.stage,
        }

    return {"message": "Error: Character not found. Character file is corrupted."}, 500


@character_routes.route("/<int:charId>", methods=["PUT"])
@login_required
def update_character_stats(charId):
    """
    Update character stats after character receives a boon.
    """

    character = Character.query.get(charId)

    if character:
        character_edit_data = request.get_json()

        character.backend = character_edit_data["backend"]
        character.frontend = character_edit_data["frontend"]
        character.algorithms = character_edit_data["algorithms"]
        character.debugging = character_edit_data["debugging"]
        character.css = character_edit_data["css"]
        character.max_energy = character_edit_data["max_energy"]

        db.session.commit()

        return character.stat_updates_to_dict()

    return {"message": "Error: Character not found. Character file is corrupted."}, 500


@character_routes.route("/<int:charId>", methods=["DELETE"])
@login_required
def delete_character(charId):
    """
    Delete a character and its save data.
    """

    character = Character.query.get(charId)

    if character:
        user_saves = Save.query.filter(Save.user_id == character.user_id).first()
        inspector = inspect(Save)
        save_slot = None

        for column in inspector.columns:
            column_name = column.name
            column_value = getattr(user_saves, column_name)
            slot_mapper = {"slot_one": 1, "slot_two": 2, "slot_three": 3}

            if column_name in slot_mapper and column_value == charId:
                setattr(user_saves, column_name, None)
                save_slot = slot_mapper[column_name]
                break

        db.session.delete(character)
        db.session.commit()

        return {"message": "Deleted", "character_id": charId, "save_slot": save_slot}

    return {"message": "Error: Character not found. Save files are corrupted."}, 500
