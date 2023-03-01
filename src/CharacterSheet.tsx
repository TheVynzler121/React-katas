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

export interface CharacterStat { //an interface is the shape of the data inside an object
  statName: string;
  abilityScore: number;
  bonusMod: number;
  profBonusCheckbox: boolean;
}

const defaultStat = {
  statName: "",
  abilityScore: 10,
  bonusMod: 0,
  profBonusCheckbox: false,
} as CharacterStat;

interface CharacterSheetState {
  rollResults: RollResult[]; // List<RollResult>  // IEnumerable<RollResult>
  profBonus: number;
  strengthStat: CharacterStat;
  dexterityStat: CharacterStat;
  constitutionStat: CharacterStat;
}

function CharacterSheet() {
  const [rollResults, setRollResults] = useState<RollResult[]>([]);
  const [profBonus, setProfBonus] = useState<number>(0); //useState to remember user input
  const [strengthStat, setStrengthStat] = useState<CharacterStat>({...defaultStat, statName: "Strength"});
  const [dexterityStat, setDexterityStat] = useState<CharacterStat>({...defaultStat, statName: "Dexterity"});
  const [constitutionStat, setConstitutionStat] = useState<CharacterStat>({...defaultStat, statName: "Constitution"});

  const pushToHistory = (r: RollResult) => {
    let rollResultsWithNewRoll = [r, ...rollResults];
    setRollResults(rollResultsWithNewRoll);
  };

  const saveToStore = () => {
    const characterSheetState: CharacterSheetState = {
      rollResults: rollResults,
      profBonus: profBonus,
      strengthStat: strengthStat,
      dexterityStat: dexterityStat,
      constitutionStat: constitutionStat,
    };
    let characterSheetStateString = JSON.stringify(characterSheetState);
    localStorage.setItem("LOCAL_STORE_CharacterSheetState", characterSheetStateString);
  };

  const getFromStore = () => {
    const characterSheetString = localStorage.getItem("LOCAL_STORE_CharacterSheetState");
    if(characterSheetString !== null) {
      let characterSheet = JSON.parse(characterSheetString) as CharacterSheetState;
      setRollResults(characterSheet.rollResults);
      setProfBonus(characterSheet.profBonus);
      setStrengthStat(characterSheet.strengthStat);
      setDexterityStat(characterSheet.dexterityStat);
      setConstitutionStat(characterSheet.constitutionStat);
    }
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
        <CharacterStatRow
          characterStat={constitutionStat}
          setCharacterStat={setConstitutionStat}
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
          {rollResults.map((rollResult, idx) => {
            return (
              <option key={idx}>
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
