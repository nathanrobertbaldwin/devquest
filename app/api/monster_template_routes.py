from flask import Blueprint, jsonify, request
from flask_login import login_required
from sqlalchemy import func
from app.models import db, MonsterTemplate
from app.forms import MonsterTemplateForm

monster_template_routes = Blueprint("monster_template_routes", __name__)


# @monster_routes.route("/")
# @login_required
# def monster():
#     """
#     Query for the single monster on the monster table.
#     """
#     monster = Monster.query.get(1)
#     return monster.to_dict()


@monster_template_routes.route("/")
@login_required
def all_monsters():
    """
    Query for all monster templates and return in a list of dictionaries.
    """
    monster_template = MonsterTemplate.query.all()
    return [monster_template.to_dict() for monster in monster_template]


@monster_template_routes.route("/", methods=["POST"])
@login_required
def create_monster_template():
    """
    Post a monster the monster template table.
    """
    form = MonsterTemplateForm()
    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        data = form.data

        new_monster_template = MonsterTemplate(
            name=data["name"],
            hp=data["hp"],
            weakness=data["weakness"],
            image_url=data["image_url"],
        )

        db.session.add(new_monster_template)
        db.session.commit()

        return new_monster_template.to_dict()

    return {"message": "Error while creating new monster."}


@monster_template_routes.route("/<int:monsterId>", methods=["PUT"])
@login_required
def edit_monster_template(monsterId):
    """
    Edit an existing monster's template info.
    """

    monster_template = MonsterTemplate.query.get(monsterId)

    if monster_template:
        new_data = request.get_json()

        print("HERE IS THE NEW DATA,", new_data)

        monster_template.name = new_data["name"]
        monster_template.hp = new_data["hp"]
        monster_template.weakness = new_data["weakness"]
        monster_template.image_url = new_data["image_url"]

        db.session.commit()

        return monster_template.to_dict()

    return {
        "message": "Error: Monster Template could not be found. Game files corrupted."
    }


@monster_template_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_monster(id):
    """
    Delete a monster template.
    """

    monster_template = MonsterTemplate.query.get(id)

    if monster_template:
        db.session.delete(monster_template)
        db.session.commit()

        return {"message": "Deleted", "monster_template": id}

    return {"message": "Error: Equipment not found. Save files are corrupted."}
