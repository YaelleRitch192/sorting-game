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
        justifyContent: "flex-start",
        alignItems: "center",
        color: "white",
        textShadow: "1px 1px 3px black",
        padding: "20px",
        textAlign: "center",
        paddingTop: "40px"
      }}
    >
      <h1 style={{ fontSize: "64px", marginBottom: "20px" }}>Waste Sorting</h1>

      <div style={{ fontSize: "20px", maxWidth: "600px", marginBottom: "30px" }}>
        <p>🗑️ Click the bin that the item belongs in to sort it.</p>
        <p>⏱️ You earn more points the faster you sort correctly.</p>
        <p>✅ Try to get the highest score before time runs out!</p>
      </div>

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