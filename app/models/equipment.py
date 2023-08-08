from .db import db, environment, SCHEMA, add_prefix_for_prod

slots = ["hat", "food", "reference"]


class Equipment(db.Model):
    __tablename__ = "equipments"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    algorithms_boost = db.Column(db.Integer, nullable=False)
    databases_boost = db.Column(db.Integer, nullable=False)
    css_boost = db.Column(db.Integer, nullable=False)
    debugging_boost = db.Column(db.Integer, nullable=False)
    energy_boost = db.Column(db.Integer, nullable=False)
    slot = db.Column(db.ENUM(*slots, name="slot_enum"), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
        }
