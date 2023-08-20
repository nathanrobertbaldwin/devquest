from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint("users", __name__)


@user_routes.route("/")
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries.
    """
    users = User.query.all()

    if users:
        return {"users": [user.to_dict() for user in users]}

    return {"message": "Users not found. Game files corrupted."}, 500


@user_routes.route("/<int:id>")
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)

    if user:
        return user.to_dict()

    return {"message": "User not found. Game files corrupted."}, 500
