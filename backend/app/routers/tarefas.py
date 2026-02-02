#endpoints 
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List 

from ..models import Tarefa
from ..schemas import TarefaCreate, TarefaResponse
from ..dependencies import get_db  


router = APIRouter(prefix="/tarefas", tags=["Tarefas"])  #cria um roteador para agrupar os endpoints

@router.post("/", response_model=TarefaResponse)  #endpoint para criar uma nova tarefa
def criar_tarefa(
    tarefa: TarefaCreate,
    db: Session = Depends(get_db)
):
    nova_tarefa = Tarefa(
        titulo=tarefa.titulo,
        descricao=tarefa.descricao
    )
    db.add(nova_tarefa)
    db.commit()
    db.refresh(nova_tarefa)

    return nova_tarefa

@router.get("/", response_model=List[TarefaResponse])  #endpoint para listar todas as tarefas
    
def listar_tarefas(db: Session = Depends(get_db)):
    return db.query(Tarefa).all()

@router.get("/{tarefa_id}", response_model=TarefaResponse)  #endpoint para buscar uma tarefa por ID
    
def buscar_tarefa(
    tarefa_id: int, 
    db: Session = Depends(get_db)
):
    
    tarefa = db.query(Tarefa).filter(Tarefa.id == tarefa_id).first()

    if not tarefa:
        raise HTTPException(status_code=404, detail="Tarefa não encontrado")
    
    return tarefa
    
@router.put("/{tarefa_id}", response_model=TarefaResponse)  #endpoint para atualizar uma tarefa
    
def atualizar_tarefa(
    tarefa_id: int,
    tarefa_atualizada: TarefaCreate,
    db: Session = Depends(get_db)
): 
    tarefa_db = db.query(Tarefa).filter(Tarefa.id == tarefa_id).first()

    if not tarefa_db:
        raise HTTPException(status_code=404, detail="Tarefa não encontrado")  

    tarefa_db.titulo = tarefa_atualizada.titulo
    tarefa_db.descricao = tarefa_atualizada.descricao
    tarefa_db.concluida = tarefa_atualizada.concluida

    db.commit()
    db.refresh(tarefa_db)

    return tarefa_db


@router.delete("/{tarefa_id}")  #endpoint para deletar uma tarefa

def deletar_tarefa(
    tarefa_id: int,
    db: Session = Depends(get_db)
):
    tarefa_db = db.query(Tarefa).filter(Tarefa.id == tarefa_id).first()

    if not tarefa_db:
        raise HTTPException(status_code=404, detail="Tarefa não encontrado")

    db.delete(tarefa_db)
    db.commit()

    return {"message": "Tarefa deletada com sucesso"}