import React from "react";
import { Activity, Users, CalendarCheck, BedDouble } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-white shadow rounded-xl p-5 flex items-center space-x-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
            <Users size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Pacientes</p>
            <p className="text-xl font-bold">124</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-5 flex items-center space-x-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-lg">
            <CalendarCheck size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Consultas Hoje</p>
            <p className="text-xl font-bold">32</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-5 flex items-center space-x-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
            <BedDouble size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Leitos Ocupados</p>
            <p className="text-xl font-bold">18</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-5 flex items-center space-x-4">
          <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
            <Activity size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Atendimentos</p>
            <p className="text-xl font-bold">76</p>
          </div>
        </div>

      </div>
    </div>
  );
}
