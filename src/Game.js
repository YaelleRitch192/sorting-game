import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const items = [
  { id: 1, name: "Apple Core", image: "Apple.png", category: "Compost" },
  { id: 2, name: "Plastic Bottle", image: "PlasticBottle.png", category: "Containers" },
  { id: 3, name: "Chip Bag", image: "ChipBag.png", category: "Garbage" },
  { id: 4, name: "Newspaper", image: "Newspaper.png", category: "Paper" },
  { id: 5, name: "Milk Carton", image: "MilkContainer.png", category: "Containers" },
  { id: 6, name: "Paper Towel", image: "PaperTowel.png", category: "Compost" },
  { id: 7, name: "Coffee Cup", image: "CoffeeCup.png", category: "Containers" },
  { id: 8, name: "Paper Bowl", image: "Bowl.png", category: "Compost" },
  { id: 9, name: "Glass Jar", image: "GlassJar.png", category: "Containers" },
];

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function Game() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [pointsLeft, setPointsLeft] = useState(100);
  const [timerKey, setTimerKey] = useState(0);
  const [shuffledItems, setShuffledItems] = useState([]);
  const [hasAnswered, setHasAnswered] = useState(false);

  const totalTime = 20; // seconds
  const currentItem = shuffledItems[currentIndex];

  useEffect(() => {
    setShuffledItems(shuffleArray(items));
  }, []);

  // Timer logic with smooth decrement
  useEffect(() => {
    setPointsLeft(100);
    setHasAnswered(false);

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;
      const fractionElapsed = elapsed / totalTime;
      const newPoints = Math.max(0, 100 - fractionElapsed * 100);
      setPointsLeft(newPoints);

      if (elapsed >= totalTime) {
        clearInterval(timer);
        setFeedback(`⏰ Time's up! It goes in ${currentItem?.category}`);
        setTimeout(nextItem, 1000);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [timerKey, currentItem]);

  useEffect(() => {
    const started = localStorage.getItem("started");
    if (!started) navigate("/");
  }, [navigate]);

  const nextItem = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < shuffledItems.length) {
      setCurrentIndex(nextIndex);
      setTimerKey((prev) => prev + 1);
      setFeedback("");
    } else {
      localStorage.setItem("Score", Math.round(score));
      navigate("/end");
    }
  };

  const handleSort = (category) => {
    if (hasAnswered) return;

    setHasAnswered(true);

    if (category === currentItem.category) {
      const earned = Math.round(pointsLeft);
      setFeedback(`✅ Correct! +${earned} points`);
      setScore((prev) => prev + earned);
    } else {
      setFeedback(`❌ Oops! It goes in ${currentItem.category}`);
    }

    setTimeout(nextItem, 1000);
  };

  if (!currentItem) return null;

  return (
    <div
      style={{
        textAlign: "center",
        backgroundImage: "url('/Green.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "4vw 2vw",
        color: "white",
        textShadow: "1px 1px 3px black",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(20px, 4vw, 48px)",
          marginBottom: "2vw",
          maxWidth: "800px",
        }}
      >
        Where does this go? Click the correct bin.
      </h1>

      {/* Timer Bar */}
      <div
        style={{
          height: "clamp(10px, 1.5vw, 20px)",
          width: "80%",
          backgroundColor: "rgba(255,255,255,0.5)",
          margin: "0 auto 3vw",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(pointsLeft / 100) * 100}%`,
            backgroundColor: "#02558b",
            transition: "width 0.05s linear",
          }}
        />
      </div>

      {/* Item image */}
      <img
        src={`/${currentItem.image}`}
        alt={currentItem.name}
        style={{
          width: "clamp(150px, 25vw, 300px)",
          height: "auto",
          margin: "2vw",
          maxHeight: "40vh",
          objectFit: "contain",
        }}
      />

      {/* Category buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "2vw",
          flexWrap: "wrap",
          maxWidth: "800px",
        }}
      >
        {["Compost", "Containers", "Garbage", "Paper"].map((cat) => (
          <img
            key={cat}
            src={`/${cat.toLowerCase()}.png`}
            alt={cat}
            onClick={() => handleSort(cat)}
            style={{
              width: "clamp(100px, 15vw, 180px)",
              cursor: hasAnswered ? "not-allowed" : "pointer",
              opacity: hasAnswered ? 0.5 : 1,
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          />
        ))}
      </div>

      {feedback && (
        <p
          style={{
            fontSize: "clamp(16px, 2vw, 28px)",
            marginTop: "2vw",
            maxWidth: "600px",
          }}
        >
          {feedback}
        </p>
      )}
      <p
        style={{
          fontSize: "clamp(16px, 2vw, 24px)",
          marginTop: "1vw",
        }}
      >
        Score: {Math.round(score)}
      </p>
    </div>
  );
}

export default Game;




