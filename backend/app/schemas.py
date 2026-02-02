from datetime import datetime
from pydantic import BaseModel
from typing import Optional

class TarefaBase(BaseModel):
    titulo: str
    descricao: Optional[str] = None
    concluida: Optional[bool] = False

class TarefaCreate(TarefaBase):
    pass #herda os campos de TarefaBase para criação de uma nova tarefa
    
class TarefaResponse(TarefaBase):
    id: int
    concluida: bool
    data_criacao: datetime

    class Config:
        from_attributes = True

