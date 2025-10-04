import React from 'react'
import { useNavigate } from 'react-router-dom'

function ImpactGames() {
      const navigate = useNavigate();
    
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Home Page</h1>
      <button onClick={() => navigate("/AstronautGame")}>Go to AstronautGame</button>
      <button onClick={() => navigate("/FarmerGame")} style={{ marginLeft: "10px" }}>
        Go to Farmer Games
      </button>
      <button onClick={() => navigate("/PilotGame")} style={{ marginLeft: "10px" }}>
        Go to Pilot Game
      </button>
       <button onClick={() => navigate("/UserGame")} style={{ marginLeft: "10px" }}>
        Go to User Game
      </button> 
    </div>
  )
}

export default ImpactGames