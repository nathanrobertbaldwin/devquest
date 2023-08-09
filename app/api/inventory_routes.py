from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Inventory

inventory_routes = Blueprint("inventory_routes", __name__)


@inventory_routes.route("/")
# @login_required
def inventory():
    """
    Query for all inventories. Reminder to update this for a specific character.
    """
    backpack = Inventory.query.all()
    packed_inventory = [item.to_dict() for item in backpack]
    unpacked_inventory = []
    for item in packed_inventory:
        new_item = {}
        new_item["equipped"] = item["equipped"]
        new_item["algorithms_boost"] = item["item"]["algorithms_boost"]
        new_item["backend_boost"] = item["item"]["backend_boost"]
        new_item["css_boost"] = item["item"]["css_boost"]
        new_item["energy_boost"] = item["item"]["energy_boost"]
        new_item["frontend_boost"] = item["item"]["frontend_boost"]
        new_item["id"] = item["item"]["id"]
        new_item["image_url"] = item["item"]["image_url"]
        new_item["name"] = item["item"]["name"]
        new_item["slot"] = item["item"]["slot"]
        unpacked_inventory.append(new_item)

    return unpacked_inventory
