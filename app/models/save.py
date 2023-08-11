from .db import db, environment, SCHEMA, add_prefix_for_prod


class Save(db.Model):
    __tablename__ = "saves"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    slot_one = db.Column(db.Integer, nullable=True)
    slot_two = db.Column(db.Integer, nullable=True)
    slot_three = db.Column(db.Integer, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.id,
            "slot_one": self.slot_one,
            "slot_two": self.slot_two,
            "slot_three": self.slot_three,
        }

    def save_slots(self):
        return {
            "slot_one": self.slot_one,
            "slot_two": self.slot_two,
            "slot_three": self.slot_three,
        }
