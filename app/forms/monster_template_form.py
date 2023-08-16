from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, NumberRange


class MonsterTemplateForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    hp = IntegerField("hp", validators=[NumberRange(min=0, max=200)])
    weakness = StringField("weakness")
    image_url = StringField("image_url")
    submit = SubmitField("Submit")
