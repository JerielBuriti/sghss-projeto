import React, { useEffect, useState } from "react";

export default function AgendamentosPage() {
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ pacienteId: "", medico: "", data: "", horario: "" });
  const token = localStorage.getItem("sghss_token");
  const BASE = "http://localhost:3001/api/consultas";

  useEffect(() => { load(); }, []);

  async function load() {
    const res = await fetch(BASE, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setList(data);
  }

  async function save(e) {
    e.preventDefault();
    const res = await fetch(BASE, {
      method:'POST',
      headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
      body: JSON.stringify(form)
    });
    const d = await res.json();
    if(res.ok){
      alert('Consulta agendada');
      setForm({ pacienteId:'', medico:'', data:'', horario:'' });
      load();
    } else alert(d.erro || 'Erro ao agendar');
  }

  async function cancelar(id) {
    await fetch(`${BASE}/${id}/cancelar`, {
      method:'POST',
      headers:{ Authorization: `Bearer ${token}` }
    });
    load();
  }

  async function reagendar(id) {
    const novaData = prompt('Nova data (YYYY-MM-DD)');
    const novoHorario = prompt('Novo horário (HH:MM)');

    if(!novaData || !novoHorario) return;

    await fetch(`${BASE}/${id}/reagendar`, {
      method:'PUT',
      headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
      body: JSON.stringify({ data: novaData, horario: novoHorario })
    });

    load();
  }

  return (
    <div className="p-6 space-y-6">
      
      <h2 className="text-2xl font-semibold">Agendamentos de Consultas</h2>

      {/* FORM */}
      <form onSubmit={save} className="grid grid-cols-1 md:grid-cols-5 gap-4 bg-white p-5 rounded-xl shadow">

        <input className="border p-2 rounded" placeholder="Paciente ID"
          value={form.pacienteId} onChange={e=>setForm({...form,pacienteId:e.target.value})} required/>

        <input className="border p-2 rounded" placeholder="Médico"
          value={form.medico} onChange={e=>setForm({...form,medico:e.target.value})} required/>

        <input type="date" className="border p-2 rounded"
          value={form.data} onChange={e=>setForm({...form,data:e.target.value})} required/>

        <input className="border p-2 rounded" placeholder="HH:MM"
          value={form.horario} onChange={e=>setForm({...form,horario:e.target.value})} required/>

        <button className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700">
          Agendar
        </button>
      </form>

      {/* LISTA */}
      <div className="space-y-3">
        {list.map(a => (
          <div key={a.id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            
            <div className="text-gray-700">
              <span className="font-semibold text-blue-600">#{a.id}</span> • 
              Paciente: {a.pacienteId} • 
              {a.medico} • 
              {a.data} {a.horario} • 
              <span className="font-semibold">{a.status}</span>
            </div>

            <div className="flex gap-2">
              <button className="px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
                onClick={()=>reagendar(a.id)}>
                Reagendar
              </button>

              <button className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                onClick={()=>cancelar(a.id)}>
                Cancelar
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
