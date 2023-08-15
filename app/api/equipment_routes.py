from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Equipment
from ..forms import EquipmentForm

equipment_routes = Blueprint("equipment_routes", __name__)


@equipment_routes.route("/")
@login_required
def equipment():
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

    print("Here are the form errors.", form.errors)
    return {"message": "Equipment not passing validation."}


# @equipment_routes.route("/", methods=["PUT"])
# @login_required
# def create_equipment():
#     """
#     Create a new equipment.
#     """
#     form = EquipmentForm()
#     form["csrf_token"].data = request.cookies["csrf_token"]

#     if form.validate_on_submit():
#         data = form.data
#         new_equipment = Equipment(
#             name=data["name"],
#             backend_boost=data["backend_boost"],
#             frontend_boost=data["frontend_boost"],
#             algorithms_boost=data["algorithms_boost"],
#             css_boost=data["css_boost"],
#             debugging_boost=data["debugging_boost"],
#             max_energy_boost=data["max_energy_boost"],
#             slot=data["slot"],
#             image_url=data["image_url"],
#         )

#         db.session.add(new_equipment)
