import { useState, useEffect } from "react";
import api from "../services/api";

function TarefaForm({ onSuccess, tarefaParaEditar, setTarefaParaEditar }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //para adicionar no formulário quando clicar em "Editar" na lista
  useEffect(() => {
    if (tarefaParaEditar) {
      setTitulo(tarefaParaEditar.titulo);
      setDescricao(tarefaParaEditar.descricao);
    }
  }, [tarefaParaEditar]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!titulo) {
      setError("O título é obrigatório");
      return;
    }

    try {
      setLoading(true);
      setError("");

      if (tarefaParaEditar) {
        //logica para atualizar tarefa
        await api.put(`/tarefas/${tarefaParaEditar.id}`, {
          titulo,
          descricao,
          concluida: tarefaParaEditar.concluida,
        });
        setTarefaParaEditar(null); //sai modo edição
      } else {
        //logica para criar nova tarefa
        await api.post("/tarefas/", {
          titulo,
          descricao,
        });
      }

      setTitulo("");
      setDescricao("");
      onSuccess(); 
    } catch (err) {
      setError("Erro ao salvar tarefa");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{tarefaParaEditar ? "Editar Tarefa" : "Nova Tarefa"}</h2>

      {error && <p className="error-msg">{error}</p>}

      <input
        type="text"
        placeholder="Título*"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />

      <textarea
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <button className="btn-primary" type="submit" disabled={loading}>
        {loading ? "Salvando..." : tarefaParaEditar ? "Atualizar" : "Salvar"}
      </button>

      {tarefaParaEditar && (
        <button 
          type="button" 
          className="btn-cancel" 
          onClick={() => {
            setTarefaParaEditar(null);
            setTitulo("");
            setDescricao("");
          }}
          style={{ marginTop: '10px', backgroundColor: '#6366f1', color: 'white', width: '100%' }}
        >
          Cancelar Edição
        </button>
      )}
    </form>
  );
}

export default TarefaForm;