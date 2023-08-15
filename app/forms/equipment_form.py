from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, NumberRange


class EquipmentForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    backend_boost = IntegerField(
        "backend_boost", validators=[NumberRange(min=0, max=200)]
    )
    frontend_boost = IntegerField(
        "frontend_boost", validators=[NumberRange(min=0, max=200)]
    )
    algorithms_boost = IntegerField(
        "algorithms_boost", validators=[NumberRange(min=0, max=200)]
    )
    css_boost = IntegerField("css_boost", validators=[NumberRange(min=0, max=200)])
    debugging_boost = IntegerField(
        "debugging_boost", validators=[NumberRange(min=0, max=200)]
    )
    max_energy_boost = IntegerField(
        "max_energy_boost", validators=[NumberRange(min=0, max=200)]
    )
    slot = StringField("slot", validators=[NumberRange(min=0, max=200)])
    image_url = StringField("image_url")
    submit = SubmitField("Submit")
