"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, Paper, Typography, Button, LinearProgress } from "@mui/material";

const AstronautGame = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [flame, setFlame] = useState({ x: 50, y: 0 });
  const [bucketX, setBucketX] = useState(50);
  const [progress, setProgress] = useState(0);

  const gameAreaRef = useRef(null);
  const requestRef = useRef();

  const updateGame = useCallback(() => {
    setFlame((prev) => {
      let newY = prev.y + 2;
      if (newY >= 90) {
        // Check catch
        if (Math.abs(prev.x - bucketX) < 10) {
          setScore((s) => s + 1);
          setProgress((p) => Math.min(p + 10, 100));
        } else {
          setLives((l) => {
            if (l - 1 <= 0) {
              setGameOver(true);
              return () => {
                if (requestRef.current) {
                  cancelAnimationFrame(requestRef.current);
                }
              };
            }
            return l - 1;
          });
        }
        return { x: Math.random() * 90, y: 0 };
      }
      return { ...prev, y: newY };
    });

    requestRef.current = requestAnimationFrame(updateGame);
  }, [bucketX]);

  useEffect(() => {
    if (!gameOver) {
      requestRef.current = requestAnimationFrame(updateGame);
    }
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [updateGame, gameOver]);

  const handleMouseMove = (e) => {
    if (gameAreaRef.current) {
      const rect = gameAreaRef.current.getBoundingClientRect();
      const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
      setBucketX(Math.max(5, Math.min(95, xPercent)));
    }
  };

  const resetGame = () => {
    setScore(0);
    setLives(3);
    setProgress(0);
    setFlame({ x: 50, y: 0 });
    setGameOver(false);
  };

  return (
    <Paper
      elevation={6}
      sx={{
        width: "600px",
        height: "700px",
        margin: "40px auto",
        borderRadius: 4,
        overflow: "hidden",
        background: "radial-gradient(circle at center, #0f0f1a, #050510)",
        position: "relative",
        color: "white",
        textAlign: "center",
        fontFamily: "'Press Start 2P', monospace",
      }}
    >
      {/* Header */}
      <Typography variant="h5" sx={{ p: 2 }}>
        🔥 Flame Catcher 🔥
      </Typography>

      {/* Progress bar */}
      <Box sx={{ px: 2 }}>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 12,
            borderRadius: 2,
            "& .MuiLinearProgress-bar": {
              backgroundColor: "#ff6f00",
            },
          }}
        />
      </Box>

      {/* Game area */}
      <Box
        ref={gameAreaRef}
        onMouseMove={handleMouseMove}
        sx={{
          flexGrow: 1,
          position: "relative",
          height: "85%",
          cursor: "none",
        }}
      >
        {/* Falling flame */}
        <Box
          sx={{
            position: "absolute",
            top: `${flame.y}%`,
            left: `${flame.x}%`,
            transform: "translate(-50%, -50%)",
            fontSize: "2rem",
            textShadow: "0 0 10px orange, 0 0 20px red",
          }}
        >
          🔥
        </Box>

        {/* Bucket */}
        <Box
          sx={{
            position: "absolute",
            bottom: "5%",
            left: `${bucketX}%`,
            transform: "translateX(-50%)",
            fontSize: "3rem",
          }}
        >
          🪣
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ p: 2 }}>
        <Typography variant="body1">Score: {score}</Typography>
        <Typography variant="body1">Lives: {lives}</Typography>

        {gameOver && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6">💀 Game Over 💀</Typography>
            <Button
              onClick={resetGame}
              variant="contained"
              sx={{ mt: 1, backgroundColor: "#ff6f00" }}
            >
              Restart
            </Button>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default AstronautGame;
