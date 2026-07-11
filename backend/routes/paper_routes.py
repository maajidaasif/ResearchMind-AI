from flask import Blueprint, request, jsonify, send_from_directory
from database import db
from models.paper_model import Paper
from services.pdf_processing import process_pdf

import os

paper = Blueprint("paper", __name__)

UPLOAD_FOLDER = "uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


# -----------------------------
# Upload Research Papers
# -----------------------------
@paper.route("/upload-paper", methods=["POST"])
def upload_paper():

    if "papers" not in request.files:
        return jsonify({
            "success": False,
            "message": "No files selected."
        }), 400

    files = request.files.getlist("papers")

    uploaded_papers = []

    for file in files:

        if file.filename == "":
            continue

        if not file.filename.lower().endswith(".pdf"):
            continue

        filepath = os.path.join(
            UPLOAD_FOLDER,
            file.filename
        )

        # Save PDF
        file.save(filepath)

        # Process ONLY this uploaded PDF
        process_pdf(filepath)

        # Save in database
        paper_data = Paper(
            filename=file.filename,
            filepath=filepath
        )

        db.session.add(paper_data)

        uploaded_papers.append({
            "filename": file.filename,
            "filepath": filepath
        })

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Research papers uploaded and processed successfully.",
        "papers": uploaded_papers
    }), 200


# -----------------------------
# Get All Uploaded Papers
# -----------------------------
@paper.route("/papers", methods=["GET"])
def get_papers():

    papers = Paper.query.all()

    result = []

    for paper_data in papers:

        result.append({
            "id": paper_data.id,
            "filename": paper_data.filename,
            "filepath": paper_data.filepath,
            "uploaded_at": paper_data.uploaded_at
        })

    return jsonify(result), 200


# -----------------------------
# Delete Paper
# -----------------------------
@paper.route("/paper/<int:paper_id>", methods=["DELETE"])
def delete_paper(paper_id):

    paper_data = Paper.query.get(paper_id)

    if paper_data is None:
        return jsonify({
            "success": False,
            "message": "Paper not found."
        }), 404

    # Delete uploaded PDF
    if os.path.exists(paper_data.filepath):
        os.remove(paper_data.filepath)

    # Delete processed TXT
    processed_file = os.path.join(
        "processed",
        os.path.basename(paper_data.filepath).replace(".pdf", ".txt")
    )

    if os.path.exists(processed_file):
        os.remove(processed_file)

    db.session.delete(paper_data)

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Paper deleted successfully."
    }), 200


# -----------------------------
# View Uploaded PDF
# -----------------------------
@paper.route("/uploads/<path:filename>", methods=["GET"])
def view_pdf(filename):

    return send_from_directory(
        UPLOAD_FOLDER,
        filename
    )