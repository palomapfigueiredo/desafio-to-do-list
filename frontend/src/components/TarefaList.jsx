import { useEffect, useState } from "react";
import api, { deleteTarefa, updateTarefa } from "../services/api";
import TarefaForm from "./TarefaForm";
import { Check, Trash2, Pencil, RotateCcw } from "lucide-react";

function TarefaList() {
  const [tarefas, setTarefas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [tarefaParaEditar, setTarefaParaEditar] = useState(null);

  //busca as tarefas do backend
  async function carregarTarefas() {
    try {
      setLoading(true);
      setError("");
      const response = await api.get("/tarefas/");
      //determina as não concluídas primeiro, e as mais novas no topo
      const ordenadas = response.data.sort((a, b) => a.concluida - b.concluida);
      setTarefas(ordenadas);
    } catch (err) {
      setError("Não foi possível carregar as tarefas.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarTarefas();
  }, []);

  //deleta uma tarefa com confirmação
  async function handleDeletar(id) {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      try {
        await deleteTarefa(id);
        carregarTarefas();
      } catch (err) {
        alert("Erro ao deletar tarefa.");
      }
    }
  }

  //status de concluída
  async function handleToggle(tarefa) {
    try {
      await updateTarefa(tarefa.id, {
        titulo: tarefa.titulo,
        descricao: tarefa.descricao,
        concluida: !tarefa.concluida,
      });
      carregarTarefas();
    } catch (err) {
      alert("Erro ao atualizar tarefa.");
    }
  }

  return (
    <div className="container">
      <TarefaForm 
        onSuccess={carregarTarefas} 
        tarefaParaEditar={tarefaParaEditar} 
        setTarefaParaEditar={setTarefaParaEditar} 
      />

      <div className="list-header">
        <h2>Minhas Tarefas ({tarefas.length})</h2>
      </div>

      {loading && <p className="status-msg">Carregando...</p>}
      {error && <p className="status-msg error">{error}</p>}
      
      {!loading && tarefas.length === 0 && (
        <p className="status-msg">Nenhuma tarefa encontrada. Comece criando uma!</p>
      )}

      {tarefas.map((tarefa) => (
        <div
          key={tarefa.id}
          className={`task-card ${tarefa.concluida ? "completed" : ""}`}
        >
          <div className="task-info">
            <h3>{tarefa.titulo}</h3>
            {tarefa.descricao && <p>{tarefa.descricao}</p>}
          </div>

          <div className="task-actions">
            <button
              className="btn-edit"
              onClick={() => {
                setTarefaParaEditar(tarefa);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title="Editar texto"
              style={{ background: 'transparent', color: '#fbbf24', fontSize: '1.2rem' }}
            ><Pencil size={18} />
            </button>

            <button
              className="btn-check"
              onClick={() => handleToggle(tarefa)}
              title={tarefa.concluida ? "Desmarcar" : "Concluir"}
            >
              {tarefa.concluida ? <RotateCcw size={18} /> : <Check size={18} />}
            </button>

            <button
              className="btn-delete"
              onClick={() => handleDeletar(tarefa.id)}
              title="Excluir tarefa"
            ><Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TarefaList;