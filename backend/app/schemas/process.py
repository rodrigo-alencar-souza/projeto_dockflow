from enum import Enum
from typing import Optional
from pydantic import BaseModel, ConfigDict
from app.db.models.models import SectorEnum

class StatusEnum(str, Enum):
    pending  = "pending"
    approved = "approved"

class ProcessCreate(BaseModel):
    nome: str
    setor: SectorEnum
    cargo: str
    processo: str
    descricao: str
    passos: str


    

class ProcessUpdate(BaseModel):
    nome: str | None = None
    setor: str | None = None
    cargo: str | None = None
    processo: str | None = None
    descricao: str | None = None
    passos: str | None = None
    status: Optional[StatusEnum]


    

class ProcessOut(ProcessCreate):
    id: int
    status: StatusEnum

    model_config = ConfigDict(from_attributes=True)