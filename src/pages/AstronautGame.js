// "use client";

// import { useState, useEffect, useRef } from "react";

// const facts = [
//   "Astronauts’ hearts shrink in space!",
//   "Space is completely silent!",
//   "The hottest planet isn’t closest to the Sun!",
//   "You can’t burp in space!",
//   "Spacewalks can last up to 8 hours!"
// ];

// export default function AstronautGame() {
//   const gameAreaRef = useRef(null);
//   const [sliderPosition, setSliderPosition] = useState(50);
//   const sliderPositionRef = useRef(50);
//   const [flames, setFlames] = useState([]);
//   const flamesRef = useRef([]);
//   const [gameStarted, setGameStarted] = useState(false);
//   const [gameOver, setGameOver] = useState(false);
//   const [lives, setLives] = useState(5);
//   const [score, setScore] = useState(0);
//   const [showFactPopup, setShowFactPopup] = useState(false);
//   const [currentFact, setCurrentFact] = useState("");
//   const [factProgress, setFactProgress] = useState(100);
//   const animationRef = useRef(null);

//   // Update slider ref
//   useEffect(() => {
//     sliderPositionRef.current = sliderPosition;
//   }, [sliderPosition]);

//   // Game loop
//   const gameLoop = () => {
//     flamesRef.current.forEach((flame) => {
//       flame.y += flame.speed;
//       // Check collision
//       const gameWidth = gameAreaRef.current.offsetWidth;
//       const sliderWidthPx = 80; // 80px width
//       const sliderLeft = (sliderPositionRef.current / 100) * gameWidth - sliderWidthPx / 2;
//       const sliderRight = sliderLeft + sliderWidthPx;

//       if (
//         flame.y + flame.size >= gameAreaRef.current.offsetHeight - 50 &&
//         flame.x >= sliderLeft &&
//         flame.x <= sliderRight
//       ) {
//         // Caught
//         setScore((prev) => prev + 1);
//         showRandomFact();
//         flame.caught = true;
//       } else if (flame.y > gameAreaRef.current.offsetHeight) {
//         // Missed
//         flame.missed = true;
//         setLives((prev) => prev - 1);
//       }
//     });

//     // Remove caught or missed flames
//     flamesRef.current = flamesRef.current.filter((f) => !f.caught && !f.missed);
//     setFlames([...flamesRef.current]);

//     if (lives > 0) {
//       animationRef.current = requestAnimationFrame(gameLoop);
//     } else {
//       setGameOver(true);
//     }
//   };

//   // Start game
//   const startGame = () => {
//     setGameStarted(true);
//     setGameOver(false);
//     setScore(0);
//     setLives(5);
//     setSliderPosition(50);
//     sliderPositionRef.current = 50;
//     setFlames([]);
//     flamesRef.current = [];
//     spawnFlame();
//     animationRef.current = requestAnimationFrame(gameLoop);
//   };

//   // Spawn flames every second
//   const spawnFlame = () => {
//     const flameInterval = setInterval(() => {
//       if (gameOver) {
//         clearInterval(flameInterval);
//         return;
//       }
//       const newFlame = {
//         x: Math.random() * (gameAreaRef.current.offsetWidth - 20),
//         y: 0,
//         size: 20 + Math.random() * 20,
//         speed: 2 + Math.random() * 3
//       };
//       flamesRef.current.push(newFlame);
//       setFlames([...flamesRef.current]);
//     }, 1000);
//   };

//   // Fact popup
//   const showRandomFact = () => {
//     const fact = facts[Math.floor(Math.random() * facts.length)];
//     setCurrentFact(fact);
//     setShowFactPopup(true);
//     setFactProgress(100);
//   };

//   // Fact progress
//   useEffect(() => {
//     if (!showFactPopup) return;

//     const interval = setInterval(() => {
//       setFactProgress((prev) => {
//         if (prev <= 0) {
//           setShowFactPopup(false);
//           clearInterval(interval);
//           return 0;
//         }
//         return prev - 2;
//       });
//     }, 100);

//     return () => clearInterval(interval);
//   }, [showFactPopup]);

//   // Drag slider
//   const handleDrag = (e) => {
//     const rect = gameAreaRef.current.getBoundingClientRect();
//     const newPos = ((e.clientX - rect.left) / rect.width) * 100;
//     setSliderPosition(Math.min(Math.max(newPos, 0), 100));
//   };

//   return (
//     <div
//       ref={gameAreaRef}
//       style={{
//         width: "100vw",
//         height: "100vh",
//         background: "#111",
//         position: "relative",
//         overflow: "hidden",
//         cursor: "pointer"
//       }}
//       onMouseMove={handleDrag}
//       onClick={() => !gameStarted && startGame()}
//     >
//       {/* Flames */}
//       {flames.map((flame, i) => (
//         <div
//           key={i}
//           style={{
//             position: "absolute",
//             width: flame.size,
//             height: flame.size,
//             borderRadius: "50%",
//             background: "orange",
//             left: flame.x,
//             top: flame.y
//           }}
//         />
//       ))}

//       {/* Slider */}
//       <div
//         style={{
//           position: "absolute",
//           bottom: 20,
//           left: `${sliderPosition}%`,
//           transform: "translateX(-50%)",
//           width: 80,
//           height: 20,
//           background: "cyan",
//           borderRadius: 10
//         }}
//       />

//       {/* Score & Lives */}
//       <div style={{ position: "absolute", top: 20, left: 20, color: "white" }}>
//         Score: {score} | Lives: {lives}
//       </div>

//       {/* Fact popup */}
//       {showFactPopup && (
//         <div
//           style={{
//             position: "absolute",
//             top: "40%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             background: "#222",
//             padding: "20px 30px",
//             color: "#fff",
//             borderRadius: 10,
//             textAlign: "center"
//           }}
//         >
//           <div>{currentFact}</div>
//           <div
//             style={{
//               height: 5,
//               width: "100%",
//               background: "#555",
//               marginTop: 10,
//               borderRadius: 2
//             }}
//           >
//             <div
//               style={{
//                 width: `${factProgress}%`,
//                 height: "100%",
//                 background: "lime",
//                 borderRadius: 2,
//                 transition: "width 0.1s linear"
//               }}
//             />
//           </div>
//         </div>
//       )}

//       {/* Game over */}
//       {gameOver && (
//         <div
//           style={{
//             position: "absolute",
//             top: "40%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             color: "white",
//             textAlign: "center"
//           }}
//         >
//           <h1>Game Over</h1>
//           <button
//             onClick={startGame}
//             style={{
//               marginTop: 20,
//               padding: "10px 20px",
//               background: "cyan",
//               border: "none",
//               borderRadius: 5,
//               cursor: "pointer"
//             }}
//           >
//             Restart
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

import React from 'react'

function AstronautGame() {
  return (
    <div>AstronautGame</div>
  )
}

export default AstronautGame