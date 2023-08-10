"""empty message

Revision ID: 15786cedc319
Revises: 
Create Date: 2023-08-09 21:59:15.077543

"""
from alembic import op
import sqlalchemy as sa

import os

environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = "15786cedc319"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "attacks",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=40), nullable=False),
        sa.Column(
            "owner_type",
            sa.Enum("monster", "character", name="owner_type_enum"),
            nullable=False,
        ),
        sa.Column(
            "primary_stat",
            sa.Enum(
                "backend",
                "frontend",
                "debugging",
                "css",
                "algorithms",
                "energy",
                name="primary_stat_enum",
            ),
            nullable=True,
        ),
        sa.Column("power", sa.Integer(), nullable=True),
        sa.Column("energy_cost", sa.Integer(), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )

    if environment == "production":
        op.execute(f"ALTER TABLE attacks SET SCHEMA {SCHEMA};")

    op.create_table(
        "equipments",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=40), nullable=False),
        sa.Column("backend_boost", sa.Integer(), nullable=False),
        sa.Column("frontend_boost", sa.Integer(), nullable=False),
        sa.Column("algorithms_boost", sa.Integer(), nullable=False),
        sa.Column("css_boost", sa.Integer(), nullable=False),
        sa.Column("debugging_boost", sa.Integer(), nullable=False),
        sa.Column("energy_boost", sa.Integer(), nullable=False),
        sa.Column(
            "slot",
            sa.Enum("gear", "food", "reference", name="slot_enum"),
            nullable=False,
        ),
        sa.Column("image_url", sa.String(length=255), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )

    if environment == "production":
        op.execute(f"ALTER TABLE equipments SET SCHEMA {SCHEMA};")

    op.create_table(
        "monsters",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=50), nullable=False),
        sa.Column("hp", sa.Integer(), nullable=False),
        sa.Column(
            "weakness",
            sa.Enum(
                "backend",
                "frontend",
                "debugging",
                "css",
                "algorithms",
                "energy",
                name="weakness_enum",
            ),
            nullable=True,
        ),
        sa.Column("image_url", sa.String(length=255), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )

    if environment == "production":
        op.execute(f"ALTER TABLE monsters SET SCHEMA {SCHEMA};")

    op.create_table(
        "users",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("username", sa.String(length=40), nullable=False),
        sa.Column("email", sa.String(length=255), nullable=False),
        sa.Column("hashed_password", sa.String(length=255), nullable=False),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("email"),
        sa.UniqueConstraint("username"),
    )

    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")

    op.create_table(
        "characters",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=40), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=True),
        sa.Column("backend", sa.Integer(), nullable=False),
        sa.Column("frontend", sa.Integer(), nullable=False),
        sa.Column("algorithms", sa.Integer(), nullable=False),
        sa.Column("css", sa.Integer(), nullable=False),
        sa.Column("debugging", sa.Integer(), nullable=False),
        sa.Column("energy", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    if environment == "production":
        op.execute(f"ALTER TABLE characters SET SCHEMA {SCHEMA};")

    op.create_table(
        "saves",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=True),
        sa.Column("slot_one", sa.Integer(), nullable=True),
        sa.Column("slot_two", sa.Integer(), nullable=True),
        sa.Column("slot_three", sa.Integer(), nullable=True),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["users.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    if environment == "production":
        op.execute(f"ALTER TABLE saves SET SCHEMA {SCHEMA};")

    op.create_table(
        "character_attacks",
        sa.Column("character_id", sa.Integer(), nullable=False),
        sa.Column("attack_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["attack_id"],
            ["attacks.id"],
        ),
        sa.ForeignKeyConstraint(
            ["character_id"],
            ["characters.id"],
        ),
        sa.PrimaryKeyConstraint("character_id", "attack_id"),
    )

    if environment == "production":
        op.execute(f"ALTER TABLE character_attacks SET SCHEMA {SCHEMA};")

    op.create_table(
        "inventories",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("character_id", sa.Integer(), nullable=True),
        sa.Column("equipment_id", sa.Integer(), nullable=True),
        sa.Column("equipped", sa.Boolean(), nullable=False),
        sa.ForeignKeyConstraint(
            ["character_id"],
            ["characters.id"],
        ),
        sa.ForeignKeyConstraint(
            ["equipment_id"],
            ["equipments.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )

    if environment == "production":
        op.execute(f"ALTER TABLE inventories SET SCHEMA {SCHEMA};")

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("inventories")
    op.drop_table("character_attacks")
    op.drop_table("saves")
    op.drop_table("characters")
    op.drop_table("users")
    op.drop_table("monsters")
    op.drop_table("equipments")
    op.drop_table("attacks")
    # ### end Alembic commands ###
