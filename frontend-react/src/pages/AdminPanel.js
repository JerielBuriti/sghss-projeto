import React from "react";
import {
  LayoutDashboard,
  UserCircle,
  CalendarCheck,
  Stethoscope,
  FileText,
  ClipboardPlus,
  BedDouble,
  LogOut,
} from "lucide-react";

import PacientesPage from "./PacientesPage";
import AgendamentosPage from "./AgendamentosPage";
import ProfissionaisPage from "./ProfissionaisPage";
import ProntuariosPage from "./ProntuariosPage";
import PrescricoesPage from "./PrescricoesPage";
import InternacoesPage from "./InternacoesPage";
import DashboardPage from "./DashboardPage";

export default function AdminPanel({ onLogout }) {
  const [view, setView] = React.useState("pacientes");

  const menu = [
    { id: "pacientes", label: "Pacientes", icon: <UserCircle className="w-5 h-5" /> },
    { id: "agendamentos", label: "Consultas", icon: <CalendarCheck className="w-5 h-5" /> },
    { id: "profissionais", label: "Profissionais", icon: <Stethoscope className="w-5 h-5" /> },
    { id: "prontuarios", label: "Prontuários", icon: <FileText className="w-5 h-5" /> },
    { id: "prescricoes", label: "Prescrições", icon: <ClipboardPlus className="w-5 h-5" /> },
    { id: "internacoes", label: "Internações / Leitos", icon: <BedDouble className="w-5 h-5" /> },
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },

  ];

  function logout() {
    localStorage.removeItem("sghss_token");
    onLogout();
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-xl p-6 flex flex-col border-r">
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <LayoutDashboard className="w-6 h-6" /> SGHSS
        </h2>

        <nav className="flex-1">
          {menu.map((item) => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-gray-700 hover:bg-gray-200 transition ${
                view === item.id ? "bg-gray-200 font-semibold" : ""
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>

        <button
          onClick={logout}
          className="mt-6 flex items-center gap-2 px-4 py-3 w-full rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
        >
          <LogOut className="w-5 h-5" /> Sair
        </button>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6">
        {view === "pacientes" && <PacientesPage />}        
        {view === "agendamentos" && <AgendamentosPage />}  
        {view === "profissionais" && <ProfissionaisPage />} 
        {view === "prontuarios" && <ProntuariosPage />}   
        {view === "prescricoes" && <PrescricoesPage />}    
        {view === "internacoes" && <InternacoesPage />} 
        {view === "dashboard" && <DashboardPage />}   
      </main>
    </div>
  );
}
