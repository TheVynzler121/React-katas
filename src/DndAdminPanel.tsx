import { useState } from "react";
import CharacterSheet from "./CharacterSheet";
import { CharacterSheetState } from "./DndTypes";

const defaultStat = {
  //objects can hold anything, and it'll work as long as it has the interface shape. they are like flexible dictionaries
  statName: "",
  abilityScore: 10,
  bonusMod: 0,
  profBonusCheckbox: false,
};

const defaultSheet = {
  characterName: "",
  rollResults: [],
  profBonus: 0,
  strengthStat: { ...defaultStat, statName: "Strength" },
  dexterityStat: { ...defaultStat, statName: "Dexterity" },
  constitutionStat: { ...defaultStat, statName: "Constitution" },
  intelligenceStat: { ...defaultStat, statName: "Intelligence" },
  wisdomStat: { ...defaultStat, statName: "Wisdom" },
  charismaStat: { ...defaultStat, statName: "Charisma" },
  acrobaticsProf: false,
  animalHandlingProf: false,
  arcanaProf: false,
  athleticsProf: false,
  deceptionProf: false,
  historyProf: false,
  insightProf: false,
  intimidationProf: false,
  investigationProf: false,
  medicineProf: false,
  natureProf: false,
  perceptionProf: false,
  performanceProf: false,
  persuasionProf: false,
  religionProf: false,
  sleightOfHandProf: false,
  stealthProf: false,
  survivalProf: false,
} as CharacterSheetState;

function DndAdminPanel() {
  const [currentCharacterSheet, setCurrentCharacterSheet] = useState<CharacterSheetState | undefined>(undefined);

  const getFromStore = () => {
    const characterSheetString = localStorage.getItem("LOCAL_STORE_CharacterSheetState");
    if (characterSheetString !== null) {
      let characterSheet = JSON.parse(characterSheetString) as CharacterSheetState;
      setCurrentCharacterSheet(characterSheet);
    }
  };

  const saveToStore = (characterSheetState: CharacterSheetState) => {
    let characterSheetStateString = JSON.stringify(characterSheetState);
    localStorage.setItem("LOCAL_STORE_CharacterSheetState", characterSheetStateString);
    setCurrentCharacterSheet(characterSheetState);
  };

  const newCharacterSheet = () => {
    setCurrentCharacterSheet({ ...defaultSheet });
  };
  return (
    <>
      <p>
        <button
          onClick={() => {
            getFromStore();
          }}
        >
          Load from Store
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            newCharacterSheet();
          }}
        >
          New Character
        </button>
      </p>

      {currentCharacterSheet && <CharacterSheet characterSheet={currentCharacterSheet} saveToStore={saveToStore} />}
    </>
  );
}

export default DndAdminPanel;

/*

App
  DndAdminPanel  currentCharacterSheet: (Dritz S:10)
    CharacterSheet currentCharacterSheet: (Dritz S:10)
        strengthStat(11)
      CharacterSkillPanel
      CharacterStatRow

*/
