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
    Create a new character.
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
            energy=data["energy"],
        )

        attack_one = Attack.query.get(data["attack_one"])
        attack_two = Attack.query.get(data["attack_two"])
        attack_three = Attack.query.get(data["attack_three"])
        attack_four = Attack.query.get(data["attack_four"])

        new_character.attacks.append(attack_one)
        new_character.attacks.append(attack_two)
        new_character.attacks.append(attack_three)
        new_character.attacks.append(attack_four)

        db.session.add(new_character)

        print(new_character.to_dict())

        user_saves = Save.query.filter_by(user_id=data["user_id"]).first()

        inspector = inspect(Save)

        for column in inspector.columns:
            column_name = column.name
            column_value = getattr(user_saves, column_name)

            if column_value is None:
                setattr(user_saves, column_name, new_character.id)
                break

        db.session.commit()

        return {"character": new_character.to_dict(), "new_save": user_saves.to_dict()}

    return "form not validating"
