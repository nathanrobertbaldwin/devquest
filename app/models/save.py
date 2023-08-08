from .db import db, environment, SCHEMA, add_prefix_for_prod

class Save(db.Model):
    __tablename__ = 'saves'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    slot_one = db.Column(db.JSON, nullable=True)
    slot_two = db.Column(db.JSON, nullable=True)
    slot_three = db.Column(db.JSON, nullable=True)
    

    def to_dict(self):
        return {
            'id': self.id,
        }