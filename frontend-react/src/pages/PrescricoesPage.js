// src/pages/PrescricoesPage.js
import React, { useState } from "react";

export default function PrescricoesPage() {
  const [pacienteId, setPacienteId] = useState("");
  const [list, setList] = useState([]);
  const [texto, setTexto] = useState("");

  const token = localStorage.getItem("sghss_token");
  const BASE = "http://localhost:3001/api/prescricoes";

  async function load() {
    if (!pacienteId) return;
    const res = await fetch(`${BASE}/paciente/${pacienteId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const d = await res.json();
    setList(d);
  }

  async function save(e) {
    e.preventDefault();
    const res = await fetch(BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ pacienteId: Number(pacienteId), texto }),
    });

    const r = await res.json();
    if (res.ok) {
      alert("Prescrição criada");
      setTexto("");
      load();
    } else alert(r.erro || "Erro ao salvar");
  }

  return (
    <div className="p-6 space-y-6">
      
      {/* Buscar */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Buscar Prescrições</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            className="border rounded-lg px-3 py-2"
            placeholder="Paciente ID"
            value={pacienteId}
            onChange={(e) => setPacienteId(e.target.value)}
          />
          <button
            onClick={load}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Criar */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Nova Prescrição</h2>

        <form onSubmit={save}>
          <textarea
            className="border rounded-lg w-full p-3 h-32 mb-4"
            placeholder="Prescrição (medicamentos, doses e posologia)"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            required
          ></textarea>

          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Gerar Prescrição
          </button>
        </form>
      </div>

      {/* Lista */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Prescrições do Paciente</h2>

        <ul className="space-y-3">
          {list.map((p) => (
            <li
              key={p.id}
              className="border p-4 rounded-lg bg-gray-50 shadow-sm"
            >
              <div className="text-sm text-gray-600">{p.data}</div>
              <div className="font-medium">Profissional: {p.profissionalId}</div>
              <div className="mt-2">{p.texto}</div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
