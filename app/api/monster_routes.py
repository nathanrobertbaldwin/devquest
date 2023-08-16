from flask import Blueprint, jsonify, request
from flask_login import login_required
from sqlalchemy import func
from app.models import db, Monster
from app.forms import MonsterForm

monster_routes = Blueprint("monster_routes", __name__)


# @monster_routes.route("/")
# @login_required
# def monster():
#     """
#     Query for the single monster on the monster table.
#     """
#     monster = Monster.query.get(1)
#     return monster.to_dict()


@monster_routes.route("/", methods=["POST"])
@login_required
def create_monster():
    """
    Post a monster the monster table.
    """

    form = MonsterForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data

        charId = data["character_id"]
        char_monsters = (
            db.session.query(Monster).filter(Monster.character_id == charId).all()
        )

        for monster in char_monsters:
            db.session.delete(monster)

        db.session.commit()

        new_monster = Monster(
            character_id=data["character_id"],
            name=data["name"],
            max_hp=data["max_hp"],
            curr_hp=data["curr_hp"],
            weakness=data["weakness"],
            image_url=data["image_url"],
        )

        db.session.add(new_monster)
        db.session.commit()

        return new_monster.to_dict()

    return {"message": "Error while creating new monster."}


@monster_routes.route("/", methods=["PUT"])
@login_required
def update_monster_hp():
    """
    Edit the current monster's hp.
    """
    charId = request.get_json()["charId"]

    char_monster = (
        db.session.query(Monster).filter(Monster.character_id == charId).first()
    )

    if char_monster:
        damage = request.get_json()["damage"]
        char_monster.curr_hp -= damage

        db.session.commit()

        return {
            "message": "Updated monster.curr_hp",
            "char_monster.curr_hp": char_monster.curr_hp,
        }

    return {"message": "Error: Monster could not be found. Game files corrupted."}
