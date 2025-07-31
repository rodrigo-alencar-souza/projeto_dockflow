from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext

from app.db.deps import get_db
from app.db.models.models import User as UserModel
from app.schemas.user import UserCreate, UserUpdate, UserOut

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
router = APIRouter(prefix="/users", tags=["users"])

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

@router.post("/", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def create_user(user_in: UserCreate, db: Session = Depends(get_db)):
    user = db.query(UserModel).filter(UserModel.email == user_in.email).first()
    if user:
        raise HTTPException(400, "E-mail já cadastrado")
    hashed = get_password_hash(user_in.senha)
    db_user = UserModel(**user_in.dict(exclude={"senha"}), senha_hash=hashed)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.get("/", response_model=List[UserOut])
def read_users(db: Session = Depends(get_db)):
    return db.query(UserModel).all()

@router.put("/{user_id}", response_model=UserOut)
def update_user(
    user_id: int,
    user_up: UserUpdate,
    db: Session = Depends(get_db)
):
    db_user = db.query(UserModel).get(user_id)
    if not db_user:
        raise HTTPException(404, "Usuário não encontrado")
    for field, value in user_up.dict(exclude_unset=True).items():
        setattr(db_user, field, value)
    db.commit()
    db.refresh(db_user)
    return db_user

@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(UserModel).get(user_id)
    if not db_user:
        raise HTTPException(404, "Usuário não encontrado")
    db.delete(db_user)
    db.commit()
    return
