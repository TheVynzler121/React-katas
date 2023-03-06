import { useState } from "react";
import "./CharacterSheet.css";
import { rollDice } from "./DiceHelpers";
import { CharacterStat, RollResult } from "./CharacterSheet";

function CharacterSkillPanel(props: { 
  profBonus: number; 
  characterStat: CharacterStat;
  pushToRollResultHistory: (rollResult: RollResult) => void;
}) {
    return (
        <></>
    );
}

export default CharacterSkillPanel;
