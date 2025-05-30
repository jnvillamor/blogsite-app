"""changed hashed_password with password

Revision ID: 39a5fedcdd17
Revises: 8085f40835f5
Create Date: 2025-05-31 18:08:14.454497

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '39a5fedcdd17'
down_revision: Union[str, None] = '8085f40835f5'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('password', sa.String(length=250), nullable=False))
    op.drop_column('users', 'hashed_password')
    # ### end Alembic commands ###


def downgrade() -> None:
    """Downgrade schema."""
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('users', sa.Column('hashed_password', sa.VARCHAR(length=250), autoincrement=False, nullable=False))
    op.drop_column('users', 'password')
    # ### end Alembic commands ###
