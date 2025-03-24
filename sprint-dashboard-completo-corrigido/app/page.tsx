"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

const rawCycleData = [
  { size: "XS", time: 1.75, board: "Max Call", sprint: "Sprint 8" },
  { size: "S", time: 1.0, board: "Max Call", sprint: "Sprint 8" },
  { size: "M", time: 3.0, board: "Max Call", sprint: "Sprint 8" }
];

const rawBurndownData = [
  { date: "17/03", restante: 20, ideal: 20, board: "Todos", sprint: "Sprint 8" },
  { date: "18/03", restante: 20, ideal: 17.78, board: "Todos", sprint: "Sprint 8" },
  { date: "19/03", restante: 19, ideal: 15.56, board: "Todos", sprint: "Sprint 8" },
  { date: "20/03", restante: 15, ideal: 13.33, board: "Todos", sprint: "Sprint 8" },
  { date: "21/03", restante: 13, ideal: 11.11, board: "Todos", sprint: "Sprint 8" }
];

const impedimentos = [
  { id: 204903, titulo: "[Android] A funcionalidade encontrar telefone...", pai: "192689 - Localizar Telefone", board: "App Condor", sprint: "Sprint 8" },
  { id: 192705, titulo: "[IOS] Acionamento gestual não está funcional", pai: "192817 - Acionamento Gestual", board: "Max Call", sprint: "Sprint 8" }
];

const alemEstimado = [
  { id: 207334, titulo: "[Android] Lembrete de água notificando raro", sprint: "Sprint 8", board: "App Condor" },
  { id: 207599, titulo: "[PlayStore] Gerar versão e publicar app", sprint: "Sprint 8", board: "App Condor" }
];

const resumoData = [
  { label: "Itens Planejados", value: 34 },
  { label: "Itens Além do Estimado", value: 17 },
  { label: "Itens em Impedimento", value: 17 },
  { label: "User Stories Concluídas", value: 3 },
  { label: "Bugs/Tasks com Cycle Time", value: 5 }
];

const boards = ["App Condor", "Life Ultra Redondo", "Max Call", "Redesign Technos Connect", "Redesign Mormaii Smartwatches"];
const sprints = ["Sprint 8", "Sprint 15", "Sprint 17", "Sprint 23"];

export default function Page() {
  const [board, setBoard] = useState("");
  const [sprint, setSprint] = useState("");

  const filterByBoardSprint = (data) => {
    return data.filter((item) => {
      const boardMatch = board ? item.board === board : true;
      const sprintMatch = sprint ? item.sprint === sprint : true;
      return boardMatch && sprintMatch;
    });
  };

  const cycleData = filterByBoardSprint(rawCycleData);
  const burndownData = filterByBoardSprint(rawBurndownData);
  const impedimentosFiltrados = filterByBoardSprint(impedimentos);
  const alemEstimadoFiltrado = filterByBoardSprint(alemEstimado);

  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <div className="flex gap-4">
        <select onChange={(e) => setBoard(e.target.value)} value={board} className="p-2 border rounded">
          <option value="">Todos os Boards</option>
          {boards.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
        <select onChange={(e) => setSprint(e.target.value)} value={sprint} className="p-2 border rounded">
          <option value="">Todas as Sprints</option>
          {sprints.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <Card><CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">Resumo da Sprint</h2>
        <ul className="space-y-1">
          {resumoData.map((item, index) => (
            <li key={index}><strong>{item.label}:</strong> {item.value}</li>
          ))}
        </ul>
      </CardContent></Card>

      <Card><CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">Média de Cycle Time por T-Shirt Size</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cycleData}><XAxis dataKey="size" /><YAxis /><Tooltip /><Legend />
            <Bar dataKey="time" fill="skyblue" name="Cycle Time (dias)" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent></Card>

      <Card><CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">Burndown da Sprint</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={burndownData}><XAxis dataKey="date" /><YAxis /><Tooltip /><Legend />
            <Line type="monotone" dataKey="restante" stroke="blue" name="Itens Restantes" />
            <Line type="monotone" dataKey="ideal" stroke="gray" strokeDasharray="5 5" name="Ideal" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent></Card>

      <Card><CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">Itens em Impedimento</h2>
        <ul className="space-y-1">
          {impedimentosFiltrados.map((item) => (
            <li key={item.id}><strong>{item.id}</strong>: {item.titulo} <br />
              <span className="text-sm text-gray-600">Pai: {item.pai}</span>
            </li>
          ))}
        </ul>
      </CardContent></Card>

      <Card><CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">Itens Além do Estimado</h2>
        <ul className="space-y-1">
          {alemEstimadoFiltrado.map((item) => (
            <li key={item.id}><strong>{item.id}</strong>: {item.titulo} <br />
              <span className="text-sm text-gray-600">Sprint: {item.sprint}</span>
            </li>
          ))}
        </ul>
      </CardContent></Card>
    </div>
  );
}
