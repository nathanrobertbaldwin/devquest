from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Character

character_routes = Blueprint("character_routes", __name__)


@character_routes.route("/")
# @login_required
def characters():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    characters = Character.query.all()
    return [character.to_dict() for character in characters]
