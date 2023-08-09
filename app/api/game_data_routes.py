from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Character
from flask_login import current_user

game_data_routes = Blueprint("game_data_routes", __name__)


@game_data_routes.route("/")
# @login_required
def game_data():
    """
    Query for all game data. Returns game data somehow. UPDATE THIS.
    """
    characters = Character.query.filter(Character.user_id == current_user.id)
    return [character.to_dict() for character in characters]
