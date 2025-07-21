import React from "react";
import { useNavigate } from "react-router-dom";

function StartPage() {
  const navigate = useNavigate();

  const handleStartGame = () => {
    localStorage.setItem("started", "true");
    navigate("/game");
  };

  return (
    <div
      style={{
        backgroundImage: "url('/Airport.jpg')",
        backgroundSize: "cover",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textShadow: "1px 1px 3px black"
      }}
    >
      <h1 style={{ fontSize: "64px", marginBottom: "30px" }}>Waste Sorting</h1>
      <button
        onClick={handleStartGame}
        style={{
          fontSize: "24px",
          padding: "15px 30px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#4CAF50",
          color: "white"
        }}
      >
        Start Game
      </button>
    </div>
  );
}

export default StartPage;