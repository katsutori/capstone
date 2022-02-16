from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Recipe, Category, Photo, db, Review, Ingredient, User
from app.forms import NewBusinessForm
from sqlalchemy.orm import joinedload

business_routes = Blueprint('businesses', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages
