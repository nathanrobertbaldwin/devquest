from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Character, Save, Attack
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

        user_saves = Save.query.filter_by(user_id=data["user_id"]).first()

        inspector = inspect(Save)

        save_slot = None

        for column in inspector.columns:
            column_name = column.name
            column_value = getattr(user_saves, column_name)

            if column_value is None:
                setattr(user_saves, column_name, new_character.id)
                if column_name == "slot_one":
                    save_slot = 1
                if column_name == "slot_two":
                    save_slot = 2
                if column_name == "slot_three":
                    save_slot = 3
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

    return "form not validating"


@character_routes.route("/<int:charId>/energy", methods=["PUT"])
@login_required
def spend_energy(charId):
    """
    Character has used an attack. Update character's current energy by charId.
    """
    character = Character.query.get(charId)

    if character:
        energy_cost = request.get_json()["cost"]

        character.curr_energy -= energy_cost

        db.session.commit()

        return {
            "message": "Updated character.currEnergy",
            "character_id": charId,
            "character.currEnergy": character.curr_energy,
        }

    return {"message": "Error: Character not found. Character file is corrupted."}


@character_routes.route("/<int:charId>/sanity", methods=["PUT"])
@login_required
def lose_sanity(charId):
    """
    Monster has dealt sanity damage to character. Update character sanity.
    """
    print("THIS IS THE CHARACTERS ID,", charId)
    character = Character.query.get(charId)
    if character:
        sanity_damage = request.get_json()["damage"]

        character.curr_sanity -= sanity_damage

        db.session.commit()

        return {
            "message": "Updated character.currSanity",
            "character_id": charId,
            "character.currEnergy": character.curr_sanity,
        }

    return {"message": "Error: Character not found. Character file is corrupted."}


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

            if column_value is charId:
                setattr(user_saves, column_name, None)
                if column_name == "slot_one":
                    save_slot = 1
                if column_name == "slot_two":
                    save_slot = 2
                if column_name == "slot_three":
                    save_slot = 3
                break

        db.session.delete(character)
        db.session.commit()

        return {"message": "Deleted", "character_id": charId, "save_slot": save_slot}

    return {"message": "Error: Character not found. Save files are corrupted."}
