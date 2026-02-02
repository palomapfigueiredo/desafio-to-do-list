from sqlalchemy import Integer, String, Column, Boolean, DateTime, Text
from datetime import datetime
from .database import Base

class Tarefa(Base):
    __tablename__ = "tarefas" #nome da tabela no banco de dados

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String(200), nullable=False)
    descricao = Column(Text, nullable=True)
    concluida = Column(Boolean, default=False)
    data_criacao = Column(DateTime, default=datetime.utcnow)
