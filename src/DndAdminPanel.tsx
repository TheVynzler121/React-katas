import { useState } from "react";
import CharacterSheet from "./CharacterSheet";
import { getFromStore, saveToStore, getAllFromStore } from "./DndStorage";
import { CharacterClass, CharacterRace, CharacterSheetState } from "./DndTypes";

const defaultStat = {
  //objects can hold anything, and it'll work as long as it has the interface shape. they are like flexible dictionaries
  statName: "",
  abilityScore: 10,
  bonusMod: 0,
  profBonusCheckbox: false,
};

// save any number of characters
// load a specific character by name
// save a loaded character

const defaultSheet = {
  characterName: "",
  characterLevel: 0,
  characterClass: CharacterClass.Artificer,
  characterRace: CharacterRace.Dwarf,
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


// API  (Application Programming Interface)
//       : e.g a service, or set of functions in a library, or a way to talk to a database
//       used to talk about actual concrete function names

// Abstraction  : Cartoon simplification of the underlying details (used to talk about responsibilities)
//                (hides implementation details)
// Implementation Details : how the abstraction does it's job, concrete steps to do something

// module : a file with code in it (broadly speaking)
// Component : a function that returns JSX

function DndAdminPanel() {
  const [currentCharacterSheet, setCurrentCharacterSheet] = useState<CharacterSheetState | undefined>(undefined);

  const getFromStoreHandler = (name:string) => { //gets provided a name
    let characterSheet = getFromStore(name); //sets the key of the matching name as a var
    if(characterSheet) { //if the var is "truthy", or in otherwords has a value
      setCurrentCharacterSheet(characterSheet); //set the state to the states saved in local store
    }
  };

  const saveToStoreHandler = (characterSheetState: CharacterSheetState) => {
    saveToStore(characterSheetState); //save the current sheets state to store

    setCurrentCharacterSheet(characterSheetState); //set the current sheets state to the current sheet
  };

  const newCharacterSheet = () => {
    setCurrentCharacterSheet({ ...defaultSheet }); //sets the state to the default sheet
  };

  const namesAsObject = getAllFromStore();
  const characterNames:string[] = Object.keys(namesAsObject);

  return (
    <>
      <p>
        <select
          value={currentCharacterSheet?.characterName}
          onChange={(e) => {
            getFromStoreHandler(e.target.value);
          }}
        >
          {characterNames.map(name => <option value={name}>{name}</option>)}
        </select>
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

      {currentCharacterSheet && <CharacterSheet characterSheet={currentCharacterSheet} saveToStore={saveToStoreHandler} />}
    </>
  );
}

export default DndAdminPanel;


