from .db import db, environment, SCHEMA, add_prefix_for_prod

owner_types = ["monster", "character"]
primary_stats = ["backend", "frontend", "debugging", "css", "algorithms", "energy"]


class Attack(db.Model):
    __tablename__ = "attacks"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)

    owner_type = db.Column(
        db.Enum(*owner_types, name="owner_type_enum"), nullable=False
    )

    primary_stat = db.Column(
        db.Enum(*primary_stats, name="primary_stat_enum"), nullable=True
    )

    power = db.Column(db.Integer, nullable=True)
    energy_cost = db.Column(db.Integer, nullable=True)

    characters = db.relationship(
        "Character", secondary="character_attacks", back_populates="attacks"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "ownerType": self.owner_type,
            "primaryStat": self.primary_stat,
            "power": self.power,
            "energyCost": self.energy_cost,
        }
