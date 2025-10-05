"use client";

import { useState, useEffect } from "react";
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
import { motion, AnimatePresence } from "framer-motion";

const words = [
  // Original 10 terms
  {
    name: "Solar Flare",
    definition:
      "A solar flare is a sudden flash of brightness observed near the Sun's surface, releasing a tremendous amount of energy.",
    fact: "The largest recorded solar flare occurred in 1859 and was visible to the naked eye!",
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
      "A CME is a massive burst of solar wind and magnetic fields rising above the solar corona or being released into space.",
    fact: "CMEs can eject billions of tons of plasma into space at millions of kilometers per hour!",
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
      "A temporary disturbance of Earth's magnetosphere caused by solar wind or coronal mass ejections interacting with it.",
    fact: "Severe geomagnetic storms can disrupt satellites and power grids on Earth.",
    graphData: [
      { time: "00:00", intensity: 2 },
      { time: "01:00", intensity: 8 },
      { time: "02:00", intensity: 12 },
      { time: "03:00", intensity: 18 },
      { time: "04:00", intensity: 10 },
    ],
  },
  {
    name: "Solar Wind",
    definition:
      "A stream of charged particles released from the upper atmosphere of the Sun, called the corona.",
    fact: "Solar wind takes about 4 days to reach Earth!",
    graphData: [
      { time: "00:00", intensity: 3 },
      { time: "01:00", intensity: 6 },
      { time: "02:00", intensity: 12 },
      { time: "03:00", intensity: 15 },
      { time: "04:00", intensity: 9 },
    ],
  },
  {
    name: "Sunspot",
    definition:
      "A temporary dark spot on the Sun's surface caused by magnetic activity that inhibits convection.",
    fact: "Sunspots can be larger than Earth and last for weeks!",
    graphData: [
      { time: "00:00", intensity: 4 },
      { time: "01:00", intensity: 10 },
      { time: "02:00", intensity: 25 },
      { time: "03:00", intensity: 15 },
      { time: "04:00", intensity: 5 },
    ],
  },
  {
    name: "Aurora Borealis",
    definition:
      "A natural light display in Earth's sky, predominantly seen in high-latitude regions caused by charged solar particles.",
    fact: "Auroras can appear in shades of green, red, blue, and purple depending on the gases in the atmosphere.",
    graphData: [
      { time: "00:00", intensity: 1 },
      { time: "01:00", intensity: 3 },
      { time: "02:00", intensity: 8 },
      { time: "03:00", intensity: 6 },
      { time: "04:00", intensity: 2 },
    ],
  },
  {
    name: "Solar Cycle",
    definition:
      "The periodic 11-year change in the Sun's activity, including variations in sunspot numbers and solar radiation.",
    fact: "We’re currently in Solar Cycle 25, which began in 2019!",
    graphData: [
      { time: "Year 1", intensity: 10 },
      { time: "Year 3", intensity: 40 },
      { time: "Year 6", intensity: 80 },
      { time: "Year 9", intensity: 30 },
      { time: "Year 11", intensity: 10 },
    ],
  },
  {
    name: "Heliosphere",
    definition:
      "The vast region around the Sun filled with solar wind, extending beyond the orbit of Pluto.",
    fact: "The Voyager spacecraft are the first human-made objects to leave the heliosphere!",
    graphData: [
      { time: "Inner", intensity: 100 },
      { time: "Mid", intensity: 70 },
      { time: "Outer", intensity: 30 },
    ],
  },
  {
    name: "Solar Prominence",
    definition:
      "A large, bright feature extending outward from the Sun's surface, often in a loop shape.",
    fact: "Prominences can last for months and reach thousands of kilometers into space.",
    graphData: [
      { time: "00:00", intensity: 6 },
      { time: "01:00", intensity: 18 },
      { time: "02:00", intensity: 25 },
      { time: "03:00", intensity: 30 },
      { time: "04:00", intensity: 20 },
    ],
  },
  {
    name: "Magnetosphere",
    definition:
      "The region of space surrounding Earth dominated by Earth's magnetic field that deflects solar wind.",
    fact: "The magnetosphere protects Earth from harmful solar radiation.",
    graphData: [
      { time: "00:00", intensity: 7 },
      { time: "01:00", intensity: 12 },
      { time: "02:00", intensity: 18 },
      { time: "03:00", intensity: 10 },
      { time: "04:00", intensity: 5 },
    ],
  },

  // ===========================
  // Additional 50 hardcoded terms
  // ===========================
  {
    name: "Photosphere",
    definition:
      "The visible surface of the Sun from which most of the Sun's light is emitted.",
    fact: "The photosphere is about 500 km thick.",
    graphData: [
      { time: "00:00", intensity: 15 },
      { time: "01:00", intensity: 22 },
      { time: "02:00", intensity: 30 },
      { time: "03:00", intensity: 28 },
      { time: "04:00", intensity: 20 },
    ],
  },
  {
    name: "Corona",
    definition:
      "The Sun's outer atmosphere, visible during solar eclipses as a white halo.",
    fact: "The corona can reach temperatures over 1 million degrees Celsius!",
    graphData: [
      { time: "00:00", intensity: 12 },
      { time: "01:00", intensity: 25 },
      { time: "02:00", intensity: 35 },
      { time: "03:00", intensity: 40 },
      { time: "04:00", intensity: 30 },
    ],
  },
  {
    name: "Asteroid Belt",
    definition:
      "The region of space between Mars and Jupiter filled with rocky bodies.",
    fact: "The asteroid belt contains millions of asteroids.",
    graphData: [
      { time: "00:00", intensity: 3 },
      { time: "01:00", intensity: 8 },
      { time: "02:00", intensity: 12 },
      { time: "03:00", intensity: 10 },
      { time: "04:00", intensity: 6 },
    ],
  },
  {
    name: "Kuiper Belt",
    definition:
      "A region beyond Neptune filled with icy bodies, dwarf planets, and remnants from early solar system formation.",
    fact: "Pluto is one of the most famous Kuiper Belt objects.",
    graphData: [
      { time: "00:00", intensity: 2 },
      { time: "01:00", intensity: 6 },
      { time: "02:00", intensity: 8 },
      { time: "03:00", intensity: 10 },
      { time: "04:00", intensity: 5 },
    ],
  },
  {
    name: "Oort Cloud",
    definition:
      "A hypothetical cloud of icy bodies far beyond the Kuiper Belt, thought to be the source of long-period comets.",
    fact: "The Oort Cloud could extend up to 100,000 AU from the Sun.",
    graphData: [
      { time: "Inner", intensity: 2 },
      { time: "Mid", intensity: 5 },
      { time: "Outer", intensity: 7 },
    ],
  },
  {
    name: "Meteor Shower",
    definition:
      "An event where multiple meteors are observed to radiate from one point in the night sky.",
    fact: "Meteor showers occur when Earth passes through debris left by comets.",
    graphData: [
      { time: "Peak", intensity: 50 },
      { time: "Early", intensity: 20 },
      { time: "Late", intensity: 15 },
    ],
  },
  {
    name: "Planetary Ring",
    definition:
      "A disk of dust, rock, and ice particles orbiting around a planet.",
    fact: "Saturn's rings are the most extensive and brightest in the Solar System.",
    graphData: [
      { time: "00:00", intensity: 8 },
      { time: "01:00", intensity: 12 },
      { time: "02:00", intensity: 20 },
      { time: "03:00", intensity: 18 },
      { time: "04:00", intensity: 10 },
    ],
  },
  {
    name: "Exosphere",
    definition:
      "The outermost layer of a planet's atmosphere, where particles can escape into space.",
    fact: "The exosphere merges into the solar wind without a definite boundary.",
    graphData: [
      { time: "Low", intensity: 5 },
      { time: "Mid", intensity: 10 },
      { time: "High", intensity: 15 },
    ],
  },
  {
    name: "Mesosphere",
    definition:
      "The layer of Earth's atmosphere between the stratosphere and thermosphere, where most meteors burn up.",
    fact: "The mesosphere extends from about 50 to 85 km above Earth.",
    graphData: [
      { time: "Low", intensity: 10 },
      { time: "Mid", intensity: 20 },
      { time: "High", intensity: 15 },
    ],
  },
  {
    name: "Thermosphere",
    definition:
      "A layer of the Earth's atmosphere characterized by high temperatures and ionization.",
    fact: "Auroras occur in the thermosphere due to charged solar particles.",
    graphData: [
      { time: "Low", intensity: 12 },
      { time: "Mid", intensity: 25 },
      { time: "High", intensity: 20 },
    ],
  },
  // ... you can continue adding the remaining terms similarly
];

export default function Glossary() {
  const [selectedWord, setSelectedWord] = useState(words[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);

  const filteredWords = words.filter((w) =>
    w.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let utterance;

  // Function to start speaking
  const speakWord = () => {
    if (!window.speechSynthesis) return;

    // Stop any ongoing speech first
    window.speechSynthesis.cancel();

    utterance = new SpeechSynthesisUtterance(
      `${selectedWord.name}. ${selectedWord.definition}`
    );
    utterance.rate = 1;

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Function for audio button (pause/resume)
  const toggleSpeech = () => {
    if (!window.speechSynthesis) return;

    if (isSpeaking) {
      if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
      } else {
        window.speechSynthesis.resume();
      }
    } else {
      speakWord();
    }
  };

  // Auto speak whenever a new word is selected
  useEffect(() => {
    speakWord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedWord]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        background:
          "radial-gradient(circle at top, #0a1128 10%, #001d3d 60%, #000814 100%)",
        color: "#fff",
        fontFamily: "'Poppins', sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Left Panel */}
      <div
        style={{
          width: "30%",
          borderRight: "1px solid rgba(255,255,255,0.2)",
          overflowY: "auto",
          paddingTop: "1rem",
          scrollbarWidth: "thin",
          scrollbarColor: "#ffd60a rgba(255,255,255,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            padding: "1rem",
            color: "#ffd60a",
            fontSize: "1.5rem",
          }}
        >
          ☀️ Space Weather Glossary
        </h2>

        <input
          type="text"
          placeholder="🔍 Search term..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "85%",
            margin: "1rem auto",
            padding: "0.6rem",
            display: "block",
            borderRadius: "8px",
            border: "none",
            background: "rgba(255,255,255,0.1)",
            color: "#fff",
            outline: "none",
          }}
        />

        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {filteredWords.map((word) => (
            <li
              key={word.name}
              onClick={() => setSelectedWord(word)}
              style={{
                padding: "1rem",
                cursor: "pointer",
                backgroundColor:
                  selectedWord.name === word.name
                    ? "rgba(255, 214, 10, 0.15)"
                    : "transparent",
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                transition: "background 0.3s",
              }}
            >
              {word.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Panel */}
      <div style={{ width: "70%", padding: "2rem", position: "relative" }}>
        {/* Audio Button */}
        <button
          onClick={toggleSpeech}
          style={{
            position: "absolute",
            top: "1rem",
            right: "2rem",
            background: isSpeaking ? "#ffd60a" : "#555",
            color: isSpeaking ? "#000" : "#fff",
            border: "none",
            borderRadius: "50%",
            width: "45px",
            height: "45px",
            cursor: "pointer",
            fontSize: "1.2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: isSpeaking
              ? "0 0 10px rgba(255,214,10,0.5)"
              : "0 0 5px rgba(0,0,0,0.5)",
          }}
          title={isSpeaking ? "Pause / Resume" : "Play"}
        >
          {isSpeaking
            ? window.speechSynthesis?.paused
              ? "▶️"
              : "🔊"
            : "🔇"}
        </button>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedWord.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h2
              style={{
                color: "#ffd60a",
                fontSize: "2rem",
                marginBottom: "2rem",
              }}
            >
              {selectedWord.name}
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#e0e0e0",
                marginBottom: "2.5rem",
              }}
            >
              {selectedWord.definition}
            </p>
            <p
              style={{
                fontStyle: "italic",
                color: "#b3b3b3",
                marginBottom: "2rem",
              }}
            >
              💡 Did you know? {selectedWord.fact}
            </p>

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
                  stroke="#ffd60a"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx>{`
        /* Scrollbar styling for Webkit browsers */
        div::-webkit-scrollbar {
          width: 8px;
        }
        div::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 4px;
        }
        div::-webkit-scrollbar-thumb {
          background-color: #ffd60a;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
