from .db import db, SCHEMA, environment, add_prefix_for_prod

character_attacks = db.Table(
    "character_attacks",
    db.Model.metadata,
    db.Column(
        "character_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("characters.id")),
        primary_key=True,
    ),
    db.Column(
        "attack_id",
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("attacks.id")),
        primary_key=True,
    ),
)


if environment == "production":
    character_attacks.schema = SCHEMA
