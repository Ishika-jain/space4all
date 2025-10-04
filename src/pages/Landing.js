import React from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Home Page</h1>
      <button onClick={() => navigate("/ReadBook")}>Go to Read Book</button>
      <button onClick={() => navigate("/GalleryView")} style={{ marginLeft: "10px" }}>
        Go to Gallery View
      </button>
    </div>
  );
}
