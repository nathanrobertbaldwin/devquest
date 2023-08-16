from flask import Blueprint, jsonify
from app.models import Equipment, MonsterTemplate, Attack
from .utilities import normalizer

game_data_routes = Blueprint("game_data_routes", __name__)


@game_data_routes.route("/")
def game_data():
    """
    Query for all game data. Returns game data somehow. UPDATE THIS.
    """
    equipment_data = Equipment.query.all()
    equipment_array = [item.to_dict() for item in equipment_data]
    equipment = normalizer(equipment_array)

    character_attacks_data = Attack.query.filter(Attack.owner_type == "character")
    character_attacks_array = [attack.to_dict() for attack in character_attacks_data]
    character_attacks = normalizer(character_attacks_array)

    monster_data = MonsterTemplate.query.all()
    monsters_array = [monster.to_dict() for monster in monster_data]
    monsters = normalizer(monsters_array)

    monster_attacks_data = Attack.query.filter(Attack.owner_type == "monster")
    monster_attacks_array = [attack.to_dict() for attack in monster_attacks_data]
    monster_attacks = normalizer(monster_attacks_array)

    return {
        "equipment": equipment,
        "equipmentArr": equipment_array,
        "characterAttacks": character_attacks,
        "characterAttacksArr": character_attacks_array,
        "monsterTemplates": monsters,
        "monsterTemplatesArr": monsters_array,
        "monsterAttacks": monster_attacks,
        "monsterAttacksArr": monster_attacks_array,
    }
