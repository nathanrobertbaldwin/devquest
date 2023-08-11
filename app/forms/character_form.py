from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired


class CharacterForm(FlaskForm):
    user_id = IntegerField("user_id", validators=[DataRequired()])
    name = StringField("name", validators=[DataRequired()])
    backend = IntegerField("backend", validators=[DataRequired()])
    frontend = IntegerField("frontend", validators=[DataRequired()])
    algorithms = IntegerField("algorithms", validators=[DataRequired()])
    css = IntegerField("css", validators=[DataRequired()])
    debugging = IntegerField("debugging", validators=[DataRequired()])
    energy = IntegerField("energy", validators=[DataRequired()])
    attack_one = IntegerField("attack_one", validators=[DataRequired()])
    attack_two = IntegerField("attack_two", validators=[DataRequired()])
    attack_three = IntegerField("attack_three", validators=[DataRequired()])
    attack_four = IntegerField("attack_four", validators=[DataRequired()])
    submit = SubmitField("Submit")
