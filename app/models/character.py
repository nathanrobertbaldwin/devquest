from .db import db, environment, SCHEMA, add_prefix_for_prod


class Character(db.Model):
    __tablename__ = "characters"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    stage = db.Column(db.Integer, nullable=False)
    backend = db.Column(db.Integer, nullable=False)
    frontend = db.Column(db.Integer, nullable=False)
    algorithms = db.Column(db.Integer, nullable=False)
    css = db.Column(db.Integer, nullable=False)
    debugging = db.Column(db.Integer, nullable=False)
    curr_energy = db.Column(db.Integer, nullable=False)
    max_energy = db.Column(db.Integer, nullable=False)
    curr_sanity = db.Column(db.Integer, nullable=False)
    max_sanity = db.Column(db.Integer, nullable=False)

    attacks = db.relationship(
        "Attack", secondary="character_attacks", back_populates="characters"
    )

    inventory = db.relationship("Inventory", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
            "stage": self.stage,
            "backend": self.backend,
            "frontend": self.frontend,
            "algorithms": self.algorithms,
            "css": self.css,
            "debugging": self.debugging,
            "currEnergy": self.curr_energy,
            "maxEnergy": self.max_energy,
            "currSanity": self.curr_sanity,
            "maxSanity": self.max_sanity,
            "attacks": [attack.to_dict() for attack in self.attacks],
            "inventory": {
                inventory_item.id: inventory_item.to_dict()
                for inventory_item in self.inventory
            },
        }

    def stat_updates_to_dict(self):
        return {
            "backend": self.backend,
            "frontend": self.frontend,
            "algorithms": self.algorithms,
            "css": self.css,
            "debugging": self.debugging,
            "maxEnergy": self.max_energy,
        }

    def save_data(self):
        return {
            "id": self.id,
            "name": self.name,
        }
