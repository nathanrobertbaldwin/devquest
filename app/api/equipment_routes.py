from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Equipment

equipment_routes = Blueprint("equipment_routes", __name__)


@equipment_routes.route("/")
# @login_required
def equipment():
    """
    Query for all equipment and return in a list of dictionaries.
    """
    equipment = Equipment.query.all()
    return [item.to_dict() for item in equipment]
