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

export interface CharacterStat {
  statName: string;
  abilityScore: number;
  bonusMod: number;
  profBonusCheckbox: boolean;
}

interface CharacterSheetState {
  rollResults: RollResult[]; // List<RollResult>  // IEnumerable<RollResult>
  profBonus: number;
  strengthStat: CharacterStat;
  dexterityStat: CharacterStat;
}

function CharacterSheet() {
  const [rollResults, setRollResults] = useState([] as RollResult[]);
  const [profBonus, setProfBonus] = useState(0); //useState to remember user input
  const [strengthStat, setStrengthStat] = useState<CharacterStat>({
    statName: "Strength",
    abilityScore: 10,
    bonusMod: 0,
    profBonusCheckbox: false,
  });
  const [dexterityStat, setDexterityStat] = useState<CharacterStat>({
    statName: "Dexterity",
    abilityScore: 10,
    bonusMod: 0,
    profBonusCheckbox: false,
  });

  // callback function
  const pushToHistory = (r: RollResult) => {
    console.log("3. called pushToHistory");
    let rollResultsWithNewRoll = [r, ...rollResults];
    setRollResults(rollResultsWithNewRoll);
  };

  const ROLL_HISTORY = "rollHistory";
  const STR_STAT = "strStat";
  const saveToStore = () => {
    localStorage.setItem(ROLL_HISTORY, JSON.stringify(rollResults)); // you can only save and get back strings
    localStorage.setItem(STR_STAT, JSON.stringify(strengthStat));
  };

  const getFromStore = () => {
    setRollResults(JSON.parse(localStorage.getItem(ROLL_HISTORY) || "[]"));
    setStrengthStat(JSON.parse(localStorage.getItem(STR_STAT) || "{}"));
  };

  return (
    <>
      <p>
        <button
          onClick={() => {
            saveToStore();
          }}
        >
          {" "}
          Save In Store{" "}
        </button>
        <button
          onClick={() => {
            getFromStore();
          }}
        >
          {" "}
          Load from Store{" "}
        </button>
      </p>
      <table>
        <tr>
          <th></th>
          <th>Stat</th>
          <th>Value</th>
          <th>Base Mod</th>
          <th>Bonus Mod</th>
        </tr>
        <CharacterStatRow
          characterStat={strengthStat}
          setCharacterStat={setStrengthStat}
          pushToRollResultHistory={pushToHistory}
          profBonus={profBonus}
        />
        <CharacterStatRow
          characterStat={dexterityStat}
          setCharacterStat={setDexterityStat}
          pushToRollResultHistory={pushToHistory}
          profBonus={profBonus}
        />
       { /* 
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
                {rollResult.statName} {rollResult.checkOrSave}, Mod: {rollResult.totalModifier}, Roll: {rollResult.roll}
                , Total: {rollResult.rollPlusModifier}
              </option>
            );
          })}
        </select>
      </p>
    </>
  );
}

export default CharacterSheet;
