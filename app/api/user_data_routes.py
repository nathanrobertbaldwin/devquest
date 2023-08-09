from flask import Blueprint, jsonify
from app.models import Character, Save
from .utilities import normalizer
from flask_login import login_required, current_user

user_data_routes = Blueprint("user_data_routes", __name__)


@user_data_routes.route("/")
@login_required
def user_data():
    """
    Query for all user data. REMINDER TO UPDATE THIS.
    """
    characters_data = Character.query.filter(Character.user_id == current_user.id)
    saves_data = Save.query.filter(Save.user_id == current_user.id)

    characters_array = [character.to_dict() for character in characters_data]
    saves_array = [save.to_dict() for save in saves_data]

    characters = normalizer(characters_array)
    saves = normalizer(saves_array)

    return {
        "characters": characters,
        "charactersArr": characters_array,
        "saves": saves,
        "savesArr": saves_array,
    }
