import { useState } from "react";
import "./CharacterSheet.css";
import { rollDice } from "./DiceHelpers";
import { CharacterStat, RollResult } from "./CharacterSheet";
import { calculateBaseModifier, formatMod } from "./DndHelpers";

function CharacterSkillPanel(props: {
  skillName: string;
  profBonus: number;
  characterStat: CharacterStat;
  hasProf: boolean;
  setHasProf: (prof: boolean) => void;
  pushToRollResultHistory: (rollResult: RollResult) => void;
}) {
  //align the roll check buttons, like you did with the check boxes

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

  const profBonus = props.hasProf ? props.profBonus : 0;
  const skillMod = calculateBaseModifier(props.characterStat.abilityScore) + profBonus;

  return (
    <>
      <tr>
        <td>
          <input type="checkbox" onChange={(e) => props.setHasProf(!props.hasProf)} checked={props.hasProf} />
        </td>
        <td>
          {props.skillName}{" "}
          {calculateBaseModifier(props.characterStat.abilityScore) + (props.hasProf ? props.profBonus : 0)}
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
