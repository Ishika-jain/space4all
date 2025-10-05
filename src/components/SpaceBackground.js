"use client";

import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";
import { Box } from "@mui/material";

export default function SpaceBackground({
  height = "100vh", // default full height
  autoRotate = true,
  opacity = 1,
}) {
  return (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        height,
        zIndex: 0,
        overflow: "hidden",
        opacity,
      }}
    >
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={autoRotate} autoRotateSpeed={0.3} />
      </Canvas>
    </Box>
  );
}
