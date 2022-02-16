from flask_wtf import FlaskForm
from wtforms import StringField, SelectField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Recipe, Category


class NewRecipeForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    instructions = StringField('Instructions', validators=[DataRequired()])
    category = SelectField('category', choices=["Lunch", "Breakfast", "Snack", "Dinner", "Soup", "Salad", "Drinks"], validators=[DataRequired()])
