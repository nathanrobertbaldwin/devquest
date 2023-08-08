from .db import db, SCHEMA, add_prefix_for_prod

character_attacks = db.Table('character_attacks',
    db.Column('character_id', db.Integer, db.ForeignKey(add_prefix_for_prod('characters.id'))),
    db.Column('attack_id', db.Integer, db.ForeignKey(add_prefix_for_prod('attacks.id')))
)