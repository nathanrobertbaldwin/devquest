from .db import db, SCHEMA, add_prefix_for_prod

monster_attacks = db.Table('monster_attacks',
    db.Column('monster_id', db.Integer, db.ForeignKey(add_prefix_for_prod('monsters.id'))),
    db.Column('attack_id', db.Integer, db.ForeignKey(add_prefix_for_prod('attacks.id')))
)
