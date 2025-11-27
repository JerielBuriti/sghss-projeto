import React from "react";

export default function FinanceiroPage() {
  const [list, setList] = React.useState([]);
  const [form, setForm] = React.useState({
    descricao: "",
    valor: "",
    tipo: "entrada",
  });

  React.useEffect(() => load(), []);

  async function load() {
    const res = await fetch("http://localhost:3001/api/financeiro", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("sghss_token"),
      },
    });
    const data = await res.json();
    setList(data);
  }

  async function save(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/api/financeiro", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("sghss_token"),
      },
      body: JSON.stringify(form),
    });

    const d = await res.json();

    if (res.ok) {
      alert("Lançamento registrado!");
      setForm({ descricao: "", valor: "", tipo: "entrada" });
      load();
    } else {
      alert(d.erro || "Erro ao salvar");
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Financeiro</h2>

      <form className="grid grid-cols-4 gap-3 mb-6" onSubmit={save}>
        <input
          className="border p-2 rounded col-span-2"
          placeholder="Descrição"
          value={form.descricao}
          onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          required
        />

        <input
          type="number"
          className="border p-2 rounded"
          placeholder="Valor"
          value={form.valor}
          onChange={(e) => setForm({ ...form, valor: e.target.value })}
          required
        />

        <select
          className="border p-2 rounded"
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
        >
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </select>

        <button className="bg-blue-600 text-white rounded px-4 col-span-4">
          Registrar
        </button>
      </form>

      <div className="bg-white shadow rounded p-4">
        {list.map((f) => (
          <div key={f.id} className="border-b py-2 flex justify-between">
            <span>{f.descricao}</span>
            <span className={f.tipo === "entrada" ? "text-green-600" : "text-red-600"}>
              R$ {f.valor}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
