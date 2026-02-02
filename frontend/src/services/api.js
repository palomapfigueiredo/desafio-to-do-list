import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000", //endereço da API
});

export const getTarefas = () => api.get("/");
export const getTarefa = (id) => api.get(`/${id}`);
export const createTarefa = (tarefa) => api.post("/", tarefa);
export const updateTarefa = (id, tarefa) => api.put(`/tarefas/${id}`, tarefa);
export const deleteTarefa = (id) => api.delete(`/tarefas/${id}`);
export default api;

