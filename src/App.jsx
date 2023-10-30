import { useState, useEffect } from "react";
import "./App.css";
import JavaScript from "./assets/js.png";
import React from "./assets/react.png";
import TypeScript from "./assets/typescript.png";
import Sass from "./assets/sass.png";
import Angular from "./assets/angular.png";
import TailWind from "./assets/tailwind.png";

function App() {
  const images = [JavaScript, React, TypeScript, Sass, Angular, TailWind];
  const cardsData = images.concat(images).map((image, index) => ({
    id: index + 1,
    content: image,
  }));

  const shuffleArray = (array) => {
    const shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  };

  const [cards, setCards] = useState(shuffleArray(cardsData));
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (flipped.length === 2) {
      const [firstIndex, secondIndex] = flipped;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.content === secondCard.content) {
        setSolved([...solved, firstCard, secondCard]);
        setFlipped([]);
      } else {
        setTimeout(() => setFlipped([]), 850);
      }
    }
  }, [flipped, cards, solved]);

  useEffect(() => {
    if (solved.length === cards.length) {
      setGameOver(true);
    }
  }, [solved, cards]);

  const handleCardClick = (index) => {
    if (
      flipped.length < 2 &&
      !flipped.includes(index) &&
      !solved.includes(cards[index])
    ) {
      setFlipped([...flipped, index]);
    }
  };

  const handleRestart = () => {
    //função que reinicia o jogo!!
    setCards(shuffleArray(cardsData));
    setFlipped([]);
    setSolved([]);
    setGameOver(false);
  };

  return (
    <div className="App">
      <h1>Jogo da Memória (By Luis Junior)</h1>
      {gameOver ? (
        <div>
          <div className="message">Parabéns! Você concluiu o jogo.</div>
          <button onClick={handleRestart}>Jogar novamente</button>
        </div>
      ) : (
        <div className="board">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`card ${flipped.includes(index) ? "flipped" : ""} ${
                solved.includes(card) ? "solved" : ""
              }`}
              onClick={() => handleCardClick(index)}
            >
              {flipped.includes(index) || solved.includes(card) ? (
                <img src={card.content} alt={`Card ${index}`} />
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
