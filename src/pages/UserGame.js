import React, { useState, useEffect } from "react";

const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const MOBILE_WIDTH = 80;
const MOBILE_HEIGHT = 80;
const SIGNAL_SIZE = 40;
const SIGNAL_INTERVAL = 4000;
const MAX_RED_CROSS = 5;
const FACT_DISPLAY_TIME = 2000;

const MOBILE_SYMBOL = "📱";
const WIFI_SYMBOL = "📶";
const RED_CROSS_SYMBOL = "❌";

const SPACE_FACTS = [
  "The Sun is 109 times wider than Earth.",
  "A solar flare is a sudden flash of increased brightness on the Sun.",
  "Our galaxy, the Milky Way, has over 100 billion stars.",
  "Solar storms can disrupt satellite communications.",
  "The closest galaxy to us is Andromeda.",
  "The Sun's energy takes 8 minutes to reach Earth.",
  "Solar flares release energy equivalent to millions of nuclear bombs.",
  "The Milky Way is about 100,000 light-years across.",
  "Space weather can affect GPS and radio signals.",
  "The Sun is a giant ball of hot plasma."
];

function getRandomX() {
  return Math.floor(Math.random() * (GAME_WIDTH - SIGNAL_SIZE));
}

export default function SignalCatchGame() {
  const [screen, setScreen] = useState("instructions"); // instructions | playing | gameover
  const [mobileX, setMobileX] = useState(GAME_WIDTH / 2 - MOBILE_WIDTH / 2);
  const [signals, setSignals] = useState([]);
  const [score, setScore] = useState(0);
  const [redCaught, setRedCaught] = useState(0);
  const [fact, setFact] = useState(null);
  const [factProgress, setFactProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Keyboard controls
  useEffect(() => {
    function handleKeyDown(e) {
      if (screen === "instructions" && e.code === "Space") {
        startGame();
      }
      if (screen !== "playing" || fact) return;
      if (e.code === "ArrowLeft") setMobileX(x => Math.max(0, x - 30));
      if (e.code === "ArrowRight") setMobileX(x => Math.min(GAME_WIDTH - MOBILE_WIDTH, x + 30));
      if (e.code === "KeyP") setIsPaused(p => !p);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [screen, fact]);

  // Start game
  const startGame = () => {
    setScreen("playing");
    setScore(0);
    setRedCaught(0);
    setSignals([]);
    setMobileX(GAME_WIDTH / 2 - MOBILE_WIDTH / 2);
    setIsPaused(false);
    setFact(null);
  };

  // Drop signals
  useEffect(() => {
    if (screen !== "playing") return;
    if (isPaused || fact) return;

    const interval = setInterval(() => {
      const isWifi = Math.random() < 0.7;
      setSignals(prev => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: getRandomX(),
          y: -SIGNAL_SIZE,
          type: isWifi ? "wifi" : "red",
          symbol: isWifi ? WIFI_SYMBOL : RED_CROSS_SYMBOL,
        },
      ]);
    }, SIGNAL_INTERVAL);

    return () => clearInterval(interval);
  }, [screen, isPaused, fact]);

  // Game loop
  useEffect(() => {
    if (screen !== "playing") return;
    if (isPaused || fact) return;

    const frame = requestAnimationFrame(function loop() {
      setSignals(prevSignals => {
        let newSignals = [];
        let wifiCaught = 0;
        let redCaughtNow = 0;

        prevSignals.forEach(signal => {
const speed = 1 + score * 0.05; // slower, increases gradually
const newY = signal.y + speed;          if (
            newY + SIGNAL_SIZE >= GAME_HEIGHT - MOBILE_HEIGHT &&
            signal.x + SIGNAL_SIZE > mobileX &&
            signal.x < mobileX + MOBILE_WIDTH
          ) {
            if (signal.type === "wifi") wifiCaught++;
            if (signal.type === "red") redCaughtNow++;
          } else if (newY < GAME_HEIGHT) {
            newSignals.push({ ...signal, y: newY });
          }
        });

        if (wifiCaught > 0) setScore(s => s + wifiCaught);
        if (redCaughtNow > 0) {
          setRedCaught(r => {
            const newR = r + redCaughtNow;
            if (newR >= MAX_RED_CROSS) setScreen("gameover");
            showFact();
            return newR;
          });
        }

        return newSignals;
      });

      requestAnimationFrame(loop);
    });

    return () => cancelAnimationFrame(frame);
  }, [screen, isPaused, mobileX, fact, score]);

  // Show fact popup
  const showFact = () => {
    if (fact) return;
    setIsPaused(true);
    const randomFact = SPACE_FACTS[Math.floor(Math.random() * SPACE_FACTS.length)];
    setFact(randomFact);
    setFactProgress(0);
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      setFactProgress(Math.min(elapsed / FACT_DISPLAY_TIME, 1));
    }, 100);

    setTimeout(() => {
      setFact(null);
      setIsPaused(false);
      setFactProgress(0);
      clearInterval(interval);
    }, FACT_DISPLAY_TIME);
  };

  const handleRestart = () => {
    setScreen("instructions");
    setScore(0);
    setRedCaught(0);
    setSignals([]);
    setMobileX(GAME_WIDTH / 2 - MOBILE_WIDTH / 2);
    setFact(null);
    setFactProgress(0);
    setIsPaused(false);
  };

  return (
    <div
      style={{
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        margin: "20px auto",
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        background: "linear-gradient(135deg, #0f2027 0%, #2c5364 100%)",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        userSelect: "none",
      }}
      tabIndex={0}
    >
      {screen === "instructions" && (
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.7)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          fontSize: 24,
          padding: 40,
        }}>
          <h1>Signal Catch Game</h1>
          <p>Catch {WIFI_SYMBOL} wifi signals.<br />Avoid {RED_CROSS_SYMBOL} red crosses.<br />5 red crosses = Game Over.<br /><br />Press Space to Start</p>
        </div>
      )}

      {screen === "gameover" && (
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.8)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 28,
          textAlign: "center",
        }}>
          <h1>Game Over</h1>
          <p>Your Score: {score}</p>
          <button onClick={handleRestart} style={{ fontSize: 20, padding: "10px 20px", marginTop: 20 }}>Restart</button>
        </div>
      )}

      {/* Signals */}
      {signals.map(s => (
        <div key={s.id} style={{
          position: "absolute",
          left: s.x,
          top: s.y,
          fontSize: SIGNAL_SIZE,
        }}>{s.symbol}</div>
      ))}

      {/* Mobile */}
      <div style={{
        position: "absolute",
        left: mobileX,
        top: GAME_HEIGHT - MOBILE_HEIGHT,
        fontSize: MOBILE_WIDTH,
      }}>{MOBILE_SYMBOL}</div>

      {/* Score */}
      <div style={{
        position: "absolute",
        top: 10,
        left: 10,
        fontSize: 20,
      }}>Score: {score} | Red: {redCaught}/{MAX_RED_CROSS}</div>

      {/* Fact Popup */}
      {fact && (
        <div style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0,0,0,0.9)",
          padding: 20,
          borderRadius: 10,
          textAlign: "center",
        }}>
          <b>Space Fact:</b>
          <p>{fact}</p>
          <div style={{
            width: 200,
            height: 10,
            background: "#222",
            borderRadius: 5,
            overflow: "hidden",
            margin: "10px auto"
          }}>
            <div style={{
              width: `${factProgress * 100}%`,
              height: "100%",
              background: "#ffcc00",
            }} />
          </div>
        </div>
      )}
    </div>
  );
}
