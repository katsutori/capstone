from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField, SubmitField, ValidationError
from wtforms.validators import DataRequired

def rating_check(form, field):
    rating = field.data
    if rating < 1 or rating > 5:
        raise ValidationError('Please provide a rating between 1 and 5.')

class ReviewForm(FlaskForm):
    rating = IntegerField('rating', validators=[DataRequired("Please provide a rating between 1 and 5."), rating_check])
    review = StringField('review', validators=[DataRequired("Please provide a message for your review.")])
    submit = SubmitField('submit')
