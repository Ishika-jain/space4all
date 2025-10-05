import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  LinearProgress,
  Paper
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";

// Questions separated by age group
const questionsByAge = {
  kids: [
    { q: "What is the Sun made of?", options: ["Rock", "Gas", "Water"], answer: "Gas" },
    { q: "Which planet is closest to the Sun?", options: ["Mars", "Earth", "Mercury"], answer: "Mercury" },
    { q: "What do we feel from the Sun?", options: ["Wind", "Rain", "Heat"], answer: "Heat" },
    { q: "What happens when clouds cover the Sun?", options: ["It rains immediately", "It gets cooler", "It becomes night"], answer: "It gets cooler" },
    { q: "The Sun rises in which direction?", options: ["West", "East", "North"], answer: "East" },
    { q: "What gives Earth warmth and light?", options: ["Moon", "Sun", "Stars"], answer: "Sun" },
    { q: "What do plants need sunlight for?", options: ["Photosynthesis", "Sleeping", "Dancing"], answer: "Photosynthesis" },
    { q: "Which part of the Sun is the hottest?", options: ["Core", "Surface", "Rim"], answer: "Core" },
    { q: "What happens when the Sun is blocked by clouds?", options: ["It gets cooler", "It becomes night", "It rains immediately"], answer: "It gets cooler" },
    { q: "Which part of Earth gets sunlight first?", options: ["Evening side", "Morning side", "Night side"], answer: "Morning side" }
  ],

  teens: [
    { q: "Solar flares can affect which of these?", options: ["Plants", "Tides", "Radio communication"], answer: "Radio communication" },
    { q: "Which phenomenon is caused by charged particles from the Sun?", options: ["Tornado", "Aurora", "Earthquake"], answer: "Aurora" },
    { q: "What is the solar wind mostly made of?", options: ["Oxygen", "Electrons and protons", "Nitrogen"], answer: "Electrons and protons" },
    { q: "Sunspots appear dark because they are?", options: ["Invisible", "Colder than surroundings", "Hotter than surroundings"], answer: "Colder than surroundings" },
    { q: "Coronal mass ejections are dangerous for?", options: ["Mountains", "Space satellites", "Sea life"], answer: "Space satellites" },
    { q: "Solar flares can cause which of these on Earth?", options: ["Radio blackouts", "Earthquakes", "Rain"], answer: "Radio blackouts" },
    { q: "Which layer of the Sun releases most of its light?", options: ["Corona", "Photosphere", "Core"], answer: "Photosphere" },
    { q: "The Sun emits which type of energy?", options: ["Light and heat", "Sound waves", "Magnetism"], answer: "Light and heat" },
    { q: "What is the main particle in solar wind?", options: ["Proton", "Neutron", "Electron"], answer: "Proton" },
    { q: "Auroras are seen near which regions?", options: ["Poles", "Equator", "Deserts"], answer: "Poles" }
  ],

  adults: [
    { q: "Which layer of the Sun can we see with the naked eye?", options: ["Chromosphere", "Photosphere", "Corona"], answer: "Photosphere" },
    { q: "Sunspots appear dark because they are?", options: ["Hotter than surroundings", "Invisible", "Colder than surroundings"], answer: "Colder than surroundings" },
    { q: "Solar flares can disrupt?", options: ["Ocean waves", "Radio signals", "Tree growth"], answer: "Radio signals" },
    { q: "The Sun produces energy through?", options: ["Electricity", "Nuclear fusion", "Combustion"], answer: "Nuclear fusion" },
    { q: "Auroras are caused by?", options: ["Moonlight", "Earthquakes", "Charged particles from the Sun"], answer: "Charged particles from the Sun" },
    { q: "A solar cycle lasts approximately?", options: ["22 months", "5 years", "11 years"], answer: "11 years" },
    { q: "Which instrument measures solar irradiance accurately?", options: ["Radiometer", "Barometer", "Seismometer"], answer: "Radiometer" },
    { q: "Coronal mass ejections can affect?", options: ["Rivers", "Satellites", "Mountains"], answer: "Satellites" },
    { q: "Solar wind is made of?", options: ["Oxygen", "Charged particles", "Water vapor"], answer: "Charged particles" },
    { q: "Sunlight is important for?", options: ["Rainfall", "Moon phases", "Vitamin D production"], answer: "Vitamin D production" }
  ]
};

function QuizPage() {
  const { user } = useContext(UserContext);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [answersLog, setAnswersLog] = useState([]);

  let selectedQuestions = [];
  if (user.age < 12) selectedQuestions = questionsByAge.kids;
  else if (user.age < 18) selectedQuestions = questionsByAge.teens;
  else selectedQuestions = questionsByAge.adults;

  const handleSelect = (option) => {
    if (answered) return;
    setSelectedAnswer(option);
    setAnswered(true);

    setAnswersLog([
      ...answersLog,
      {
        question: selectedQuestions[currentQ].q,
        selected: option,
        correct: selectedQuestions[currentQ].answer,
      }
    ]);

    if (option === selectedQuestions[currentQ].answer) setScore(score + 1);
  };

  const handleNext = () => {
    if (currentQ + 1 < selectedQuestions.length) {
      setCurrentQ(currentQ + 1);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const handleRetake = () => {
    setCurrentQ(0);
    setScore(0);
    setFinished(false);
    setSelectedAnswer(null);
    setAnswered(false);
    setAnswersLog([]);
  };

  return (
    <Box
  sx={{
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    p: 2,
    background: `
      radial-gradient(circle at 20% 20%, rgba(255, 235, 59, 0.8), transparent 40%), 
      radial-gradient(circle at 80% 80%, rgba(255, 152, 0, 0.7), transparent 50%), 
      radial-gradient(circle at 50% 50%, rgba(255, 193, 7, 0.6), transparent 60%), 
      linear-gradient(to bottom, #ffe082, #ff8a65)
    `,
    backgroundBlendMode: "screen",
  }}
>

      <Card
        sx={{
          maxWidth: 700,
          width: "100%",
          borderRadius: "16px",
          boxShadow: 6,
          backgroundColor: "white"
        }}
      >
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", color: "#1976d2" }}>
            Solar Weather Quiz
          </Typography>

          {finished ? (
            <Paper elevation={2} sx={{ p: 3, mt: 2, borderRadius: "12px" }}>
              <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5 }}>
                <Typography variant="h5" color="success.main" gutterBottom>
                  Quiz Completed!
                </Typography>
                <Typography variant="h6" gutterBottom>
                  You scored {score} / {selectedQuestions.length}
                </Typography>

                <Typography variant="h6" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                  Review Answers:
                </Typography>

                <Box sx={{ textAlign: "left", maxHeight: 400, overflowY: "auto", mb: 2 }}>
                  {answersLog.map((item, idx) => (
                    <Paper key={idx} elevation={2} sx={{ p: 2, mb: 1, borderRadius: "10px", backgroundColor: item.selected === item.correct ? "#e8f5e9" : "#ffebee" }}>
                      <Typography variant="subtitle1" fontWeight="bold">Q{idx + 1}: {item.question}</Typography>
                      <Typography variant="body2">Your answer: {item.selected}</Typography>
                      {item.selected !== item.correct && <Typography variant="body2" color="success.main">Correct answer: {item.correct}</Typography>}
                    </Paper>
                  ))}
                </Box>

                <Button variant="contained" sx={{ mt: 2, px: 4, py: 1.5, borderRadius: "10px", fontSize: "16px", background: "#1976d2", "&:hover": { background: "#0d47a1" } }} onClick={handleRetake}>
                  Retake Quiz
                </Button>
              </motion.div>
            </Paper>
          ) : (
            <>
              <LinearProgress variant="determinate" value={((currentQ + 1) / selectedQuestions.length) * 100} sx={{ mb: 3, height: 10, borderRadius: "5px" }} />

              <AnimatePresence mode="wait">
                <motion.div key={currentQ} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.4 }}>
                  <Typography variant="h6" gutterBottom>Question {currentQ + 1} of {selectedQuestions.length}</Typography>
                  <Typography variant="body1" sx={{ mb: 3, fontSize: "18px" }}>{selectedQuestions[currentQ].q}</Typography>

                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {selectedQuestions[currentQ].options.map((opt) => {
                      let btnColor = "primary";
                      if (answered) {
                        if (opt === selectedQuestions[currentQ].answer) btnColor = "success" ;
                        else if (opt === selectedAnswer && opt !== selectedQuestions[currentQ].answer) btnColor = "error";
                        else btnColor = "inherit";
                      }

                      return (
                        <Button key={opt} onClick={() => handleSelect(opt)} variant={selectedAnswer === opt ? "contained" : "outlined"} color={btnColor} sx={{ py: 1.5, borderRadius: "12px", fontSize: "16px", textTransform: "none" }}>
                          {opt}
                        </Button>
                      );
                    })}
                  </Box>

                  {answered && (
                    <Typography sx={{ mt: 2, fontWeight: "bold" }} color={selectedAnswer === selectedQuestions[currentQ].answer ? "success.main" : "error.main"}>
                      {selectedAnswer === selectedQuestions[currentQ].answer ? "✅ Correct!" : `❌ Wrong! Correct answer: ${selectedQuestions[currentQ].answer}`}
                    </Typography>
                  )}

                  <Box sx={{ mt: 3 }}>
                    <Button variant="contained" disabled={!answered} onClick={handleNext} sx={{ px: 4, py: 1.5, borderRadius: "10px", fontSize: "16px", background: "#1976d2", "&:hover": { background: "#0d47a1" } }}>
                      {currentQ + 1 === selectedQuestions.length ? "Finish Quiz" : "Next"}
                    </Button>
                  </Box>
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}

export default QuizPage;

