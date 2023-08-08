from .db import db, environment, SCHEMA, add_prefix_for_prod

slots = ["gear", "food", "reference"]


class Equipment(db.Model):
    __tablename__ = "equipments"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    backend_boost = db.Column(db.Integer, nullable=False)
    frontend_boost = db.Column(db.Integer, nullable=False)
    algorithms_boost = db.Column(db.Integer, nullable=False)
    css_boost = db.Column(db.Integer, nullable=False)
    debugging_boost = db.Column(db.Integer, nullable=False)
    energy_boost = db.Column(db.Integer, nullable=False)
    slot = db.Column(db.Enum(*slots, name="slot_enum"), nullable=False)
    image_url = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
        }
