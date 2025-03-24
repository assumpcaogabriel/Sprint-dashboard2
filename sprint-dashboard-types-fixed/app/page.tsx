"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";

const rawCycleData = [
  { size: "XS", time: 1.75 },
  { size: "S", time: 1.0 },
  { size: "M", time: 3.0 }
];

const burndownData = [
  { date: "17/03", restante: 20, ideal: 20 },
  { date: "18/03", restante: 20, ideal: 17.78 },
  { date: "19/03", restante: 19, ideal: 15.56 },
  { date: "20/03", restante: 15, ideal: 13.33 },
  { date: "21/03", restante: 13, ideal: 11.11 }
];

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-4 p-6">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Média de Cycle Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rawCycleData}>
              <XAxis dataKey="size" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="time" fill="skyblue" name="Cycle Time (dias)" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">Burndown da Sprint</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={burndownData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="restante" stroke="blue" name="Itens Restantes" />
              <Line type="monotone" dataKey="ideal" stroke="gray" strokeDasharray="5 5" name="Ideal" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
