import { useState } from "react";
import "./CharacterSheet.css";
import { rollDice } from "./DiceHelpers";
import { calculateBaseModifier, formatMod } from "./DndHelpers";
import { RollResult } from "./CharacterSheet";

interface CharacterStatRowProps {
  statName: string;
  profBonus: number;
  pushToRollResultHistory: (rollResult: RollResult) => void;
}

function CharacterStatRow(props: CharacterStatRowProps) {
  const [ablityScore, setAbilityScore] = useState(10);
  const [bonusMod, setBonusMod] = useState(0);
  const baseMod = calculateBaseModifier(ablityScore);
  const [profBonusCheckbox, setProfBonusCheckBox] = useState(false);
  const profBonus = (profBonusCheckbox ? props.profBonus : 0)
  const checkMod = baseMod + bonusMod + profBonus;
  const saveMod = baseMod + profBonus; //write your code like the user would talk (if possible) also known as self documenting code
  
  const rollHandler = (checkOrSave: string, modifier: number) => {
    let roll = rollDice(20);
    let rollResult: RollResult = {
      statName: props.statName,
      totalModifier: modifier,
      roll: roll,
      rollPlusModifier: modifier + roll,
      checkOrSave: checkOrSave,
    };
    props.pushToRollResultHistory(rollResult);
  };

  return (
    <>
      <tr>
        <td>
          <input
            type="checkbox"
            onChange={(e) => setProfBonusCheckBox(!profBonusCheckbox)}
            checked={profBonusCheckbox}
          ></input>
        </td>
        <td className="statname">{props.statName}:</td>
        <td>
          <input
            className="statInput"
            type="number"
            onChange={(e) => setAbilityScore(parseInt(e.target.value))}
            value={ablityScore}
          />
        </td>
        <td>
          {baseMod > 0 ? "+" : ""}
          {baseMod}
        </td>
        <td>
          <input
            className="statInput"
            type="number"
            onChange={(e) => setBonusMod(parseInt(e.target.value))}
            value={bonusMod}
          />
        </td>
        <td>
          <button className="dice" onClick={() => rollHandler("Check",checkMod)}>
            Check{formatMod(checkMod)}           
          </button>
        </td>
        <td>
          <button className="dice" onClick={() => rollHandler("Save",saveMod)}>
            Save{formatMod(saveMod)}
          </button>
        </td>
      </tr>
    </>
  );
}

export default CharacterStatRow;
