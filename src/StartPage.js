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
        backgroundImage: "url('/Green.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        color: "white",
        textShadow: "1px 1px 3px black",
        padding: "5vw 20px",  // added some responsive top padding
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(32px, 6vw, 80px)", // responsive font size
          marginBottom: "2vw",
        }}
      >
        Waste Sorting
      </h1>

      <div
        style={{
          fontSize: "clamp(16px, 2vw, 24px)",
          maxWidth: "600px",
          marginBottom: "3vw",
        }}
      >
        <p>🗑️ Click the bin that the item belongs in to sort it.</p>
        <p>⏱️ You earn more points the faster you sort correctly.</p>
        <p>🏆 Try to get the highest score to earn a prize!</p>
      </div>

      <button
        onClick={handleStartGame}
        style={{
          fontSize: "clamp(18px, 2.5vw, 28px)",
          padding: "1vw 2vw",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#02558b",
          color: "white",
          boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
          transition: "transform 0.2s",
        }}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        Start Game
      </button>
    </div>
  );
}

export default StartPage;


