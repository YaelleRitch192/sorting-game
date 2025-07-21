import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

function EndPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const storedScore = parseInt(localStorage.getItem("Score"), 10);
    if (!storedScore) {
      navigate("/");
    } else {
      setScore(storedScore);
    }
  }, [navigate]);

  const handlePlayAgain = () => {
    //localStorage.setItem("started", "true");
    navigate("/");
  };

  const handleSubmit = async () => {
    if (!name) return;

    const { data: existingPlayer, error: selectError } = await supabase
      .from("leaderboard")
      .select("*")
      .eq("name", name)
      .single();

    if (selectError && selectError.code !== "PGRST116") {
      // Ignore "no rows returned" error (PGRST116), but log others
      console.error("Select error:", selectError);
    }

    if (existingPlayer) {
      if (score > existingPlayer.score) {
        const { error: updateError } = await supabase
          .from("leaderboard")
          .update({ score })
          .eq("name", name);
        if (updateError) console.error("Update error:", updateError);
      }
    } else {
      const { error: insertError } = await supabase
        .from("leaderboard")
        .insert([{ name, score }]);
      if (insertError) console.error("Insert error:", insertError);
    }

    setSubmitted(true);
    navigate("/leaderboard");
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
        textShadow: "1px 1px 3px black",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "64px", marginBottom: "20px" }}>Great Job!</h1>
      <p style={{ fontSize: "24px", marginBottom: "20px" }}>Your score: {score}</p>

      {!submitted ? (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            style={{
              fontSize: "18px",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "15px",
              width: "250px",
              textAlign: "center"
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              fontSize: "20px",
              padding: "10px 25px",
              borderRadius: "10px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#4CAF50",
              color: "white",
              marginBottom: "20px"
            }}
          >
            Submit Score
          </button>
        </>
      ) : (
        <p style={{ fontSize: "20px", marginBottom: "20px" }}>🎉 Score submitted!</p>
      )}

      <button
        onClick={handlePlayAgain}
        style={{
          fontSize: "24px",
          padding: "15px 30px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#2196F3",
          color: "white",
        }}
      >
        Play Again
      </button>
    </div>
  );
}

export default EndPage;
