import React from "react";

const Dice = (props) => {
  const styles = {
    backgroundColor: props.isHeld ? "#59E" : "white",
  };
  return (
    <div className="dice" style={styles} onClick={props.holdDice}>
      {props.value}
    </div>
  );
};

export default Dice;
