import { useState } from 'react';
import './CharacterSheet.css';
import CharacterStatRow from './CharacterStatRow';


// a child component can't call a parent function, unless it is given the function as a callback

export interface RollResult {
  statName: string
  totalModifier: number
  roll: number
  rollPlusModifier: number
}

function CharacterSheet() {
  const [rollResults, setRollResults] = useState([] as RollResult[]);
  const [profBonus, setProfBonus] = useState(0); //useState to remember user input

  // callback function
  const pushToHistory = (r:RollResult) => {
    console.log('3. called pushToHistory');
    let rollResultsWithNewRoll = [r, ...rollResults];
    setRollResults(rollResultsWithNewRoll);
  }

  return (
    <>

      <table>
        <tr>
          <th>Stat</th>
          <th>Value</th>
          <th>Base Mod</th>
          <th>Bonus Mod</th>
          <th>Total Mod</th>
        </tr>
        <CharacterStatRow pushToRollResultHistory={pushToHistory} statName={"Strength"} />
        <CharacterStatRow pushToRollResultHistory={pushToHistory} statName={"Dexterity"} />
        <CharacterStatRow pushToRollResultHistory={pushToHistory} statName={"Constitution"} />
        <CharacterStatRow pushToRollResultHistory={pushToHistory} statName={"Intelligence"} />
        <CharacterStatRow pushToRollResultHistory={pushToHistory} statName={"Wisdom"} />
        <CharacterStatRow pushToRollResultHistory={pushToHistory} statName={"Charisma"} />
      </table>
      <p>
        Proficiency Bonus:
        {/* one tag close if there is nothing in between. See line 18 vs 30-33  */}
        <input className='statInput'
          type='number'
          onChange={(e) => { setProfBonus(parseInt(e.target.value)) }}
          value={profBonus} />
      </p>
      <p>
        <select>
          {rollResults.map(rollResult => {
            return (<option> Stat:{rollResult.statName} Mod: {rollResult.totalModifier} Roll: {rollResult.roll} Total: {rollResult.rollPlusModifier}</option>);
          })}
        </select>
      </p>
    </>
  );
}

export default CharacterSheet;
