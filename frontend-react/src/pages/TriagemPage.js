import React from "react";

export default function TriagemPage() {
  const [list, setList] = React.useState([]);
  const [form, setForm] = React.useState({
    pacienteId: "",
    pressao: "",
    temperatura: "",
    batimentos: "",
    observacoes: ""
  });

  React.useEffect(() => load(), []);

  async function load() {
    const res = await fetch("http://localhost:3001/api/triagem", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("sghss_token"),
      },
    });
    const data = await res.json();
    setList(data);
  }

  async function save(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/api/triagem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("sghss_token"),
      },
      body: JSON.stringify(form),
    });

    const d = await res.json();

    if (res.ok) {
      alert("Triagem registrada!");
      setForm({ pacienteId: "", pressao: "", temperatura: "", batimentos: "", observacoes: "" });
      load();
    } else {
      alert(d.erro || "Erro ao salvar");
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Triagem</h2>

      <form className="grid grid-cols-5 gap-3 mb-6" onSubmit={save}>
        <input
          className="border p-2 rounded"
          placeholder="ID do Paciente"
          value={form.pacienteId}
          onChange={(e) => setForm({ ...form, pacienteId: e.target.value })}
          required
        />

        <input
          className="border p-2 rounded"
          placeholder="Pressão (Ex: 120/80)"
          value={form.pressao}
          onChange={(e) => setForm({ ...form, pressao: e.target.value })}
          required
        />

        <input
          className="border p-2 rounded"
          placeholder="Temperatura"
          value={form.temperatura}
          onChange={(e) => setForm({ ...form, temperatura: e.target.value })}
          required
        />

        <input
          className="border p-2 rounded"
          placeholder="Batimentos"
          value={form.batimentos}
          onChange={(e) => setForm({ ...form, batimentos: e.target.value })}
          required
        />

        <button className="bg-blue-600 text-white rounded px-4">Salvar</button>

        <textarea
          className="border p-2 rounded col-span-5"
          placeholder="Observações"
          value={form.observacoes}
          onChange={(e) => setForm({ ...form, observacoes: e.target.value })}
        />
      </form>

      <div className="bg-white shadow rounded p-4">
        {list.map((t) => (
          <div key={t.id} className="border-b py-2">
            <div className="font-semibold">
              Paciente #{t.pacienteId} — Pressão: {t.pressao} — Temp: {t.temperatura}°C —
              BPM: {t.batimentos}
            </div>
            <div className="text-sm text-gray-600">{t.observacoes}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
