import React from "react";

export default function ConfiguracoesPage() {
  async function logout() {
    localStorage.removeItem("sghss_token");
    window.location.href = "/";
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Configurações</h2>

      <div className="space-y-3 bg-white p-4 shadow rounded">
        <button
          onClick={logout}
          className="bg-red-600 text-white py-2 px-4 rounded"
        >
          Sair do Sistema
        </button>
      </div>
    </div>
  );
}
