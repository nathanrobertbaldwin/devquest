from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Character, Save
from app.forms import CharacterForm

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
def new_character(charId):
    """
    Create a new character.
    """
    form = ProductForm()
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
            attack_1=data["attack_1"],
            attack_2=data["attack_2"],
            attack_3=data["attack_3"],
            attack_4=data["attack_4"],
        )

        db.session.add(new_character)
        db.session.commit()

        users_saves = Save.query.filter_by(user_id=data["user_id"])

    return users_saves.to_dict()
