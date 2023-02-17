import { useState } from 'react';
import { rollDice } from './DiceHelpers';

function Dice() {
  const [dice, setDice] = useState([] as number[]);
  const [diceTypeResult, setDiceTypeResult] = useState(20);
  const [numberOfDice, setNumberOfDice] = useState(1);
  const sumOfDice = dice.reduce((sum, rollResult) => sum + rollResult, 0);
  
  console.log("dice", dice);
  console.log("diceTypeResult", diceTypeResult);

  const diceTypes = [2, 4, 6, 8, 10, 12, 20, 100];
  const numberofDiceList = [1, 2, 3, 4];

// [[3,6],[4,2],[3]] TODO: save roll results

  const rollHandler = () => {
    console.log("Rolled the Dice!");
    let rolls = [] as number[];
    for (var x = 0; x < numberOfDice; x++) {
      rolls.push(rollDice(diceTypeResult));
    }
    setDice(rolls);
  }

  const diceTypeHandler = (diceType: string) => {
    console.log("changed the dice type");
    setDiceTypeResult(parseInt(diceType));
  }

  const numberOfDiceHandler = (numberofDiceList: string) => {
    console.log("changed number of dice");
    setNumberOfDice(parseInt(numberofDiceList));
  }

  return (
    <>
      <p>
        Roll result: {JSON.stringify(dice)}
      </p>
      <p>
        Roll sum: {sumOfDice}
      </p>
      <p>
        Rolling {numberOfDice}: d{diceTypeResult}
      </p>
      <p>
        <select value={numberOfDice} onChange={(e) => numberOfDiceHandler(e.target.value)}>
          {numberofDiceList.map(dice => <option value={dice}>{dice}</option>)}
        </select>
        <select value={diceTypeResult} onChange={(e) => diceTypeHandler(e.target.value)}>
          {diceTypes.map(diceType => <option value={diceType}>d{diceType}</option>)}
        </select>
        <button className="dice" onClick={() => rollHandler()}>Roll the Dice</button>
      </p>
    </>
  );
}

export default Dice;
