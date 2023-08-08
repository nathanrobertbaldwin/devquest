from .db import db, environment, SCHEMA, add_prefix_for_prod

owner_types = ["monster", "character"]
primary_stats = ["algorithms", "databases", "css", "debugging", "energy"]


class Attack(db.Model):
    __tablename__ = "attacks"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False)
    owner_type = db.Column(db.ENUM(*owner_types), nullable=False)
    primary_stat = db.Column(db.ENUM(*primary_stats), nullable=True)
    characters = db.relationship(
        "Character", secondary="character_attacks", back_populates="attacks"
    )
    monsters = db.relationship(
        "Monster", secondary="monster_attacks", back_populates="attacks"
    )

    def to_dict(self):
        return {
            "id": self.id,
        }
