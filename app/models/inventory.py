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
    
    # batch_id: db.Column(items in the same order: 20939ghn320gh)
    
    item = db.relationship("Equipment")
    equipped = db.Column(db.Boolean, nullable=False)

    def to_dict(self):
        return {
            "item": self.item.to_dict(),
            "equipped": self.equipped,
        }
