// src/pages/ProfissionaisPage.js
import React, { useEffect, useState } from "react";

export default function ProfissionaisPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ nome: "", crm: "", especialidade: "" });

  const token = localStorage.getItem("sghss_token");
  const BASE = "http://localhost:3001/api/profissionais";

  useEffect(() => { load(); }, []);

  async function load() {
    const res = await fetch(BASE, {
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
      body: JSON.stringify(form),
    });

    const r = await res.json();
    if (res.ok) {
      alert("Profissional cadastrado");
      setForm({ nome: "", crm: "", especialidade: "" });
      load();
    } else alert(r.erro || "Erro ao salvar");
  }

  return (
    <div className="p-6 space-y-6">

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Cadastrar Profissional</h2>

        <form
          onSubmit={save}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <input
            className="border rounded-lg px-3 py-2"
            placeholder="Nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            required
          />

          <input
            className="border rounded-lg px-3 py-2"
            placeholder="CRM"
            value={form.crm}
            onChange={(e) => setForm({ ...form, crm: e.target.value })}
            required
          />

          <input
            className="border rounded-lg px-3 py-2"
            placeholder="Especialidade"
            value={form.especialidade}
            onChange={(e) =>
              setForm({ ...form, especialidade: e.target.value })
            }
          />

          <button className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
            Salvar
          </button>
        </form>
      </div>

      {/* LISTA */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Profissionais Cadastrados</h2>

        <ul className="space-y-3">
          {list.map((p) => (
            <li
              key={p.id}
              className="border p-4 rounded-lg bg-gray-50 shadow-sm flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{p.nome}</div>
                <div className="text-sm text-gray-600">CRM: {p.crm}</div>
                <div className="text-sm">Especialidade: {p.especialidade}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
