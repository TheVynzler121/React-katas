import { useState } from 'react';
import './CharacterSheet.css';
import { rollDice } from './DiceHelpers';
// import { rollHandler } from './DiceHelpers';
import { calculateBaseModifier } from './DndHelpers';

  // change total mod (+5)
  // Roll 
  //    Roll Result: (+5) + (15) = 20
  // Roll 
  //    Roll Result: (+5) + (5) = 10
  //    Roll Result: (+5) + (15) = 20
  // Roll 
  //    Roll Result: (+5) + (12) = 17
  //    Roll Result: (+5) + (5) = 10
  //    Roll Result: (+5) + (15) = 20
  // change total mod (+6)
  //    Roll Result: (+5) + (12) = 17
  //    Roll Result: (+5) + (5) = 10
  //    Roll Result: (+5) + (15) = 20
  // Roll 
  //    Roll Result: 6 + 2 = 8
  //    Roll Result: 5 + 12 = 17
  //    Roll Result: 5 + 5 = 10
  //    Roll Result: 5 + 15 = 20


  /*
  [
    "Roll Result: 6 + 2 = 8"
    "Roll Result: 5 + 12 = 17", 
    "Roll Result: 5 + 5 = 10", 
    "Roll Result: 5 + 15 = 20", 
  ]

  [
    [6, 2, 8],
    [5, 12, 17],
    [5, 5, 10],
    [5, 15, 20],
  ]

  [
    {totalMod: 6, roll: 2, sum: 8},
    {totalMod: 5, roll: 12, sum: 17},
    {totalMod: 5, roll: 20, sum: 25},
  ]
  */

interface RollResult {
  totalModifier: number,
  roll: number,
  rollPlusModifier: number
}

function CharacterSheet() {

  const [ablityScore, setAbilityScore] = useState(10);
  const [bonusMod, setBonusMod] = useState(0);
  const baseMod = calculateBaseModifier(ablityScore);
  const totalMod = baseMod + bonusMod;

  // const [dice, setDice] = useState(0);
  // const sumOfDice = dice + totalMod;

  const [rollResults, setRollResults] = useState([] as RollResult[]);

  const rollHandler = () => {
    console.log("Rolled the Dice!");

    let roll = rollDice(20);
    let rollResult: RollResult = {
      totalModifier: totalMod,
      roll: roll,
      rollPlusModifier: totalMod + roll
    };

    let rollResultsWithNewRoll = [rollResult, ...rollResults];
    setRollResults(rollResultsWithNewRoll);
  }


  return (
    <>
  
      <table>
        <tr>
          <th>Stat</th>
          <th>Value</th>
          <th>Base Modifier</th>
          <th>Bonus Modifier</th>
          <th>Total Modifier</th>
        </tr>
        <tr>
          <td>
            Strength:
          </td>
          <td>
            <input type='number' onChange={(e) => { setAbilityScore(parseInt(e.target.value)) }} value={ablityScore} />
          </td>
          <td>
            {baseMod > 0 ? "+" : ""}
            {baseMod}
          </td>
          <td>
            <input type='number' onChange={(e) => { setBonusMod(parseInt(e.target.value)) }} value={bonusMod} />
          </td>
          <td>
            {totalMod > 0 ? "+" : ""}
            {totalMod}
          </td>
          <td>
            <button className="dice" onClick={() => (rollHandler())}> Check </button>
          </td>
        </tr>
      </table>
      <p>
        <select>
          {rollResults.map(rollResult => {
            return (<option>Mod: {rollResult.totalModifier} Roll: {rollResult.roll} Total: {rollResult.rollPlusModifier}</option>);
          })}
        </select>
      </p>
    </>
  );
}

export default CharacterSheet;
