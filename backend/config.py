import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))

class Config:

    SECRET_KEY = "researchmind_ai_secret_key"

    JWT_SECRET_KEY = "researchmind_jwt_secret_key"

    SQLALCHEMY_DATABASE_URI = (
        "sqlite:///" +
        os.path.join(BASE_DIR, "..", "database", "researchmind.db")
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False