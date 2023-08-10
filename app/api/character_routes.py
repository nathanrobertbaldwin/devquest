from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Character

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
