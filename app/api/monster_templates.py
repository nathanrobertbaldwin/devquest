from flask import Blueprint, jsonify, request
from flask_login import login_required
from sqlalchemy import func
from app.models import db, MonsterTemplate
from app.forms import MonsterForm

monster_templates_routes = Blueprint("monster_template_routes", __name__)


# @monster_routes.route("/")
# @login_required
# def monster():
#     """
#     Query for the single monster on the monster table.
#     """
#     monster = Monster.query.get(1)
#     return monster.to_dict()


@monster_templates_routes.route("/")
@login_required
def all_monsters():
    """
    Query for all monster templates and return in a list of dictionaries.
    """
    monster_template = MonsterTemplate.query.all()
    return [monster_template.to_dict() for monster in monster_template]


@monster_templates_routes.route("/", methods=["POST"])
@login_required
def create_monster_template():
    """
    Post a monster the monster template table.
    """

    form = MonsterForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data

        new_monster_template = Monster(
            name=data["name"],
            hp=data["hp"],
            weakness=data["weakness"],
            image_url=data["image_url"],
        )

        db.session.add(new_monster)
        db.session.commit()

        return new_monster.to_dict()

    return {"message": "Error while creating new monster."}


@monster_templates_routes.route("/<int:monsterId>", methods=["PUT"])
@login_required
def edit_monster_template(monsterId):
    """
    Edit an existing monster's template info.
    """
    monsterId = request.get_json()["monsterId"]

    monster_template = MonsterTemplate.query.get(monsterId)

    if monster_template:
        monster.name = data["name"]
        monster.hp = data["hp"]
        monster.weakness = data["weakness"]
        monster.image_url = data["image_url"]

        db.session.commit()

        return {"message": "Updated Monster Template"}

    return {"message": "Error: Monster could not be found. Game files corrupted."}


# Pretty sure I won't need this?

# @monster_routes.route("/", methods=["DELETE"])
# @login_required
# def monsters():
#     """

#     """
#     monster = Monster.query.get(1)

#     if monster:
#         db.session.delete(monster)
#         db.session.commit()
#         return {"message": "Monster deleted."}

#     return {"message": "Error: Monster could not be found. Game files corrupted."}
