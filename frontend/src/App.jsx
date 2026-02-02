import { useState } from "react";
import "./styles.css";
import TarefaList from "./components/TarefaList";

function App() {
  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TarefaList />
    </div>
  );
}

export default App;

