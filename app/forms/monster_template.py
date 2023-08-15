from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, NumberRange


class MonsterTemplateForm(FlaskForm):
    character_id = IntegerField("character_id", validators=[DataRequired()])
    name = StringField("name", validators=[DataRequired()])
    max_hp = IntegerField("max_hp", validators=[NumberRange(min=0, max=200)])
    curr_hp = IntegerField("curr_hp", validators=[NumberRange(min=0, max=200)])
    weakness = StringField("weakness")
    image_url = StringField("image_url")
    submit = SubmitField("Submit")
