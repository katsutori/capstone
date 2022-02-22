from flask_wtf import FlaskForm
from wtforms import StringField, SelectField, IntegerField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Recipe, Category

def description_length(form, field):
    script = field.data
    if len(script) > 255:
        raise ValidationError('Your description is too long.')

def name_length(form, field):
    name = field.data
    if len(name) > 255:
        raise ValidationError("Your recipe's name is too long.")


class NewRecipeForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), name_length])
    description = StringField('Description', validators=[DataRequired(), description_length])
    instructions = StringField('Instructions', validators=[DataRequired()])
    category = SelectField('category', choices=["Lunch", "Breakfast", "Snack", "Dinner", "Soup", "Salad", "Drinks", "Dessert"], validators=[DataRequired()])
    user_id = IntegerField('user id')
    ingredient_one = StringField('First Ingredient')
    ingredient_two = StringField('Second Ingredient')
    ingredient_three = StringField('Third Ingredient')
    ingredient_four = StringField('Fourth Ingredient')
    ingredient_five = StringField('Fifth Ingredient')
    submit = SubmitField('submit')
