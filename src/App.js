import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../src/pages/Landing";
import GalleryView from "../src/pages/GalleryView";
import ImpactGames from "../src/pages/ImpactGames";
import ReadBook from "../src/pages/ReadBook";
import AstronautGame from "../src/pages/AstronautGame";
import FarmerGame from "../src/pages/FarmerGame";
import PilotGame from "../src/pages/PilotGame";
import UserGame from "../src/pages/UserGame";
import Glossary from "./pages/Glossary";

function App() {
  return (

    <div className="black-bg" 
    // style={{backgroundColor: "black"}}
    >

    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/GalleryView" element={<GalleryView />} />
        <Route path="/ReadBook" element={<ReadBook />} />
        <Route path="/ImpactGames" element={<ImpactGames />} />
                <Route path="/Glossary" element={<Glossary />} />

        <Route path="/AstronautGame" element={<AstronautGame />} />
        <Route path="/FarmerGame" element={<FarmerGame />} />
        <Route path="/PilotGame" element={<PilotGame />} />
        <Route path="/UserGame" element={<UserGame />} />
      </Routes>
    </Router>
        </div>


  );
}

export default App;
