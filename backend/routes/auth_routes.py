from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

from database import db
from models.user_model import User

import bcrypt

auth = Blueprint("auth", __name__)


# ==========================
# Register API
# ==========================
@auth.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    existing_user = User.query.filter_by(email=data["email"]).first()

    if existing_user:
        return jsonify({
            "message": "Email already registered"
        }), 409

    hashed_password = bcrypt.hashpw(
        data["password"].encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    new_user = User(
        full_name=data["full_name"],
        email=data["email"],
        password=hashed_password
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User Registered Successfully"
    }), 201


# ==========================
# Login API
# ==========================
@auth.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    user = User.query.filter_by(email=data["email"]).first()

    if not user:
        return jsonify({
            "message": "Invalid Email"
        }), 401

    if not bcrypt.checkpw(
        data["password"].encode("utf-8"),
        user.password.encode("utf-8")
    ):
        return jsonify({
            "message": "Invalid Password"
        }), 401

    access_token = create_access_token(identity=user.email)

    return jsonify({

        "message": "Login Successful",

        "access_token": access_token,

        "user": {

            "full_name": user.full_name,

            "email": user.email,

            "role": "Researcher"

        }

    }), 200


# ==========================
# Protected Profile API
# ==========================
@auth.route("/profile", methods=["GET"])
@jwt_required()
def profile():

    current_user = get_jwt_identity()

    user = User.query.filter_by(email=current_user).first()

    return jsonify({

        "message": "Protected Route Accessed Successfully",

        "user": {

            "full_name": user.full_name,

            "email": user.email,

            "role": "Researcher"

        }

    }), 200