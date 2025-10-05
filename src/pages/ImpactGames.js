import React from "react";
import { useNavigate } from "react-router-dom";
import "./ImpactGames.css"; // we'll add styles here

const roles = [
  {
    name: "Luna",
    role: "Pilot",
    game: "/PilotGame",
    description:
      "Solar flares affect my navigation systems! Play to find out how I handle them in space.",
    img: "https://i.imgur.com/8Km9tLL.png", // placeholder image
  },
  {
    name: "Max",
    role: "Farmer",
    game: "/FarmerGame",
    description:
      "Solar storms impact my crops. Play to see how I survive unpredictable solar weather!",
    img: "https://i.imgur.com/q5cXo8V.png",
  },
  {
    name: "Nova",
    role: "Astronaut",
    game: "/AstronautGame",
    description:
      "Radiation from solar flares can be dangerous! Play to help me stay safe in space.",
    img: "https://i.imgur.com/1Yc8t5x.png",
  },
  {
    name: "Alex",
    role: "Explorer",
    game: "/UserGame",
    description:
      "Solar activity affects my journey! Play to explore how I adapt to cosmic events.",
    img: "https://i.imgur.com/HsXGZ8U.png",
  },
];

function ImpactGames() {
  const navigate = useNavigate();

  return (
    <div className="impact-container">
      <h1>Choose Your Role</h1>
      <p className="subtitle">
        Find how solar weather impacts you. Ready to play a game?
      </p>
      <div className="roles-grid">
        {roles.map((role) => (
          <div
            key={role.name}
            className="role-card"
            onClick={() => navigate(role.game)}
          >
            <img src={role.img} alt={role.name} className="role-img" />
            <h2>{role.name}</h2>
            <h4>{role.role}</h4>
            <div className="role-dialog">{role.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImpactGames;
