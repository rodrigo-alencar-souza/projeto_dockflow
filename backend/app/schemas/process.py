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
    passos: Optional[str] = None  # Agora é opcional



    

class ProcessUpdate(BaseModel):
    nome: str | None = None
    setor: Optional[SectorEnum] = None
    cargo: Optional[str]        = None
    processo: Optional[str]     = None
    descricao: Optional[str]    = None
    passos: Optional[str]       = None
    status: Optional[StatusEnum]


    

class ProcessOut(ProcessCreate):
    id: int
    status: StatusEnum

    model_config = ConfigDict(from_attributes=True)