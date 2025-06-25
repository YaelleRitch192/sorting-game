import React, { useState } from "react";

const items = [
  { id: 1, name: "Banana Peel", category: "Compost" },
  { id: 2, name: "Plastic Bottle", category: "Recycling" },
  { id: 3, name: "Chip Bag", category: "Garbage" },
  { id: 4, name: "Newspaper", category: "Recycling" },
  { id: 5, name: "Apple Core", category: "Compost" },
];

const categories = ["Compost", "Recycling", "Garbage"];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);

  const currentItem = items[currentIndex];

  const handleSort = (category) => {
    if (category === currentItem.category) {
      setFeedback("✅ Correct!");
      setScore(score + 1);
    } else {
      setFeedback(`❌ Oops! It goes in ${currentItem.category}`);
    }

    setTimeout(() => {
      setFeedback("");
      setCurrentIndex((prev) => (prev + 1 < items.length ? prev + 1 : 0));
    }, 1000);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Waste Sorting Game</h1>
      <h2>Where does this go?</h2>
      <p style={{ fontSize: "24px", fontWeight: "bold" }}>
        {currentItem.name}
      </p>
      <div style={{ margin: "20px" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleSort(cat)}
            style={{ margin: "10px", padding: "10px 20px" }}
          >
            {cat}
          </button>
        ))}
      </div>
      {feedback && <p>{feedback}</p>}
      <p>Score: {score}</p>
    </div>
  );
}

export default App;