import React from "react";
import { PilotGame } from "../components/pilot-game";
import "./FarmerGame.css";
import SpaceBackground from "../components/SpaceBackground";

export default function FarmerGame() {
  return (
    <main className="farmer-main">
      <SpaceBackground/>
      <header className="farmer-header">
        <h1 className="farmer-title">Tractor in the Corn Field</h1>
        <p className="farmer-subtitle">
          Tap / click / press Space to drive the tractor through the corn rows.
        </p>
      </header>

      <section aria-label="Game area" className="farmer-game-section">
        <PilotGame />
      </section>
    </main>
  );
}
