import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Game() {
  const navigate = useNavigate();
  const [currentItem, setCurrentItem] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(100); // Start with 100 points
  const [hasGuessed, setHasGuessed] = useState(false);
  const timerRef = useRef(null);

  const items = [
    { name: "Plastic Bottle", image: "/Bottle.png", category: "Recycle" },
    { name: "Banana Peel", image: "/BananaSticker.png", category: "Compost" },
    { name: "Paper Cup", image: "/Cup.png", category: "Recycle" },
    { name: "Paper Sticker", image: "/PaperSticker.png", category: "Recycle" },
    // Add more items here...
  ];

  useEffect(() => {
    startNewRound();
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && !hasGuessed) {
      timerRef.current = requestAnimationFrame(decreaseTimer);
    } else {
      cancelAnimationFrame(timerRef.current);
    }
    return () => cancelAnimationFrame(timerRef.current);
  }, [timeLeft, hasGuessed]);

  const decreaseTimer = () => {
    setTimeLeft((prev) => {
      const next = prev - 0.5; // decrease smoothly
      return next > 0 ? next : 0;
    });
    timerRef.current = requestAnimationFrame(decreaseTimer);
  };

  const startNewRound = () => {
    const randomItem = items[Math.floor(Math.random() * items.length)];
    setCurrentItem(randomItem);
    setTimeLeft(100);
    setHasGuessed(false);
  };

  const handleGuess = (category) => {
    if (hasGuessed) return;
    setHasGuessed(true);

    if (category === currentItem.category) {
      setScore((prev) => prev + Math.floor(timeLeft));
    }

    setTimeout(() => {
      if (items.length > 0) {
        startNewRound();
      } else {
        endGame();
      }
    }, 1000);
  };

  const endGame = () => {
    localStorage.setItem("Score", score);
    navigate("/EndPage");
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
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* Logo top-right */}
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

      {/* Timer Bar */}
      <div
        style={{
          width: "80%",
          height: "20px",
          backgroundColor: "white",
          borderRadius: "10px",
          overflow: "hidden",
          marginTop: "40px",
        }}
      >
        <div
          style={{
            width: `${timeLeft}%`,
            height: "100%",
            backgroundColor: "#4CAF50",
            transition: "width 0.1s linear",
          }}
        />
      </div>

      {/* Item Image */}
      {currentItem && (
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <img
            src={currentItem.image}
            alt={currentItem.name}
            style={{ width: "200px", height: "200px", objectFit: "contain" }}
          />
          <h2 style={{ color: "white", textShadow: "1px 1px 3px black" }}>
            Where does this go?
          </h2>
        </div>
      )}

      {/* Category Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        <button
          onClick={() => handleGuess("Recycle")}
          disabled={hasGuessed}
          style={{
            width: "120px",
            height: "120px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#4CAF50",
            border: "none",
            borderRadius: "15px",
            cursor: hasGuessed ? "not-allowed" : "pointer",
          }}
        >
          <img
            src="/RecycleIcon.png"
            alt="Recycle"
            style={{
              width: "60px",
              height: "60px",
              objectFit: "contain",
              marginBottom: "5px",
            }}
          />
          <span style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}>
            Recycle
          </span>
        </button>

        <button
          onClick={() => handleGuess("Compost")}
          disabled={hasGuessed}
          style={{
            width: "120px",
            height: "120px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#8BC34A",
            border: "none",
            borderRadius: "15px",
            cursor: hasGuessed ? "not-allowed" : "pointer",
          }}
        >
          <img
            src="/CompostIcon.png"
            alt="Compost"
            style={{
              width: "60px",
              height: "60px",
              objectFit: "contain",
              marginBottom: "5px",
            }}
          />
          <span style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}>
            Compost
          </span>
        </button>

        <button
          onClick={() => handleGuess("Landfill")}
          disabled={hasGuessed}
          style={{
            width: "120px",
            height: "120px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#9E9E9E",
            border: "none",
            borderRadius: "15px",
            cursor: hasGuessed ? "not-allowed" : "pointer",
          }}
        >
          <img
            src="/LandfillIcon.png"
            alt="Landfill"
            style={{
              width: "60px",
              height: "60px",
              objectFit: "contain",
              marginBottom: "5px",
            }}
          />
          <span style={{ color: "white", fontSize: "18px", fontWeight: "bold" }}>
            Landfill
          </span>
        </button>
      </div>
    </div>
  );
}

export default Game;

