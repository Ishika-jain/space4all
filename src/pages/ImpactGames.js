"use client";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import SpaceBackground from "../components/SpaceBackground";
import "./ImpactGames.css";
import pilot from "../assets/pilot.jpg";
import farmer from "../assets/farmer.png";
import astronaut from "../assets/astronaut.png";
import userimg from "../assets/user.png";

// Example User Context
import { UserContext } from "../context/UserContext";

const ImpactGames = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext) || { user: { name: "Guest" } };

  const roles = [
    {
      name: "Luna",
      role: "Pilot",
      game: "/PilotGame",
      description:
        "Solar flares affect my navigation systems! Play to find out how I handle them in space.",
      img: pilot,
    },
    {
      name: "Max",
      role: "Farmer",
      game: "/FarmerGame",
      description:
        "Solar storms impact my crops. Play to see how I survive unpredictable solar weather!",
      img: farmer,
    },
    {
      name: "Nova",
      role: "Astronaut",
      game: "/AstronautGame",
      description:
        "Radiation from solar flares can be dangerous! Play to help me stay safe in space.",
      img: astronaut,
    },
    {
      name: user.name === "Guest" ? "You" : user.name,
      role: "Explorer",
      game: "/UserGame",
      description:
        "Solar activity affects your journey. Play to explore how you adapt to cosmic events.",
      img: userimg,
    },
  ];

  return (
    <div className="impact-page">
      <SpaceBackground />

      <div className="impact-overlay">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="header-section"
        >
          <p className="subtitle">
            WANT TO KNOW HOW SOLAR WEATHER IMPACTS YOU?
            {" "}
            
            <br /><br/>

            SELECT YOUR ROLE, {" "}
            <span className="highlight">
              {user.name === "Guest" ? "Explorer" : user.name}.
            </span>
          </p>
        </motion.div>

        <motion.div
          className="roles-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          {roles.map((role, index) => (
            <motion.div
              key={role.name}
              className="role-card neon-card"
              onClick={() => navigate(role.game)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 * index }}
              whileHover={{
                rotateY: 8,
                scale: 1.06,
                boxShadow: "0 0 40px rgba(0, 255, 255, 0.6)",
              }}
            >
              <div className="role-img-wrapper">
                <img src={role.img} alt={role.name} className="role-img" />
              </div>
              <h2 className="role-name">{role.name}</h2>
              <h4 className="role-type">{role.role}</h4>
              <p className="role-dialog">{role.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ImpactGames;
