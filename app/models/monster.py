from .db import db, environment, SCHEMA, add_prefix_for_prod

primary_stat = ["algorithms", "databases", "css", "debugging", "energy"]


class Monster(db.Model):
    __tablename__ = "monsters"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    hp = db.Column(db.Integer, nullable=False)
    weakness = db.Column(db.ENUM(*primary_stat), nullable=False)
    
    attacks = db.relationship(
        "Attack", secondary="monster_attacks", back_populates="monsters"
    )

    def to_dict(self):
        return {
            "id": self.id,
        }
