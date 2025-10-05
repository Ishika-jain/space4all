"use client"

import React, { useState, useEffect, useRef, useCallback } from "react";

const ASTRONAUT_FACTS = [
  "Solar flares can disrupt communication systems on spacecraft, leaving astronauts temporarily unable to contact Earth.",
  "Intense solar radiation during space weather events can damage spacecraft electronics and increase cancer risk for astronauts.",
  "Solar storms can cause astronauts to experience vision problems due to radiation affecting their eyes and optic nerves.",
  "During major solar events, astronauts must take shelter in specially shielded areas of the spacecraft to reduce radiation exposure.",
  "Solar particle events can cause acute radiation sickness in astronauts if they're caught outside during a spacewalk.",
];

export default function AstronautGame() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [flames, setFlames] = useState([]);
  const [showFactPopup, setShowFactPopup] = useState(false);
  const [currentFact, setCurrentFact] = useState("");
  const [factProgress, setFactProgress] = useState(100);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  const gameAreaRef = useRef(null);
  const flameIdRef = useRef(0);
  const isDraggingRef = useRef(false);
  const rafRef = useRef(null);
  const sliderPositionRef = useRef(50);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (gameStarted && !gameOver && !showFactPopup && startTime) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStarted, gameOver, showFactPopup, startTime]);

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setLives(5);
    setSliderPosition(50);
    sliderPositionRef.current = 50;
    setFlames([]);
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  useEffect(() => {
    if (!gameStarted || gameOver || showFactPopup) return;

    const spawnInterval = setInterval(() => {
      const satelliteLeft = 30;
      const satelliteRight = 70;
      const newFlame = {
        id: flameIdRef.current++,
        x: Math.random() * (satelliteRight - satelliteLeft) + satelliteLeft,
        y: 0,
        speed: Math.random() * 1.5 + 1.5,
      };
      setFlames((prev) => [...prev, newFlame]);
    }, 800);

    return () => clearInterval(spawnInterval);
  }, [gameStarted, gameOver, showFactPopup]);

  useEffect(() => {
    if (!gameStarted || gameOver || showFactPopup) return;

    const moveInterval = setInterval(() => {
      setFlames((prev) => {
        const updated = prev
          .map((flame) => ({ ...flame, y: flame.y + flame.speed }))
          .filter((flame) => {
            if (flame.y >= 60 && flame.y <= 65) {
              const sliderLeft = sliderPositionRef.current - 5;
              const sliderRight = sliderPositionRef.current + 5;
              if (flame.x >= sliderLeft && flame.x <= sliderRight) {
                setScore((s) => s + 10);
                return false;
              }
            }

            if (flame.y >= 85 && flame.y <= 95) {
              const satelliteLeft = 50 - 20;
              const satelliteRight = 50 + 20;
              if (flame.x >= satelliteLeft && flame.x <= satelliteRight) {
                handleHit();
                return false;
              }
            }

            return flame.y < 100;
          });
        return updated;
      });
    }, 50);

    return () => clearInterval(moveInterval);
  }, [gameStarted, gameOver, showFactPopup]);

  const handleHit = () => {
    const newLives = lives - 1;
    setLives(newLives);

    if (newLives <= 0) {
      setGameOver(true);
      return;
    }

    // Pick random fact
    const randomFact = ASTRONAUT_FACTS[Math.floor(Math.random() * ASTRONAUT_FACTS.length)];
    setCurrentFact(randomFact);
    setShowFactPopup(true);
    setFactProgress(100);

    let startTimeAnim = null;

    const animateProgress = (timestamp) => {
      if (!startTimeAnim) startTimeAnim = timestamp;
      const elapsed = timestamp - startTimeAnim;
      const duration = 5000;
      const progress = Math.max(0, 100 - (elapsed / duration) * 100);
      setFactProgress(progress);
      if (progress > 0) {
        requestAnimationFrame(animateProgress);
      } else {
        setShowFactPopup(false);
      }
    };

    requestAnimationFrame(animateProgress);
  };

  const updateSliderPosition = useCallback((e) => {
    if (!gameAreaRef.current) return;

    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    rafRef.current = requestAnimationFrame(() => {
      if (!gameAreaRef.current) return;
      const rect = gameAreaRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const newPosition = Math.max(5, Math.min(95, x));
      setSliderPosition(newPosition);
      sliderPositionRef.current = newPosition;
    });
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handlePointerDown = (e) => {
    if (!gameStarted && !gameOver) {
      startGame();
      return;
    }
    if (!gameStarted || gameOver || showFactPopup) return;
    isDraggingRef.current = true;
    updateSliderPosition(e);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    updateSliderPosition(e);
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div className="game-container">
      <div className="game-card">
        {/* Header */}
        <div className="game-header">
          <div className="header-left">
            <div className="sun-icon-wrapper">
              <svg className="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </div>
            <h1 className="game-title">Solar Flame Catcher</h1>
          </div>
          {gameStarted && !gameOver && (
            <div className="header-right">
              <div className="stat-badge score-badge">
                Score: <span>{score}</span>
              </div>
              <div className="stat-badge time-badge">
                Time: <span>{formatTime(elapsedTime)}</span>
              </div>
              <div className="lives-container">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={`heart ${i < lives ? "filled" : "empty"}`}>
                    ♥
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Game Area */}
        <div
          ref={gameAreaRef}
          className="game-area"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {!gameStarted && !gameOver && (
            <div className="start-screen">
              <h2>Protect the Satellite!</h2>
              <p>Use your shield to catch solar flares before they hit the satellite</p>
              <p>Tap to Start</p>
            </div>
          )}

          {gameOver && (
            <div className="game-over-screen">
              <h2>Mission Failed!</h2>
              <p>Score: {score}</p>
              <p>Time: {formatTime(elapsedTime)}</p>
              <button onClick={startGame}>Retry Mission</button>
            </div>
          )}

          {/* Flames */}
          {flames.map((flame) => (
            <div
              key={flame.id}
              className="solar-flare"
              style={{ left: `${flame.x}%`, top: `${flame.y}%` }}
            />
          ))}

          {/* Shield */}
          {gameStarted && !gameOver && (
            <div className="shield" style={{ left: `${sliderPosition}%` }} />
          )}

          {/* Satellite SVG */}
<div
  className="satellite"
  style={{
    bottom:'0px',
    left:"50%",
    position: "absolute",

  }}
>
  <svg
    viewBox="0 0 64 64"
    width="64"
    height="64"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Main body */}
    <rect x="22" y="20" width="20" height="24" rx="4" ry="4" fill="#52525b" stroke="#3b82f6" strokeWidth="2"/>
    
    {/* Left solar panel */}
    <rect x="6" y="22" width="12" height="20" fill="linear-gradient(to right, #3b82f6, #60a5fa)" stroke="#3b82f6" strokeWidth="1"/>
    
    {/* Right solar panel */}
    <rect x="46" y="22" width="12" height="20" fill="linear-gradient(to left, #3b82f6, #60a5fa)" stroke="#3b82f6" strokeWidth="1"/>
    
    {/* Antenna */}
    <rect x="30" y="12" width="4" height="8" fill="#52525b"/>
    <circle cx="32" cy="10" r="2" fill="#ef4444" />
    
    {/* Window */}
    <rect x="28" y="26" width="8" height="8" rx="1" ry="1" fill="#3b82f6" stroke="#22c55e" strokeWidth="1"/>
  </svg>
</div>


          {/* Fact Popup */}
          {showFactPopup && (
            <div className="fact-popup-overlay">
              <div className="fact-popup">
                <h3>Solar Weather Impact</h3>
                <p>{currentFact}</p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${factProgress}%` }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CSS */}
      <style jsx>{`
        .game-container {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #0a0a0f;
        }
        .game-card {
          width: 800px;
          background: #16162a;
          border-radius: 12px;
          overflow: hidden;
          border: 2px solid #2a2a3e;
        }
        .game-header {
          display: flex;
          justify-content: space-between;
          padding: 12px;
          border-bottom: 2px solid #2a2a3e;
          color: #e5e5e7;
        }
        .header-left { display: flex; gap: 12px; align-items: center; }
        .sun-icon-wrapper { background: rgba(251,191,36,0.2); padding: 4px; border-radius: 50%; }
        .sun-icon { width: 24px; height: 24px; color: #fbbf24; }
        .game-title { font-size: 24px; font-weight: bold; }
        .header-right { display: flex; gap: 16px; align-items: center; }
        .stat-badge { background: rgba(0,0,0,0.2); padding: 4px 8px; border-radius: 8px; }
        .lives-container { display: flex; gap: 4px; }
        .heart.filled { color: #ef4444; }
        .heart.empty { color: rgba(163,163,163,0.3); }

        .game-area { position: relative; height: 600px; background: #0a0a0f; }
        .start-screen {
          position: absolute; inset: 0; display: flex; flex-direction: column;
          align-items: center; justify-content: center; color: #e5e5e7; cursor: pointer;
        }
        .game-over-screen {
          position: absolute; inset: 0; display: flex; flex-direction: column;
          align-items: center; justify-content: center; color: #e5e5e7; background: rgba(0,0,0,0.7);
        }
        .solar-flare {
          position: absolute;
          width: 16px;
          height: 48px;
          background: linear-gradient(to bottom, #fbbf24, #ef4444);
          border-radius: 8px;
        }
        .shield {
          position: absolute;
          bottom: 150px;
          width: 80px;
          height: 8px;
          background: #22c55e;
          border-radius: 4px;
          transform: translateX(-50%);
        }
        .fact-popup-overlay {
          position: absolute; inset: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(0,0,0,0.7);
        }
        .fact-popup {
          background: #16162a; padding: 24px; border-radius: 12px; width: 300px;
          text-align: center; color: #e5e5e7;
        }
        .progress-bar {
          height: 8px;
          background: #2a2a3e;
          border-radius: 4px;
          margin-top: 12px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          background: #22c55e;
          width: 100%;
          transition: width 0.1s linear;
        }
      `}</style>
    </div>
  );
}
