from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager

from config import Config
from database import db
from models.user_model import User
from models.paper_model import Paper

from routes.auth_routes import auth
from routes.paper_routes import paper

# ADD THIS IMPORT
from services.pdf_processing import process_all_pdfs

app = Flask(__name__)
app.config.from_object(Config)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

jwt = JWTManager(app)

db.init_app(app)

app.register_blueprint(auth)
app.register_blueprint(paper)

@app.route("/")
def home():
    return "ResearchMind AI Backend is Running Successfully!"

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    # TEMPORARY TEST FOR MODULE 4
    process_all_pdfs()

    app.run(debug=True)