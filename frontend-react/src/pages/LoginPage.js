import React from "react";

export default function LoginPage({ onSuccess }) {
  const [usuario, setUsuario] = React.useState("");
  const [senha, setSenha] = React.useState("");

  async function submit(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, senha }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("sghss_token", data.token);
      onSuccess();
    } else {
      alert(data.erro || "Usuário ou senha incorretos");
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">SGHSS - Login</h2>

        <form onSubmit={submit} className="space-y-4">
          <input
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
