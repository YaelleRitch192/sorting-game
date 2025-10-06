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

  const [pointsLeft, setPointsLeft] = useState(100); // 👈 start at 100 for each item
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
    }, 50); // 👈 smoother updates (20x per second)

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
        minHeight: "96vh",
        paddingTop: "20px",
        color: "white",
        textShadow: "1px 1px 3px black",
      }}
    >
      
      <h1>Where does this go? Click the correct bin.</h1>

      {/* Timer Bar */}
      <div
        style={{
          height: "20px",
          width: "80%",
          backgroundColor: "#ddd",
          margin: "0 auto 20px",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(pointsLeft / 100) * 100}%`,
            backgroundColor: "#02558b",
            transition: "width 0.05s linear", // 👈 smoother animation
          }}
        />
      </div>

      <img
        src={`/${currentItem.image}`}
        alt={currentItem.name}
        style={{ width: "200px", height: "150px", margin: "20px" }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {["Compost", "Containers", "Garbage", "Paper"].map((cat) => (
          <img
            key={cat}
            src={`/${cat.toLowerCase()}.png`}
            alt={cat}
            onClick={() => handleSort(cat)}
            style={{
              width: "150px",
              cursor: hasAnswered ? "not-allowed" : "pointer",
              opacity: hasAnswered ? 0.5 : 1,
            }}
          />
        ))}
      </div>

      {feedback && <p>{feedback}</p>}
      <p>Score: {Math.round(score)}</p>
    </div>
  );
}

export default Game;



