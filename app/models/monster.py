from .db import db, environment, SCHEMA, add_prefix_for_prod

primary_stat = ["backend", "frontend", "debugging", "css", "algorithms", "energy"]


class Monster(db.Model):
    __tablename__ = "monsters"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    character_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("characters.id"))
    )
    character_id = db.Column(
        db.Integer, db.ForeignKey(add_prefix_for_prod("characters.id"))
    )
    name = db.Column(db.String(50), nullable=False)
    max_hp = db.Column(db.Integer, nullable=False)
    curr_hp = db.Column(db.Integer, nullable=False)
    weakness = db.Column(db.Enum(*primary_stat, name="weakness_enum"), nullable=True)
    image_url = db.Column(db.String(255), nullable=True)

    @classmethod
    def delete_all(cls):
        db.session.query(cls).delete()
        db.session.commit()

    def to_dict(self):
        return {
            "id": self.id,
            "character_id": self.character_id,
            "name": self.name,
            "maxHp": self.max_hp,
            "currHp": self.curr_hp,
            "weakness": self.weakness,
            "imageUrl": self.image_url,
        }
