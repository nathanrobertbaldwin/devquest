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
    attack_1 = IntegerField("attack_1", validators=[DataRequired()])
    attack_2 = IntegerField("attack_1", validators=[DataRequired()])
    attack_3 = IntegerField("attack_1", validators=[DataRequired()])
    attack_4 = IntegerField("attack_1", validators=[DataRequired()])
