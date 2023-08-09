from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Equipment, Monster, Attack
from flask_login import current_user
from .utilities import normalizer

game_data_routes = Blueprint("game_data_routes", __name__)


@game_data_routes.route("/")
# @login_required
def game_data():
    """
    Query for all game data. Returns game data somehow. UPDATE THIS.
    """
    equipment_data = Equipment.query.all()
    monster_data = Monster.query.all()
    monster_attacks_data = Monster.query.all()

    equipment_array = [item.to_dict() for item in equipment_data]
    monsters_array = [monster.to_dict() for monster in monster_data]
    monster_attacks_array = [attack.to_dict() for attack in monster_attacks_data]

    equipment = normalizer(equipment_array)
    monsters = normalizer(monsters_array)
    monster_attacks = normalizer(monster_attacks_array)

    return {
        "equipment": equipment,
        "equipmentArr": equipment_array,
        "monsters": monsters,
        "monsterArr": monsters_array,
        "monsterAttacks": monster_attacks,
        "monsterAttacksArr": monster_attacks_array,
    }
