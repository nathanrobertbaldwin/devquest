from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Equipment
from ..forms import EquipmentForm

equipment_routes = Blueprint("equipment_routes", __name__)


@equipment_routes.route("/")
@login_required
def all_equipment():
    """
    Query for all equipment and return in a list of dictionaries.
    """
    equipment = Equipment.query.all()
    return [item.to_dict() for item in equipment]


@equipment_routes.route("/", methods=["POST"])
@login_required
def create_equipment():
    """
    Create a new equipment.
    """
    form = EquipmentForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data
        new_equipment = Equipment(
            name=data["name"],
            backend_boost=data["backend_boost"],
            frontend_boost=data["frontend_boost"],
            algorithms_boost=data["algorithms_boost"],
            css_boost=data["css_boost"],
            debugging_boost=data["debugging_boost"],
            max_energy_boost=data["max_energy_boost"],
            slot=data["slot"],
            image_url=data["image_url"],
        )

        db.session.add(new_equipment)
        db.session.commit()
        return new_equipment.to_dict()

    return {"message": "Equipment not passing validation."}, 500


@equipment_routes.route("/<int:itemId>", methods=["PUT"])
@login_required
def edit_equipment(itemId):
    """
    Edit existing equipment by id.
    """
    item = Equipment.query.get(itemId)

    if item:
        new_data = request.get_json()

        item.name = new_data["name"]
        item.backend_boost = new_data["backend_boost"]
        item.frontend_boost = new_data["frontend_boost"]
        item.algorithms_boost = new_data["algorithms_boost"]
        item.css_boost = new_data["css_boost"]
        item.debugging_boost = new_data["debugging_boost"]
        item.max_energy_boost = new_data["max_energy_boost"]
        item.slot = new_data["slot"]
        item.image_url = new_data["image_url"]

        db.session.commit()

        return item.to_dict()

    return {"message": "Item not found. Game files corrupted."}, 500


@equipment_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_equipment(id):
    """
    Delete an equipment.
    """

    equipment = Equipment.query.get(id)

    if equipment:
        db.session.delete(equipment)
        db.session.commit()

        return {"message": "Deleted", "EquipmentId": id}

    return {"message": "Equipment not found. Save files are corrupted."}, 500
