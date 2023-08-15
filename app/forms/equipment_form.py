from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, NumberRange


class EquipmentForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    backend_boost = IntegerField("backend_boost")
    frontend_boost = IntegerField("frontend_boost")
    algorithms_boost = IntegerField("algorithms_boost")
    css_boost = IntegerField("css_boost")
    debugging_boost = IntegerField("debugging_boost")
    max_energy_boost = IntegerField("max_energy_boost")
    slot = StringField("slot")
    image_url = StringField("image_url")
    submit = SubmitField("Submit")
