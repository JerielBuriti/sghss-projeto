import React from "react";

export default function InternacoesPage() {
  const [leito, setLeito] = React.useState({ codigo: "", descricao: "" });
  const [leitos, setLeitos] = React.useState([]);
  const [intern, setIntern] = React.useState({ pacienteId: "", leitoId: "" });
  const [internacoes, setInternacoes] = React.useState([]);

  const token = localStorage.getItem("sghss_token");
  const BASE = "http://localhost:3001/api/internacoes";

  async function loadLeitos() {
    const res = await fetch(`${BASE}/leitos`, {
      headers: { Authorization: "Bearer " + token },
    });
    const d = await res.json();
    setLeitos(d);
  }

  async function loadIntern() {
    const res = await fetch(BASE, {
      headers: { Authorization: "Bearer " + token },
    });
    const d = await res.json();
    setInternacoes(d);
  }

  React.useEffect(() => {
    loadLeitos();
    loadIntern();
  }, []);

  async function saveLeito(e) {
    e.preventDefault();
    const res = await fetch(`${BASE}/leitos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(leito),
    });

    const r = await res.json();
    if (res.ok) {
      alert("Leito criado");
      setLeito({ codigo: "", descricao: "" });
      loadLeitos();
    } else {
      alert(r.erro || "Erro ao criar leito");
    }
  }

  async function internar(e) {
    e.preventDefault();
    const res = await fetch(BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(intern),
    });

    const r = await res.json();
    if (res.ok) {
      alert("Paciente internado");
      setIntern({ pacienteId: "", leitoId: "" });
      loadIntern();
      loadLeitos();
    } else alert(r.erro || "Erro ao internar");
  }

  async function alta(id) {
    await fetch(`${BASE}/${id}/alta`, {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
    });
    loadIntern();
    loadLeitos();
  }

  return (
    <div className="p-6 space-y-6">
      
      {/* LEITOS */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">Gerenciar Leitos</h2>

        <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={saveLeito}>
          <input
            placeholder="Código"
            className="border rounded px-3 py-2"
            value={leito.codigo}
            onChange={(e) => setLeito({ ...leito, codigo: e.target.value })}
            required
          />

          <input
            placeholder="Descrição"
            className="border rounded px-3 py-2"
            value={leito.descricao}
            onChange={(e) => setLeito({ ...leito, descricao: e.target.value })}
          />

          <button className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700">
            Criar Leito
          </button>
        </form>

        <ul className="space-y-2">
          {leitos.map((l) => (
            <li key={l.id} className="border p-3 rounded flex justify-between">
              <span>
                <b>{l.codigo}</b> — {l.descricao} •{" "}
                {l.status === "livre" ? (
                  <span className="text-green-600 font-medium">Livre</span>
                ) : (
                  <span className="text-red-600 font-medium">Ocupado</span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* INTERNAR */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">Internar Paciente</h2>

        <form className="grid grid-cols-1 md:grid-cols-3 gap-4" onSubmit={internar}>
          <input
            placeholder="Paciente ID"
            className="border rounded px-3 py-2"
            value={intern.pacienteId}
            onChange={(e) => setIntern({ ...intern, pacienteId: e.target.value })}
            required
          />

          <select
            className="border rounded px-3 py-2"
            value={intern.leitoId}
            onChange={(e) => setIntern({ ...intern, leitoId: e.target.value })}
            required
          >
            <option value="">Selecione o leito</option>
            {leitos
              .filter((l) => l.status === "livre")
              .map((l) => (
                <option key={l.id} value={l.id}>
                  {l.codigo} - {l.descricao}
                </option>
              ))}
          </select>

          <button className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700">
            Internar
          </button>
        </form>
      </div>

      {/* INTERNAÇÕES */}
      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold">Internações</h2>

        <ul className="space-y-3">
          {internacoes.map((i) => (
            <li key={i.id} className="border p-4 rounded flex justify-between items-center">
              <div>
                <div><b>ID:</b> {i.id}</div>
                <div><b>Paciente:</b> {i.pacienteId}</div>
                <div><b>Leito:</b> {i.leitoId}</div>
                <div>
                  <b>Status:</b>{" "}
                  {i.status === "internado" ? (
                    <span className="text-green-600 font-medium">Internado</span>
                  ) : (
                    <span className="text-gray-500 font-medium">Alta</span>
                  )}
                </div>
              </div>

              {i.status === "internado" && (
                <button
                  onClick={() => alta(i.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Dar Alta
                </button>
              )}
            </li>
          ))}
        </ul>
      </div>

    </div>
  );
}
