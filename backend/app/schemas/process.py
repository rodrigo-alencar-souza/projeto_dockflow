# app/schemas/activity.py

from typing import List
from pydantic import BaseModel, ConfigDict
from app.db.models.models import SectorEnum

class ActivityCreate(BaseModel):
    nome: str
    setor: SectorEnum
    cargo: str
    processo: str
    descricao: str
    passos: str
    

class ActivityUpdate(BaseModel):
    nome: str | None = None
    setor: str | None = None
    cargo: str | None = None
    processo: str | None = None
    descricao: str | None = None
    passos: str | None = None
    

class ActivityOut(ActivityCreate):
    id: int

    model_config = ConfigDict(from_attributes=True)