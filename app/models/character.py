from .db import db, environment, SCHEMA, add_prefix_for_prod


class Character(db.Model):
    __tablename__ = "characters"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    name = db.Column(db.String(40), nullable=False)
    algorithms = db.Column(db.Integer, nullable=False)
    databases = db.Column(db.Integer, nullable=False)
    css = db.Column(db.Integer, nullable=False)
    debugging = db.Column(db.Integer, nullable=False)
    energy = db.Column(db.Integer, nullable=False)

    attacks = db.relationship(
        "Attack", secondary="character_attacks", back_populates="characters"
    )

    inventory = db.relationship("Inventory", cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
        }
