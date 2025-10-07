import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

function EndPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [Score, setScore] = useState(0);
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
    navigate("/");
  };

  const handleSubmit = async () => {
    if (!name) return;

    const { data: existingPlayer, error: selectError } = await supabase
      .from("Leaderboard")
      .select("*")
      .eq("name", name)
      .single();

    if (selectError && selectError.code !== "PGRST116") {
      console.error("Select error:", selectError);
    }

    if (existingPlayer) {
      if (Score > existingPlayer.Score) {
        const { error: updateError } = await supabase
          .from("Leaderboard")
          .update({ Score })
          .eq("name", name);
        if (updateError) console.error("Update error:", updateError);
      }
    } else {
      const { error: insertError } = await supabase
        .from("Leaderboard")
        .insert([{ name, Score }]);
      if (insertError) console.error("Insert error:", insertError);
    }

    setSubmitted(true);
    navigate("/Leaderboard");
  };

  return (
    <div
      style={{
        backgroundImage: "url('/Green.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textShadow: "1px 1px 3px black",
        padding: "20px",
        position: "relative",
        overflow: "hidden",
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
          width: "clamp(80px, 10vw, 130px)",
          height: "auto",
        }}
      />

      {/* Decorative "Great Job!" with popping images */}
      <div
        style={{
          position: "relative",
          display: "inline-block",
          marginBottom: "clamp(20px, 4vw, 40px)",
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(40px, 6vw, 64px)",
            margin: "0",
            position: "relative",
            zIndex: 1,
            lineHeight: 1.1,
          }}
        >
          Great Job!
        </h1>

        {/* Cup - top left */}
        <img
          src="/Cup.png"
          alt="Cup"
          style={{
            position: "absolute",
            top: "-40px",
            left: "-70px",
            width: "clamp(50px, 6vw, 80px)",
            transform: "rotate(-20deg)",
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))",
          }}
        />

        {/* Bottle - top right */}
        <img
          src="/Bottle.png"
          alt="Bottle"
          style={{
            position: "absolute",
            top: "-50px",
            right: "-80px",
            width: "clamp(50px, 6vw, 90px)",
            transform: "rotate(25deg)",
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))",
          }}
        />

        {/* Banana Sticker - bottom left */}
        <img
          src="/BananaSticker.png"
          alt="Banana Sticker"
          style={{
            position: "absolute",
            bottom: "-50px",
            left: "-60px",
            width: "clamp(40px, 5vw, 70px)",
            transform: "rotate(-15deg)",
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))",
          }}
        />

        {/* Paper Sticker - bottom right */}
        <img
          src="/PaperSticker.png"
          alt="Paper Sticker"
          style={{
            position: "absolute",
            bottom: "-55px",
            right: "-70px",
            width: "clamp(40px, 5vw, 75px)",
            transform: "rotate(15deg)",
            filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.5))",
          }}
        />
      </div>

      <p
        style={{
          fontSize: "clamp(20px, 3vw, 28px)",
          marginBottom: "clamp(15px, 3vw, 25px)",
        }}
      >
        Your score: {Score}
      </p>

      {!submitted ? (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your email"
            style={{
              fontSize: "clamp(16px, 2.5vw, 20px)",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "15px",
              width: "clamp(200px, 40vw, 300px)",
              textAlign: "center",
            }}
          />
          <button
            onClick={handleSubmit}
            style={{
              fontSize: "clamp(18px, 2.5vw, 26px)",
              padding: "15px 35px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              backgroundColor: "#02558b",
              color: "white",
              marginBottom: "20px",
            }}
          >
            Submit Score
          </button>
        </>
      ) : (
        <p
          style={{
            fontSize: "clamp(18px, 2.5vw, 22px)",
            marginBottom: "20px",
          }}
        >
          🎉 Score submitted!
        </p>
      )}

      <button
        onClick={handlePlayAgain}
        style={{
          fontSize: "clamp(18px, 2.5vw, 22px)",
          padding: "12px 28px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          backgroundColor: "#709BBE",
          color: "white",
        }}
      >
        Play Again
      </button>
    </div>
  );
}

export default EndPage;
