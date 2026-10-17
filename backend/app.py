
import os
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from database import db

from models.user_model import User
from models.paper_model import Paper
from models.analysis_model import Analysis

from routes.auth_routes import auth
from routes.paper_routes import paper
from routes.literature_routes import literature
from routes.report_routes import report_bp
from routes.chat_routes import chat_bp

app = Flask(__name__)
app.config.from_object(Config)

CORS(
    app,
    resources={
        r"/*": {
            "origins": [
                "http://localhost:5173",
                "http://127.0.0.1:5173"
            ]
        }
    },
    allow_headers=["Content-Type", "Authorization"],
    methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
)

jwt = JWTManager(app)

db.init_app(app)

app.register_blueprint(auth)
app.register_blueprint(paper)
app.register_blueprint(literature)
app.register_blueprint(report_bp)
app.register_blueprint(chat_bp)


@app.route("/")
def home():
    return jsonify({
        "message": "ResearchMind AI Backend is Running Successfully!"
    }), 200


@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "healthy"
    }), 200


with app.app_context():
    os.makedirs(
        os.path.dirname(
            app.config["SQLALCHEMY_DATABASE_URI"].replace(
                "sqlite:///", ""
            )
        ),
        exist_ok=True
    )
    db.create_all()


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=False,
        use_reloader=False
    )
