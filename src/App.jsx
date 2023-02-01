import { useEffect, useState } from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

const App = () => {
  const [dice, setDice] = useState(newDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const isAllDiceHeld = dice.every((el) => el.isHeld);
    const isAllSameValue = dice.every(
      (el) => el.value === dice[0].value
    );
    if (isAllDiceHeld && isAllSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function generateDice() {
    for (let i = 0; i < 10; i++) {
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      };
    }
  }

  function newDice() {
    const arrDice = [];
    for (let i = 0; i < 10; i++) {
      arrDice.push(generateDice());
    }
    return arrDice;
  }

  function rollDice() {
    setDice((prevDice) =>
      prevDice.map((el) => (el.isHeld ? el : generateDice()))
    );
  }

  function holdDice(id) {
    setDice((prevDice) => {
      return prevDice.map((el) =>
        el.id === id ? { ...el, isHeld: !el.isHeld } : el
      );
    });
  }

  function resetGame() {
    setTenzies(false);
    setDice(newDice());
  }

  const diceElements = dice.map((el) => (
    <Dice
      value={el.value}
      isHeld={el.isHeld}
      key={el.id}
      holdDice={() => holdDice(el.id)}
    />
  ));

  return (
    <main>
      {tenzies && <Confetti />}
      <h1>Tenzies Game</h1>
      <div className="dice-container">{diceElements}</div>
      <button
        className="roll-btn"
        onClick={tenzies ? resetGame : rollDice}
      >
        {tenzies ? "Reset Game" : "Roll Dice"}
      </button>
    </main>
  );
};

export default App;
