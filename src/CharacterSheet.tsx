import { useState } from 'react';
import './CharacterSheet.css';
import { rollDice } from './DiceHelpers';
// import { rollHandler } from './DiceHelpers';
import { calculateBaseModifier } from './DndHelpers';

function CharacterSheet() {
  
  const [ablityScore, setAbilityScore] = useState(10);
  const [bonusMod, setBonusMod] = useState(0);
  const baseMod = calculateBaseModifier(ablityScore);
  const totalMod = baseMod + bonusMod;

  const [dice, setDice] = useState([] as number[]);
  const [diceTypeResult, setDiceTypeResult] = useState(20);
  const [numberOfDice, setNumberOfDice] = useState(1);
  const sumOfDice = dice.reduce((sum, rollResult) => sum + rollResult, totalMod);
  
  const diceTypes = [2, 4, 6, 8, 10, 12, 20, 100];
  const numberofDiceList = [1, 2, 3, 4];
  
  const rollHandler = () => {
      console.log("Rolled the Dice!");
      let rolls = [] as number[];
      for (var x = 0; x < numberOfDice; x++) {
          rolls.push(rollDice(diceTypeResult));
      }
      setDice(rolls);
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
            <input type='number' onChange={(e) => {setAbilityScore(parseInt(e.target.value))}} value={ablityScore} />
          </td>
          <td>
            {baseMod > 0 ? "+" : ""}
            {baseMod}
          </td>
          <td>
            <input type='number' onChange={(e) => {setBonusMod(parseInt(e.target.value))}} value={bonusMod} />
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
        Roll result: {JSON.stringify(sumOfDice)}
      </p>
    </>
  );
}

export default CharacterSheet;
