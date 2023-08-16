from .db import db, environment, SCHEMA, add_prefix_for_prod

primary_stat = ["backend", "frontend", "debugging", "css", "algorithms", "energy"]


class MonsterTemplate(db.Model):
    __tablename__ = "monster_templates"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    hp = db.Column(db.Integer, nullable=False)
    weakness = db.Column(db.Enum(*primary_stat, name="weakness_enum"), nullable=True)
    image_url = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "hp": self.hp,
            "weakness": self.weakness,
            "imageUrl": self.image_url,
        }
