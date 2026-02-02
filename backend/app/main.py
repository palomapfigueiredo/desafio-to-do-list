from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import Base, engine
from .models import Tarefa #importa o modelo de tarefas para criar a tabela 
from .routers import tarefas

app = FastAPI() #cria a aplicação FastAPI

@app.get("/") #indica que quando um cliente fizer uma requisição GET para a raiz do servidor, essa função será executada

def read_root():
    return {"message": "Olá mundo!"}

Base.metadata.create_all(bind=engine)

app.include_router(tarefas.router) #inclui o roteador de tarefas na aplicação principal

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #permite que qualquer front acesse a API
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
