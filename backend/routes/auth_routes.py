
from flask import Blueprint, request, jsonify
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)
from sqlalchemy.exc import SQLAlchemyError
from database import db
from models.user_model import User
import bcrypt

auth = Blueprint("auth", __name__)


def get_request_data():
    data = request.get_json(silent=True)
    return data if isinstance(data, dict) else None


@auth.route("/register", methods=["POST"])
def register():
    data = get_request_data()

    if data is None:
        return jsonify({
            "message": "Send a valid JSON request"
        }), 400

    full_name = data.get("full_name")
    email = data.get("email")
    password = data.get("password")

    if not all(
        isinstance(value, str) and value.strip()
        for value in (full_name, email, password)
    ):
        return jsonify({
            "message": "Full name, email and password are required"
        }), 400

    full_name = full_name.strip()
    email = email.strip().lower()

    if len(full_name) > 100:
        return jsonify({
            "message": "Full name must be 100 characters or fewer"
        }), 400

    if len(email) > 120:
        return jsonify({
            "message": "Email must be 120 characters or fewer"
        }), 400

    if len(password) < 8:
        return jsonify({
            "message": "Password must contain at least 8 characters"
        }), 400

    if len(password.encode("utf-8")) > 72:
        return jsonify({
            "message": "Password must not exceed 72 UTF-8 bytes"
        }), 400

    try:
        existing_user = User.query.filter_by(
            email=email
        ).first()

        if existing_user:
            return jsonify({
                "message": "Email already registered"
            }), 409

        hashed_password = bcrypt.hashpw(
            password.encode("utf-8"),
            bcrypt.gensalt()
        ).decode("utf-8")

        new_user = User(
            full_name=full_name,
            email=email,
            password=hashed_password
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "message": "User Registered Successfully"
        }), 201

    except SQLAlchemyError:
        db.session.rollback()
        app.logger.exception("Registration database error")

        return jsonify({
            "message": "Registration failed due to a database error"
        }), 500


@auth.route("/login", methods=["POST"])
def login():
    data = get_request_data()

    if data is None:
        return jsonify({
            "message": "Send a valid JSON request"
        }), 400

    email = data.get("email")
    password = data.get("password")

    if not all(
        isinstance(value, str) and value.strip()
        for value in (email, password)
    ):
        return jsonify({
            "message": "Email and password are required"
        }), 400

    email = email.strip().lower()

    try:
        user = User.query.filter_by(email=email).first()

        if user is None:
            return jsonify({
                "message": "Invalid email or password"
            }), 401

        password_matches = bcrypt.checkpw(
            password.encode("utf-8"),
            user.password.encode("utf-8")
        )

        if not password_matches:
            return jsonify({
                "message": "Invalid email or password"
            }), 401

        access_token = create_access_token(
            identity=user.email
        )

        return jsonify({
            "message": "Login Successful",
            "access_token": access_token,
            "user": {
                "full_name": user.full_name,
                "email": user.email,
                "role": "Researcher"
            }
        }), 200

    except SQLAlchemyError:
        db.session.rollback()
        app.logger.exception("Login database error")

        return jsonify({
            "message": "Login failed due to a database error"
        }), 500


@auth.route("/profile", methods=["GET"])
@jwt_required()
def profile():
    current_user = get_jwt_identity()

    user = User.query.filter_by(
        email=current_user
    ).first()

    if user is None:
        return jsonify({
            "message": "User not found"
        }), 404

    return jsonify({
        "message": "Profile retrieved successfully",
        "user": {
            "full_name": user.full_name,
            "email": user.email,
            "role": "Researcher"
        }
    }), 200
