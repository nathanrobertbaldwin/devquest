from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Monster

monster_routes = Blueprint("monster_routes", __name__)


@monster_routes.route("/")
# @login_required
def monsters():
    """
    Query for all monsters and return in a list of dictionaries.
    """
    monsters = Monster.query.all()
    return [monster.to_dict() for monster in monsters]
