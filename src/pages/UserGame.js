import React, { useState, useEffect, useRef } from "react";

// Game constants
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const MOBILE_WIDTH = 80;
const MOBILE_HEIGHT = 80;
const SIGNAL_SIZE = 40;
const SIGNAL_INTERVAL = 900;
const MAX_RED_CROSS = 5;
const FACT_DISPLAY_TIME = 10000; // 10 seconds

// Unicode symbols
const MOBILE_SYMBOL = "📱";
const WIFI_SYMBOL = "📶";
const RED_CROSS_SYMBOL = "❌";
const LEFT_ARROW = "⬅️";
const RIGHT_ARROW = "➡️";
const SPACE_BAR = "⎵";

// Space facts
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

// Helper: random X position for signals
function getRandomX() {
  return Math.floor(Math.random() * (GAME_WIDTH - SIGNAL_SIZE));
}

// Signal types
const SIGNAL_TYPES = [
  { type: "wifi", symbol: WIFI_SYMBOL },
  { type: "red", symbol: RED_CROSS_SYMBOL },
];

export default function UserGame() {
  const [screen, setScreen] = useState("instructions");
  const [mobileX, setMobileX] = useState(GAME_WIDTH / 2 - MOBILE_WIDTH / 2);
  const [signals, setSignals] = useState([]);
  const [score, setScore] = useState(0);
  const [redCaught, setRedCaught] = useState(0);
  const [fact, setFact] = useState(null);
  const [factTimeout, setFactTimeout] = useState(null);
  const [factProgress, setFactProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const signalsRef = useRef(signals);
  const mobileXRef = useRef(mobileX);
  const redCaughtRef = useRef(redCaught);
  const scoreRef = useRef(score);
  const animationRef = useRef();
  const signalIntervalRef = useRef();
  const factProgressIntervalRef = useRef();

  useEffect(() => { signalsRef.current = signals; }, [signals]);
  useEffect(() => { mobileXRef.current = mobileX; }, [mobileX]);
  useEffect(() => { redCaughtRef.current = redCaught; }, [redCaught]);
  useEffect(() => { scoreRef.current = score; }, [score]);

  // Controls
  useEffect(() => {
    function handleKeyDown(e) {
      if (screen === "instructions" && e.code === "Space") {
        setScreen("playing");
        return;
      }
      if (screen !== "playing") return;
      if (fact) return;
      if (e.code === "ArrowLeft" && !isPaused) {
        setMobileX((x) => Math.max(0, x - 30));
      }
      if (e.code === "ArrowRight" && !isPaused) {
        setMobileX((x) => Math.min(GAME_WIDTH - MOBILE_WIDTH, x + 30));
      }
      if (e.code === "KeyP") {
        setIsPaused((prev) => !prev);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [screen, isPaused, fact]);

  // Drop signals
  useEffect(() => {
    if (screen !== "playing" || isPaused || fact) return;
    signalIntervalRef.current = setInterval(() => {
      const isWifi = Math.random() < 0.7;
      const type = isWifi ? SIGNAL_TYPES[0] : SIGNAL_TYPES[1];
      setSignals((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          x: getRandomX(),
          y: -SIGNAL_SIZE,
          type: type.type,
          symbol: type.symbol,
          caught: false,
        },
      ]);
    }, SIGNAL_INTERVAL);
    return () => clearInterval(signalIntervalRef.current);
  }, [screen, isPaused, fact]);

  // Game loop
  useEffect(() => {
    if (screen !== "playing" || isPaused || fact) return;

    function gameLoop() {
      const speed = Math.min(3 + Math.floor(scoreRef.current / 5), 10);

      setSignals((prevSignals) => {
        let newSignals = [];
        let caughtWifi = 0;
        let caughtRed = 0;
        let redCaughtNow = false;

        prevSignals.forEach((signal) => {
          let newY = signal.y + speed;
          let isCaught = false;

          if (
            !signal.caught &&
            newY + SIGNAL_SIZE >= GAME_HEIGHT - MOBILE_HEIGHT &&
            signal.x + SIGNAL_SIZE > mobileXRef.current &&
            signal.x < mobileXRef.current + MOBILE_WIDTH
          ) {
            isCaught = true;
            signal.caught = true;
            if (signal.type === "wifi") {
              caughtWifi += 1;
            }
            if (signal.type === "red") {
              caughtRed += 1;
              redCaughtNow = true;
            }
          }

          if (!isCaught && newY < GAME_HEIGHT) {
            newSignals.push({ ...signal, y: newY });
          }
        });

        if (caughtWifi > 0) setScore((s) => s + caughtWifi);
        if (caughtRed > 0) {
          setRedCaught((r) => {
            const newR = r + caughtRed;
            if (newR >= MAX_RED_CROSS) setScreen("gameover");
            return newR;
          });
        }
        if (redCaughtNow) showSpaceFact();

        return newSignals;
      });

      if (screen === "playing" && !isPaused && !fact) {
        animationRef.current = requestAnimationFrame(gameLoop);
      }
    }

    animationRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationRef.current);
  }, [screen, isPaused, fact]);

  // Show fact
  function showSpaceFact() {
    if (factTimeout) clearTimeout(factTimeout);
    setIsPaused(true);
    const randomFact = SPACE_FACTS[Math.floor(Math.random() * SPACE_FACTS.length)];
    setFact(randomFact);
    setFactProgress(0);

    let start = Date.now();
    factProgressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setFactProgress(Math.min(elapsed / FACT_DISPLAY_TIME, 1));
    }, 100);

    const timeout = setTimeout(() => {
      setFact(null);
      setIsPaused(false);
      setFactProgress(0);
      clearInterval(factProgressIntervalRef.current);
    }, FACT_DISPLAY_TIME);
    setFactTimeout(timeout);
  }

  // Cleanup
  useEffect(() => {
    return () => {
      if (factTimeout) clearTimeout(factTimeout);
      if (factProgressIntervalRef.current) clearInterval(factProgressIntervalRef.current);
    };
  }, []);

  // Restart
  function handleRestart() {
    setScreen("instructions");
    setScore(0);
    setRedCaught(0);
    setSignals([]);
    setMobileX(GAME_WIDTH / 2 - MOBILE_WIDTH / 2);
    setFact(null);
    setIsPaused(false);
    setFactProgress(0);
    if (factTimeout) clearTimeout(factTimeout);
    if (factProgressIntervalRef.current) clearInterval(factProgressIntervalRef.current);
  }

  function handlePausePlay() {
    if (fact) return;
    setIsPaused((prev) => !prev);
  }

  return (
    <div
      style={{
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        margin: "40px auto",
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 0 40px #222",
        background: "linear-gradient(135deg, #0f2027 0%, #2c5364 100%)",
        color: "#fff",
        fontFamily: "Segoe UI, Arial, sans-serif",
        userSelect: "none",
      }}
      tabIndex={0}
    >
      {/* Instructions */}
      {screen === "instructions" && (
        <div style={{ position: "absolute", width: "100%", height: "100%", background: "rgba(10,20,40,0.85)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", zIndex: 2 }}>
          <h2 style={{ fontSize: 40, color: "#ffe066" }}>Signal Catch Game</h2>
          <p>Press Space Bar to Start</p>
        </div>
      )}

      {/* Game Over */}
      {screen === "gameover" && (
        <div style={{ position: "absolute", width: "100%", height: "100%", background: "rgba(10,20,40,0.92)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
          <h2>Game Over</h2>
          <p>Your Score: <b>{score}</b></p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}

      {/* Playing */}
      {screen === "playing" && (
        <>
          {/* Pause button */}
          <button onClick={handlePausePlay} style={{ position: "absolute", top: 16, right: 24, zIndex: 2 }}>
            {isPaused ? "Resume" : "Pause"}
          </button>

          {/* Score */}
          <div style={{ position: "absolute", top: 10, left: 20, fontSize: 22 }}>
            Score: <b>{score}</b> | Red Cross: {redCaught}/{MAX_RED_CROSS}
          </div>

          {/* Signals */}
          {signals.map((signal) => (
            <div
              key={signal.id}
              style={{
                position: "absolute",
                left: signal.x,
                top: signal.y,
                width: SIGNAL_SIZE,
                height: SIGNAL_SIZE,
                fontSize: SIGNAL_SIZE,
                textAlign: "center",
                pointerEvents: "none",
                filter: signal.type === "wifi" ? "drop-shadow(0 0 8px #00eaff)" : "drop-shadow(0 0 8px #ff4444)",
                // 🔥 Removed transition: top
              }}
            >
              {signal.symbol}
            </div>
          ))}

          {/* Mobile */}
          <div
            style={{
              position: "absolute",
              left: mobileX,
              top: GAME_HEIGHT - MOBILE_HEIGHT,
              width: MOBILE_WIDTH,
              height: MOBILE_HEIGHT,
              fontSize: MOBILE_WIDTH,
              textAlign: "center",
              pointerEvents: "none",
              filter: "drop-shadow(0 0 12px #fff)",
              // 🔥 Removed transition: left
            }}
          >
            {MOBILE_SYMBOL}
          </div>

          {/* Fact popup */}
          {fact && (
            <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)", background: "rgba(30,40,60,0.97)", color: "#ffe066", padding: "22px 36px", borderRadius: 16 }}>
              <b>Space Fact:</b><br />
              {fact}
              <div style={{ width: "100%", height: 12, background: "#222", borderRadius: 8, marginTop: 8 }}>
                <div style={{ width: `${factProgress * 100}%`, height: "100%", background: "#ffe066" }} />
              </div>
            </div>
          )}

          {/* Pause overlay */}
          {isPaused && !fact && (
            <div style={{ position: "absolute", width: "100%", height: "100%", background: "rgba(10,20,40,0.7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, color: "#ffe066" }}>
              Paused
            </div>
          )}
        </>
      )}
    </div>
  );
}
