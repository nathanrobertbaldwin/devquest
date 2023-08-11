from flask import Blueprint, jsonify
from app.models import Save, Character
from .utilities import normalizer
from flask_login import login_required, current_user

user_data_routes = Blueprint("user_data_routes", __name__)


@user_data_routes.route("/saves")
@login_required
def saves_data():
    """
    Query to load all the saves for a user.
    """
    user_saves_data = Save.query.filter(Save.user_id == current_user.id)
    user_saves = [save.to_dict() for save in user_saves_data][0]

    save_data = dict()

    if user_saves["slot_one"]:
        character_one_data = Character.query.get(user_saves["slot_one"])
        character_one = character_one_data.to_dict()
        save_data[1] = {
            "name": character_one["name"],
            "id": character_one["id"],
        }
    if user_saves["slot_two"]:
        character_two_data = Character.query.get(user_saves["slot_two"])
        character_two = character_two_data.to_dict()
        save_data[2]: {
            "name": character_two["name"],
            "id": character_two["id"],
        }
    if user_saves["slot_three"]:
        character_three_data = Character.query.get(user_saves["slot_three"]).to_dict()
        character_three = character_three_data.to_dict()
        save_data[3] = {
            "name": character_three["name"],
            "id": character_three["id"],
        }

    return save_data
