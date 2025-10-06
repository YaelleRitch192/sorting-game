import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const [Scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScores = async () => {
      const { data, error } = await supabase
        .from("Leaderboard")
        .select("*")
        .order("Score", { ascending: false });

      if (error) {
        console.error("Error fetching Leaderboard:", error);
      } else {
        setScores(data);
      }
    };

    fetchScores();
  }, []);

  const handlePlayAgain = () => {
    localStorage.setItem("started", "true");
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundImage: "url('/Green.png')",
        backgroundSize: "cover",
        minHeight: "100vh",
        color: "white",
        textAlign: "center",
        paddingTop: "50px",
        textShadow: "1px 1px 3px black",
        position: "relative", // needed for logo & images positioning
      }}
    >
      {/* Logo in top-right corner */}
      <img
        src="/Logo.png"
        alt="Logo"
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "120px",
          height: "auto",
        }}
      />

      {/* Leaderboard Title with popping images */}
      <div style={{ position: "relative", display: "inline-block", marginBottom: "30px" }}>
        <h1 style={{ fontSize: "64px", margin: "0" }}>Leaderboard</h1>

        {/* Fun angled images */}
        <img
          src="/Cup.png"
          alt="Cup"
          style={{
            position: "absolute",
            top: "-30px",
            left: "-70px",
            width: "60px",
            transform: "rotate(-20deg)",
          }}
        />
        <img
          src="/Bottle.png"
          alt="Bottle"
          style={{
            position: "absolute",
            top: "-40px",
            right: "-70px",
            width: "60px",
            transform: "rotate(15deg)",
          }}
        />
        <img
          src="/BananaSticker.png"
          alt="Banana"
          style={{
            position: "absolute",
            bottom: "-40px",
            left: "-60px",
            width: "50px",
            transform: "rotate(10deg)",
          }}
        />
        <img
          src="/PaperSticker.png"
          alt="Paper"
          style={{
            position: "absolute",
            bottom: "-40px",
            right: "-60px",
            width: "50px",
            transform: "rotate(-15deg)",
          }}
        />
      </div>

      {/* Score List */}
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        {Scores.map((player, index) => (
          <div
            key={player.name}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              margin: "10px 0",
              padding: "10px 20px",
              borderRadius: "10px",
              fontSize: "24px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>
              {index + 1}. {player.name}
            </span>
            <span>{player.Score}</span>
          </div>
        ))}
      </div>

      {/* Play Again Button */}
      <button
        onClick={handlePlayAgain}
        style={{
          fontSize: "24px",
          padding: "15px 30px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#02558b",
          color: "white",
          marginTop: "30px",
        }}
      >
        Play Again
      </button>
    </div>
  );
}

export default Leaderboard;
