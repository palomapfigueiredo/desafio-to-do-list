# 📝 Desafio To-Do List

Aplicação **Full Stack** de gerenciamento de tarefas (To-Do List), utilizando **React no frontend** e **FastAPI no backend**.

---

## 🚀 Tecnologias Utilizadas

### 🔹 Frontend

* React 18 
* JavaScript
* Axios
* CSS puro

### 🔹 Backend

* Python
* FastAPI
* SQLAlchemy
* SQLite

---

## 📌 Funcionalidades

### ✅ Tarefas

* Listar tarefas
* Criar nova tarefa
* Editar tarefa
* Deletar tarefa
* Marcar tarefa como concluída

### ✅ Interface

* Feedback de carregamento
* Atualização automática da lista após ações

---

## 📂 Estrutura do Projeto

```
desafio-to-do-list/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── database.py
│   │   └── routers/
│   └── tarefas.db
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   └── index.html
```

---

## ▶️ Como Rodar o Projeto

### 🔹 Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

A API estará disponível em:

* [http://127.0.0.1:8000](http://127.0.0.1:8000)
* Documentação: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

### 🔹 Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend disponível em:

* [http://localhost:5173](http://localhost:5173)

---

## 🔗 Integração Frontend + Backend

O frontend consome a API utilizando **Axios**, com base configurada para o backend local:

```js
axios.create({
  baseURL: 'http://127.0.0.1:8000'
})
```

---

## 🧠 Aprendizados

* Criação de API REST com FastAPI
* Integração frontend e backend
* Organização de projeto full stack
* Consumo de API com Axios
* Gerenciamento de estado com React Hooks

---

## 👩‍💻 Autora

**Paloma Figueiredo**
Estudante de Ciência da Computação

---

📌 Projeto desenvolvido para fins de aprendizado e avaliação técnica.
