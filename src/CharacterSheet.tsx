import { useState } from "react";
import "./CharacterSheet.css";
import CharacterStatRow from "./CharacterStatRow";

// a child component can't call a parent function, unless it is given the function as a callback

export interface RollResult {
  statName: string;
  totalModifier: number;
  roll: number;
  rollPlusModifier: number;
  checkOrSave: string;
}

function CharacterSheet() {
  const [rollResults, setRollResults] = useState([] as RollResult[]);
  const [profBonus, setProfBonus] = useState(0); //useState to remember user input
  const [ablityScore, setAbilityScore] = useState(10);
  const [bonusMod, setBonusMod] = useState(0);
  const [profBonusCheckbox, setProfBonusCheckBox] = useState(false);

  // callback function
  const pushToHistory = (r: RollResult) => {
    console.log("3. called pushToHistory");
    let rollResultsWithNewRoll = [r, ...rollResults];
    setRollResults(rollResultsWithNewRoll);
  };
  

  const key = 'myCat';
  const saveToStore = () => {
    console.log("save in store");
    localStorage.setItem(key, JSON.stringify(rollResults));// you can only save and get back strings
  };

  const getFromStore = () => {
    let x = JSON.parse(localStorage.getItem(key) || '[]');
    setRollResults(x);
    console.log("Found in storage:" + x);
  };

  return (
    <>
      <p>
        <button onClick={() => {saveToStore()}}>Save In Store</button>
        <button onClick={() => {getFromStore()}}>Load from Store</button>
      </p>
      <table>
        <tr>
          <th></th>
          <th>Stat</th>
          <th>Value</th>
          <th>Base Mod</th>
          <th>Bonus Mod</th>         
        </tr>
        <CharacterStatRow ablityScore={ablityScore} setAbilityScore={setAbilityScore} bonusMod={bonusMod} setBonusMod={setBonusMod}
         profBonusCheckbox={profBonusCheckbox} setProfBonusCheckBox={setProfBonusCheckBox} pushToRollResultHistory={pushToHistory} profBonus={profBonus} statName={"Strength"} />
        {/* <CharacterStatRow pushToRollResultHistory={pushToHistory} profBonus={profBonus} statName={"Dexterity"} />
        <CharacterStatRow pushToRollResultHistory={pushToHistory} profBonus={profBonus} statName={"Constitution"} />
        <CharacterStatRow pushToRollResultHistory={pushToHistory} profBonus={profBonus} statName={"Intelligence"} />
        <CharacterStatRow pushToRollResultHistory={pushToHistory} profBonus={profBonus} statName={"Wisdom"} />
        <CharacterStatRow pushToRollResultHistory={pushToHistory} profBonus={profBonus} statName={"Charisma"} /> */}
      </table>
      <p>
        Proficiency Bonus:
        {/* one tag close if there is nothing in between. See line 18 vs 30-33  */}
        <input
          className="statInput"
          type="number"
          onChange={(e) => setProfBonus(parseInt(e.target.value))}
          value={profBonus}
        />
      </p>
      <p>
        <select>
          {rollResults.map((rollResult) => {
            return (
              <option>
                {rollResult.statName} {rollResult.checkOrSave}, Mod: {rollResult.totalModifier}, Roll: {rollResult.roll}, 
                Total: {rollResult.rollPlusModifier}
              </option>
            );
          })}
        </select>
      </p>
    </>
  );
}

export default CharacterSheet;
