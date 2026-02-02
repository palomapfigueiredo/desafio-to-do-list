from .database import SessionLocal

def get_db():  #lógica para obter a sessão do banco de dados
    db = SessionLocal()
    try:
        yield db 
    finally:
        db.close()

