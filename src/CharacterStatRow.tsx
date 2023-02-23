import { useState } from "react";
import "./CharacterSheet.css";
import { rollDice } from "./DiceHelpers";
import { calculateBaseModifier, formatMod } from "./DndHelpers";
import { RollResult } from "./CharacterSheet";

interface CharacterStatRowProps {
  statName: string;
  profBonus: number;
  pushToRollResultHistory: (rollResult: RollResult) => void;
  ablityScore: number;
  setAbilityScore: (abilityScore: number) => void;
  bonusMod: number;
  setBonusMod: (bonusMod: number) => void;
  profBonusCheckbox: boolean;
  setProfBonusCheckBox: (profBonusCheckbox: boolean) => void;
}

function CharacterStatRow(props: CharacterStatRowProps) {

  const baseMod = calculateBaseModifier(props.ablityScore);
 
  const profBonus = (props.profBonusCheckbox ? props.profBonus : 0)
  const checkMod = baseMod + props.bonusMod + profBonus;
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
            onChange={(e) => props.setProfBonusCheckBox(!props.profBonusCheckbox)}
            checked={props.profBonusCheckbox}
          ></input>
        </td>
        <td className="statname">{props.statName}:</td>
        <td>
          <input
            className="statInput"
            type="number"
            onChange={(e) => props.setAbilityScore(parseInt(e.target.value))}
            value={props.ablityScore}
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
            onChange={(e) => props.setBonusMod(parseInt(e.target.value))}
            value={props.bonusMod}
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
