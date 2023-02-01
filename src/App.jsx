import { useEffect, useState } from "react";
import Dice from "./Dice";
import { nanoid } from "nanoid";

const App = () => {
  const [dice, setDice] = useState(newDice());

  function generateDice() {
    for (let i = 0; i < 10; i++) {
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: true,
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
    setDice(newDice());
  }

  function holdDice(id) {
    setDice((prevDice) => {
      return prevDice.map((el) =>
        el.id === id ? { ...el, isHeld: !el.isHeld } : el
      );
    });
  }

  const diceElements = dice.map((el) => (
    <Dice
      value={el.value}
      isHeld={el.isHeld}
      id={el.id}
      holdDice={() => holdDice(el.id)}
    />
  ));

  return (
    <main>
      <h1>Tenzies Game</h1>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-btn" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
};

export default App;
