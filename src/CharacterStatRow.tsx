import { useState } from 'react';
import './CharacterSheet.css';
import { rollDice } from './DiceHelpers';
import { calculateBaseModifier } from './DndHelpers';

interface RollResult {
  totalModifier: number
  roll: number
  rollPlusModifier: number
}

interface CharacterStatRowProps {
  statName: string
}

function CharacterStatRow(props: CharacterStatRowProps) {

  const [ablityScore, setAbilityScore] = useState(10);
  const [bonusMod, setBonusMod] = useState(0);
  const baseMod = calculateBaseModifier(ablityScore);
  const totalMod = baseMod + bonusMod;

  const [rollResults, setRollResults] = useState([] as RollResult[]);

  const rollHandler = () => {
    console.log("Rolled the Dice!");

    let roll = rollDice(20);
    let rollResult = {
      totalModifier: totalMod,
      roll: roll,
      rollPlusModifier: totalMod + roll
    };

    let rollResultsWithNewRoll = [rollResult, ...rollResults];
    setRollResults(rollResultsWithNewRoll);
  }


  return (
    <>
      <tr>
        <td>
          {props.statName}:
        </td>
        <td>
          <input className='statInput' type='number' onChange={(e) => { setAbilityScore(parseInt(e.target.value)) }} value={ablityScore} />
        </td>
        <td>
          {baseMod > 0 ? "+" : ""}
          {baseMod}
        </td>
        <td>
          <input className='statInput' type='number' onChange={(e) => { setBonusMod(parseInt(e.target.value)) }} value={bonusMod} />
        </td>
        <td>
          {totalMod > 0 ? "+" : ""}
          {totalMod}
        </td>
        <td>
          <button className="dice" onClick={() => (rollHandler())}> Check </button>
        </td>
        <td>
          <select>
            {rollResults.map(rollResult => {
              return (<option>Mod: {rollResult.totalModifier} Roll: {rollResult.roll} Total: {rollResult.rollPlusModifier}</option>);
            })}
          </select>
        </td>
      </tr>
    </>
  );
}

export default CharacterStatRow;
