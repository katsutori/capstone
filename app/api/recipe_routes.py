from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Recipe, Category, Photo, db, Review, Ingredient, User
from sqlalchemy.orm import joinedload

recipe_routes = Blueprint('recipes', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@recipe_routes.route('', methods=['GET'])
def all_recipes():
    recipe_data = Recipe.query \
                                .options(joinedload(Recipe.ingredients)) \
                                .options(joinedload(Recipe.user)) \
                                .options(joinedload(Recipe.reviews).options(joinedload(Review.user))) \
                                .options(joinedload(Recipe.categories)) \
                                .options(joinedload(Recipe.photos)) \
                                .all()

    data = []

    for recipe in recipe_data:
        ingredients = [ingredient.to_dict() for ingredient in recipe.ingredients]
        # reviews_set = [review.to_dict() for review in recipe.reviews]
        review_set = get_reviews(recipe.reviews)
        category_set = [category.to_dict() for category in recipe.categories]
        photo_set = [photo.to_dict() for photo in recipe.photos]

        each = {
            "id": recipe.id,
            "name": recipe.name,
            "description": recipe.description,
            "instructions": recipe.instructions,
            "user_id": recipe.user_id,
            "time_created": recipe.time_created,
            "time_update": recipe.time_updated,
            "user": recipe.user.to_dict(),
            "ingredients": ingredients,
            "reviews": review_set,
            "categories": category_set,
            "photos": photo_set
        }

        data.append(each)
    return {"data": data}


def get_reviews(reviews):
    data =[]
    for review in reviews:
        user_data = get_user(review.user)

        review_set = {
            'id': review.id,
            'rating': review.rating,
            "recipe_id": review.recipe_id,
            "review": review.review,
            "time_created": review.time_created,
            "time_updates": review.time_updated,
            "user": user_data
        }

        data.append(review_set)
    return data


def get_user(user):
    data = []

    user_set = {
            "id": user.id,
            "username": user.username
        }

    data.append(user_set)
    return data
