import { useState } from "react";
import "./CharacterSheet.css";
import { rollDice } from "./DiceHelpers";
import { calculateBaseModifier, formatMod } from "./DndHelpers";
import { CharacterStat, RollResult } from "./DndTypes";

function CharacterSkillPanel(props: {
  skillName: string;
  profBonus: number;
  characterStat: CharacterStat;
  hasProf: boolean;
  setHasProf: (prof: boolean) => void;
  pushToRollResultHistory: (rollResult: RollResult) => void;
}) {
  

  const rollHandler = (rollType: string, modifier: number) => {
    let roll = rollDice(20);
    let rollResult: RollResult = {
      statName: props.characterStat.statName,
      totalModifier: modifier,
      roll: roll,
      rollPlusModifier: modifier + roll,
      rollType: rollType,
    };
    props.pushToRollResultHistory(rollResult);
  };

  const profBonus = props.hasProf ? props.profBonus : 0; //if props.hasProf is true then give its profBonus, else give 0
  const skillMod = calculateBaseModifier(props.characterStat.abilityScore) + profBonus;

  return (
    <>
      <tr>
        <td>
          <input type="checkbox" onChange={(e) => props.setHasProf(!props.hasProf)} checked={props.hasProf} />
        </td>
        <td>
          {props.skillName}
        </td>
        <td>
          <button className="dice" onClick={() => rollHandler(`[${props.skillName}]`, skillMod)}>
          Check{formatMod(skillMod)}
          </button>
        </td>
      </tr>
    </>
  );
}

export default CharacterSkillPanel;
