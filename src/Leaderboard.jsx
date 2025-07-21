import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScores = async () => {
      const { data, error } = await supabase
        .from("leaderboard")
        .select("*")
        .order("score", { ascending: false });

      if (error) {
        console.error("Error fetching leaderboard:", error);
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
        backgroundImage: "url('/Airport.jpg')",
        backgroundSize: "cover",
        minHeight: "100vh",
        color: "white",
        textAlign: "center",
        paddingTop: "50px",
        textShadow: "1px 1px 3px black"
      }}
    >
      <h1 style={{ fontSize: "64px", marginBottom: "30px" }}>Leaderboard</h1>
      <div style={{ maxWidth: "500px", margin: "0 auto" }}>
        {scores.map((player, index) => (
          <div
            key={player.name}
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              margin: "10px 0",
              padding: "10px 20px",
              borderRadius: "10px",
              fontSize: "24px",
              display: "flex",
              justifyContent: "space-between"
            }}
          >
            <span>{index + 1}. {player.name}</span>
            <span>{player.score}</span>
          </div>
        ))}
      </div>
      <button
        onClick={handlePlayAgain}
        style={{
          fontSize: "24px",
          padding: "15px 30px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#4CAF50",
          color: "white",
          marginTop: "30px"
        }}
      >
        Play Again
      </button>
    </div>
  );
}

export default Leaderboard;
