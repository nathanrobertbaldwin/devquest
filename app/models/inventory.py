from .db import db, environment, SCHEMA, add_prefix_for_prod


class Inventory(db.Model):
    __tablename__ = "inventories"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("characters.id"))
    )
    equipment_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("equipments.id"))
    )
    equipped = db.Column(db.Boolean, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "character_id": self.character_id,
            "equipment_id": self.equipment_id,
            "equipped": self.equipped,
        }
