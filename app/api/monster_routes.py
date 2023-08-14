from flask import Blueprint, jsonify, request
from flask_login import login_required
from sqlalchemy import func
from app.models import db, Monster
from app.forms import MonsterForm

monster_routes = Blueprint("monster_routes", __name__)


@monster_routes.route("/")
@login_required
def monster():
    """
    Query for the single monster on the monster table.
    """
    monster = Monster.query.get(1)
    return monster.to_dict()


@monster_routes.route("/", methods=["POST"])
@login_required
def create_monster():
    """
    Post a monster the monster table.
    """

    Monster.delete_all()

    form = MonsterForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    request_data = request.get_data()

    if form.validate_on_submit():
        data = form.data
        new_monster = Monster(
            name=data["name"],
            max_hp=data["max_hp"],
            curr_hp=data["curr_hp"],
            weakness=data["weakness"],
            image_url=data["image_url"],
        )

        db.session.add(new_monster)
        db.session.commit()

        return new_monster.to_dict()

    return {"message": "Definitely not validating."}


@monster_routes.route("/", methods=["PUT"])
@login_required
def update_monster_hp():
    """
    Edit the current monster's hp.
    """
    monster = Monster.query.get(1)
    print("HITTING THIS ROUTE")

    if monster:
        damage = request.get_json()["damage"]
        monster.curr_hp -= damage

        db.session.commit()

        return {
            "message": "Updated monster.curr_hp",
            "monster.curr_hp": monster.curr_hp,
        }

    return {"message": "Error: Monster could not be found. Game files corrupted."}


@monster_routes.route("/", methods=["DELETE"])
@login_required
def monsters():
    """
    Edit the current monster's hp.
    """
    monster = Monster.query.get(1)

    if monster:
        db.session.delete(monster)
        db.session.commit()
        return {"message": "Monster deleted."}

    return {"message": "Error: Monster could not be found. Game files corrupted."}
