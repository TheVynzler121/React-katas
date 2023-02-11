import React, { useState } from 'react';

function Dice() {
  const [dice, setDice] = useState(0);
  const [diceTypeResult, setDiceTypeResult] = useState(20);

  console.log("dice", dice);
  console.log("diceTypeResult", diceTypeResult);

  const diceTypes = [2, 4, 6, 8, 10, 12, 20, 100];


  const rollDice = (sides: number) => {
    return 1 + Math.floor(Math.random() * sides);
  };

  const rollHandler = () => {
    console.log("Rolled the Dice!");
    setDice(rollDice(diceTypeResult));
  }

  const diceTypeHandler = (diceType: string) => {
    console.log("changed the dice type");
    setDiceTypeResult(parseInt(diceType));
  }

  return (
    <>
	<p>
      Roll result: {dice}
	</p>
	<p>
      Rolling a: d{diceTypeResult}
	</p>
      <p>
        <select value={diceTypeResult} onChange={(e) => diceTypeHandler(e.target.value)}>
          {diceTypes.map(diceType => <option value={diceType}>d{diceType}</option>)}
        </select>
        <button className="dice" onClick={() => rollHandler()}>Roll the Dice</button>
      </p>
    </>
  );
}

export default Dice;
