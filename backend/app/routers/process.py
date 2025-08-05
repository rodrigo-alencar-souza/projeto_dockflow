from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.deps import get_db
from app.db.models.models import Process
from app.schemas.process import ProcessCreate, ProcessOut, ProcessUpdate

router = APIRouter(prefix="/process", tags=["process"])

@router.post("/", response_model=ProcessOut)
def create_process(activity: ProcessCreate, db: Session = Depends(get_db)):
    db_activity = Process(**activity.model_dump())
    db.add(db_activity)
    db.commit()
    db.refresh(db_activity)
    return db_activity

@router.get("/", response_model=List[ProcessOut])
def list_process(db: Session = Depends(get_db)):
    return db.query(Process).all()



@router.put("/{process_id}", response_model=ProcessOut)
def atualizar_formulario(
    formulario_id: int,
    update_data: ProcessUpdate,
    db: Session = Depends(get_db)
):
    formulario = db.query(Process).get(formulario_id)
    if not formulario:
        raise HTTPException(status_code=404, detail="Formulário não encontrado")

    for attr, value in update_data.model_dump(exclude_unset=True).items():
        setattr(formulario, attr, value)

    db.commit()
    db.refresh(formulario)
    return formulario

@router.delete("/{process_id}", status_code=status.HTTP_204_NO_CONTENT)
def deletar_formulario(formulario_id: int, db: Session = Depends(get_db)):
    formulario = db.query(Process).get(formulario_id)
    if not formulario:
        raise HTTPException(status_code=404, detail="Formulário não encontrado")

    db.delete(formulario)
    db.commit()
