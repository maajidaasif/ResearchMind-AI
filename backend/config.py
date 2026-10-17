
import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
PROJECT_ROOT = os.path.dirname(BASE_DIR)

class Config:
    SECRET_KEY = os.environ.get(
        "SECRET_KEY",
        "researchmind_dev_secret_change_later"
    )

    JWT_SECRET_KEY = os.environ.get(
        "JWT_SECRET_KEY",
        "researchmind_jwt_dev_secret_change_later"
    )

    SQLALCHEMY_DATABASE_URI = (
        "sqlite:///"
        + os.path.join(
            PROJECT_ROOT,
            "database",
            "researchmind.db"
        ).replace("\\", "/")
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_ACCESS_TOKEN_EXPIRES = 3600
