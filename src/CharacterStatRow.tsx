import { useState } from 'react';
import './CharacterSheet.css';
import { rollDice } from './DiceHelpers';
import { calculateBaseModifier } from './DndHelpers';
import {RollResult} from './CharacterSheet';

interface CharacterStatRowProps {
  statName: string
  pushToRollResultHistory: (rollResult:RollResult) => void
}

function CharacterStatRow(props: CharacterStatRowProps) {

  const [ablityScore, setAbilityScore] = useState(10);
  const [bonusMod, setBonusMod] = useState(0);
  const baseMod = calculateBaseModifier(ablityScore);
  const totalMod = baseMod + bonusMod;
  
  const rollHandler = () => {
    console.log("1. Called rollHandler");

    let roll = rollDice(20);
    let rollResult = {
      statName: props.statName,
      totalModifier: totalMod,
      roll: roll,
      rollPlusModifier: totalMod + roll
    };

    console.log('2. calling pushToRollResultHistory');
    props.pushToRollResultHistory(rollResult)
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
      </tr>
    </>
  );
}

export default CharacterStatRow;
