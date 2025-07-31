from typing import List, Optional
from pydantic import BaseModel, EmailStr, ConfigDict
from app.db.models.models import SectorEnum, RoleEnum, StatusEnum

class UserBase(BaseModel):
    nome: str
    setor: SectorEnum
    cargo: str
    email: EmailStr

class UserCreate(UserBase):
    senha: str

class UserUpdate(BaseModel):
    status: Optional[StatusEnum]
    permissions: Optional[List[SectorEnum]]

class UserOut(UserBase):
    id: int
    role: RoleEnum
    status: StatusEnum
    permissions: List[SectorEnum]

    model_config = ConfigDict(from_attributes=True)

