import React from 'react'
import { useNavigate } from "react-router-dom";

const UserGame = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <button onClick={() => navigate("/ReadBook")}>Go to Read Book</button>
      <button onClick={() => navigate("/GalleryView")} style={{ marginLeft: "10px" }}>Go to Gallery View</button>
    </div>
  );
}

export default UserGame