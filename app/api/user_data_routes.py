from flask import Blueprint, jsonify
from app.models import db, Save, Character
from .utilities import normalizer
from flask_login import login_required, current_user

user_data_routes = Blueprint("user_data_routes", __name__)


@user_data_routes.route("/saves")
@login_required
def saves_data():
    """
    Query to load all the saves for a user.
    """
    user_save_file = Save.query.filter(Save.user_id == current_user.id).first()

    if user_save_file:
        char_one = {}
        char_two = {}
        char_three = {}

        if user_save_file.slot_one:
            char_one = Character.query.get(user_save_file.slot_one).save_data()

        if user_save_file.slot_two:
            char_two = Character.query.get(user_save_file.slot_two).save_data()

        if user_save_file.slot_three:
            char_three = Character.query.get(user_save_file.slot_three).save_data()

        return_package = {1: char_one, 2: char_two, 3: char_three}

        return return_package

    return {"message": "Unable to find save file. Game files corrupted."}, 500


@user_data_routes.route("/saves", methods=["POST"])
@login_required
def create_user_save_file():
    """
    Create a users save file.
    """

    new_save_file = Save(
        user_id=current_user.id,
        slot_one=None,
        slot_two=None,
        slot_three=None,
    )

    db.session.add(new_save_file)
    db.session.commit()

    print("SERVER WORKS JUST FINE!")
    return {1: {}, 2: {}, 3: {}}
