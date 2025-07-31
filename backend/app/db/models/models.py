import enum
from sqlalchemy import (
    Column, Integer, String, Enum as SAEnum, ARRAY
)
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class SectorEnum(str, enum.Enum):
    engenharia = "engenharia"
    geral      = "geral"
    produção   = "produção"
    fiscal     = "fiscal"

class RoleEnum(str, enum.Enum):
    admin  = "admin"
    common = "common"

class StatusEnum(str, enum.Enum):
    pending  = "pending"
    approved = "approved"

class User(Base):
    __tablename__ = "users"

    id          = Column(Integer, primary_key=True, index=True)
    nome        = Column(String, nullable=False)
    setor       = Column(SAEnum(SectorEnum), nullable=False)
    cargo       = Column(String, nullable=False)
    email       = Column(String, unique=True, index=True, nullable=False)
    senha_hash  = Column(String, nullable=False)
    role        = Column(SAEnum(RoleEnum), default=RoleEnum.common, nullable=False)
    status      = Column(SAEnum(StatusEnum), default=StatusEnum.pending, nullable=False)
    permissions = Column(ARRAY(String), default=[])
    
    
class Activity(Base):
    __tablename__ = "process"

    id          = Column(Integer, primary_key=True, index=True)
    colaborador = Column(String, nullable=False)
    setor       = Column(SAEnum(SectorEnum), nullable=False)
    cargo       = Column(String, nullable=False)
    descricao   = Column(String, nullable=False)
    passos      = Column(ARRAY(String), default=[])
 
