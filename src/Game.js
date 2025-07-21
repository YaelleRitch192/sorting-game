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
  const [Score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [timerKey, setTimerKey] = useState(0);
  const [shuffledItems, setShuffledItems] = useState([]);

  const currentItem = shuffledItems[currentIndex];

  useEffect(() => {
    const randomized = shuffleArray(items);
    setShuffledItems(randomized);
  }, []);

  useEffect(() => {
    setTimeLeft(20);
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setFeedback(`⏰ Time's up! It goes in ${currentItem.category}`);
          setTimeout(() => {
            setFeedback("");
            setCurrentIndex((prevIndex) => {
              if (prevIndex + 1 < shuffledItems.length) {
                return prevIndex + 1;
              } else {
                localStorage.setItem("Score", Score);
                navigate("/end");
                return prevIndex;
              }
            });
          }, 1000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerKey, currentItem?.category, shuffledItems.length, navigate, Score]);

  useEffect(() => {
    const started = localStorage.getItem("started");
    if (!started) {
      navigate("/");
    }
  }, [navigate]);

  const handleSort = (category) => {
    if (category === currentItem.category) {
      setFeedback(`✅ Correct! +${timeLeft} points`);
      setScore(Score + timeLeft);
    } else {
      setFeedback(`❌ Oops! It goes in ${currentItem.category}`);
    }

    setTimeout(() => {
      setFeedback("");
      const nextIndex = currentIndex + 1;
      if (nextIndex < shuffledItems.length) {
        setCurrentIndex(nextIndex);
        setTimerKey((prev) => prev + 1);
      } else {
        localStorage.setItem("Score", Score);
        navigate("/end");
      }
    }, 1000);
  };

  if (!currentItem) return null;

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "0px",
        backgroundImage: "url('/Sky.jpg')",
        backgroundSize: "cover",
        minHeight: "96vh",
        paddingTop: "20px",
        color: "white",
        textShadow: "1px 1px 3px black",
      }}
    >
      <h2>Where does this go? Click the correct bin.</h2>

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
            width: `${(timeLeft / 20) * 100}%`,
            backgroundColor: "#4CAF50",
            transition: "width 0.2s linear", // quick fill reset
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
        <img
          src="/compost.png"
          alt="Compost"
          onClick={() => handleSort("Compost")}
          style={{ width: "150px", cursor: "pointer" }}
        />
        <img
          src="/containers.png"
          alt="Containers"
          onClick={() => handleSort("Containers")}
          style={{ width: "150px", cursor: "pointer" }}
        />
        <img
          src="/garbage.png"
          alt="Garbage"
          onClick={() => handleSort("Garbage")}
          style={{ width: "150px", cursor: "pointer" }}
        />
        <img
          src="/paper.png"
          alt="Paper"
          onClick={() => handleSort("Paper")}
          style={{ width: "150px", cursor: "pointer" }}
        />
      </div>

      {feedback && <p>{feedback}</p>}
      <p>Score: {Score}</p>
    </div>
  );
}

export default Game;
