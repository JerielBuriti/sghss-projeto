import React from "react";

export default function PacientesPage() {
  const [list, setList] = React.useState([]);
  const [form, setForm] = React.useState({
    nome: "",
    cpf: "",
    dataNascimento: "",
    telefone: "",
    endereco: "",
  });

  React.useEffect(() => {
    load();
  }, []);

  async function load() {
    const res = await fetch("http://localhost:3001/api/pacientes", {
      headers: { Authorization: "Bearer " + localStorage.getItem("sghss_token") },
    });
    const data = await res.json();
    setList(data);
  }

  async function save(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/api/pacientes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("sghss_token"),
      },
      body: JSON.stringify({
        ...form,
        cpf: form.cpf.replace(/\D/g, ""),
      }),
    });

    const d = await res.json();

    if (res.ok) {
      alert("Paciente salvo");
      setForm({
        nome: "",
        cpf: "",
        dataNascimento: "",
        telefone: "",
        endereco: "",
      });
      load();
    } else {
      alert(d.erro || "Erro ao salvar");
    }
  }

  return (
    <div className="p-6">

      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-6">Pacientes</h1>

      {/* FORM CARD */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-lg font-medium mb-4">Cadastrar Paciente</h2>

        <form onSubmit={save} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          <input
            className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
            placeholder="Nome completo"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            required
          />

          <input
            className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
            placeholder="CPF"
            value={form.cpf}
            onChange={(e) => setForm({ ...form, cpf: e.target.value })}
            required
          />

          <input
            type="date"
            className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
            value={form.dataNascimento}
            onChange={(e) => setForm({ ...form, dataNascimento: e.target.value })}
            required
          />

          <input
            className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500"
            placeholder="Telefone"
            value={form.telefone}
            onChange={(e) => setForm({ ...form, telefone: e.target.value })}
            required
          />

          <input
            className="border rounded-xl p-3 col-span-full focus:ring-2 focus:ring-blue-500"
            placeholder="Endereço"
            value={form.endereco}
            onChange={(e) => setForm({ ...form, endereco: e.target.value })}
          />

          <button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-3 font-medium col-span-full">
            Salvar Paciente
          </button>
        </form>
      </div>

      {/* LISTA */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-medium mb-4">Lista de Pacientes</h2>

        <div className="divide-y">
          {list.map((p) => (
            <div key={p.id} className="py-3 flex justify-between">
              <div>
                <p className="font-medium">{p.nome}</p>
                <p className="text-sm text-gray-500">CPF: {p.cpf}</p>
                <p className="text-sm text-gray-500">ID: {p.id}</p>
              </div>
            </div>
          ))}

          {list.length === 0 && (
            <p className="text-gray-500 text-center py-4">Nenhum paciente cadastrado.</p>
          )}
        </div>
      </div>
    </div>
  );
}
