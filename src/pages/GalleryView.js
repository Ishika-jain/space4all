import React from 'react'
import { useNavigate } from "react-router-dom";


function GalleryView() {
      const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Home Page</h1>
      <button onClick={() => navigate("/ReadBook")}>Go to Read Book</button>
      <button onClick={() => navigate("/ImpactGames")} style={{ marginLeft: "10px" }}>
        Go to ImpactGames
      </button>
      <button onClick={() => navigate("/Glossary")} style={{ marginLeft: "10px" }}>
        Go to Glossary
      </button>
    </div>
  )
}

export default GalleryView