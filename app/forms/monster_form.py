from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired


class MonsterForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    max_hp = IntegerField("max_hp", validators=[DataRequired()])
    curr_hp = IntegerField("curr_hp", validators=[DataRequired()])
    weakness = StringField("weakness")
    image_url = StringField("image_url")
    submit = SubmitField("Submit")
