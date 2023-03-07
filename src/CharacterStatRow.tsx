import { useState } from "react";
import "./CharacterSheet.css";
import { rollDice } from "./DiceHelpers";
import { calculateBaseModifier, formatMod } from "./DndHelpers";
import { CharacterStat, RollResult } from "./CharacterSheet";

function CharacterStatRow(props: {
  profBonus: number;
  characterStat: CharacterStat;
  setCharacterStat: (characterStat: CharacterStat) => void; // [func name]: (paramater name: type) => [return type]
  pushToRollResultHistory: (rollResult: RollResult) => void;
}) {
  const baseMod = calculateBaseModifier(props.characterStat.abilityScore);
  const profBonus = props.characterStat.profBonusCheckbox ? props.profBonus : 0;
  const checkMod = baseMod + props.characterStat.bonusMod + profBonus;
  const saveMod = baseMod + profBonus; //write your code like the user would talk (if possible) also known as self documenting code

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

  const profBonusHandler = (e: React.ChangeEvent) => {
    let newProfBonusCheckbox = !props.characterStat.profBonusCheckbox;
    let characterStatWithNewCheckbox = { ...props.characterStat, profBonusCheckbox: newProfBonusCheckbox };
    props.setCharacterStat(characterStatWithNewCheckbox);
  };

  const abilityScoreHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newAbilityScore = parseInt(e.target.value);
    let characterStatWithNewAbilityScore = { ...props.characterStat, abilityScore: newAbilityScore };
    props.setCharacterStat(characterStatWithNewAbilityScore);
  };

  const bonusModHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newBonusMod = parseInt(e.target.value);
    let characterStatWithNewBonusMod = { ...props.characterStat, bonusMod: newBonusMod };
    props.setCharacterStat(characterStatWithNewBonusMod);
  };

  return (
    <>
      <tr>
        <td>
          <input type="checkbox" onChange={profBonusHandler} checked={props.characterStat.profBonusCheckbox}></input>
        </td>
        <td className="statname">{props.characterStat.statName}:</td>
        <td>
          <input
            className="statInput"
            type="number"
            onChange={abilityScoreHandler}
            value={props.characterStat.abilityScore}
          />
        </td>
        <td>
          {baseMod > 0 ? "+" : ""}
          {baseMod}
        </td>
        <td>
          <input className="statInput" type="number" onChange={bonusModHandler} value={props.characterStat.bonusMod} />
        </td>
        <td>
          <button className="dice" onClick={() => rollHandler("[Check]", checkMod)}>
            Check{formatMod(checkMod)}
          </button>
        </td>
        <td>
          <button className="dice" onClick={() => rollHandler("[Save]", saveMod)}>
            Save{formatMod(saveMod)}
          </button>
        </td>
      </tr>
    </>
  );
}

export default CharacterStatRow;
