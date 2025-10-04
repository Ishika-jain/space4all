"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const words = [
  {
    name: "Solar Flare",
    definition:
      "A solar flare is a sudden flash of brightness observed near the Sun's surface, releasing a lot of energy.",
    graphData: [
      { time: "00:00", intensity: 5 },
      { time: "01:00", intensity: 20 },
      { time: "02:00", intensity: 35 },
      { time: "03:00", intensity: 25 },
      { time: "04:00", intensity: 10 },
    ],
  },
  {
    name: "Coronal Mass Ejection",
    definition:
      "A CME is a significant release of plasma and magnetic field from the solar corona into space.",
    graphData: [
      { time: "00:00", intensity: 10 },
      { time: "01:00", intensity: 15 },
      { time: "02:00", intensity: 30 },
      { time: "03:00", intensity: 45 },
      { time: "04:00", intensity: 20 },
    ],
  },
  {
    name: "Geomagnetic Storm",
    definition:
      "A temporary disturbance of Earth's magnetosphere caused by solar wind shock waves and/or CMEs.",
    graphData: [
      { time: "00:00", intensity: 2 },
      { time: "01:00", intensity: 8 },
      { time: "02:00", intensity: 12 },
      { time: "03:00", intensity: 18 },
      { time: "04:00", intensity: 10 },
    ],
  },
];

export default function Glossary() {
  const [selectedWord, setSelectedWord] = useState(words[0]);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Left panel */}
      <div
        style={{
          width: "30%",
          borderRight: "1px solid #ccc",
          overflowY: "auto",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0 }}>
          {words.map((word) => (
            <li
              key={word.name}
              onClick={() => setSelectedWord(word)}
              style={{
                padding: "1rem",
                cursor: "pointer",
                backgroundColor:
                  selectedWord.name === word.name ? "#f0f0f0" : "transparent",
              }}
            >
              {word.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right panel */}
      <div style={{ width: "70%", padding: "2rem" }}>
        <h2>{selectedWord.name}</h2>
        <p>{selectedWord.definition}</p>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={selectedWord.graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="intensity"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
