import { useState } from "react";
import CharacterSheet from "./CharacterSheet";
import { CharacterSheetState } from "./DndTypes";

function DndAdminPanel() {
  const [currentCharacterSheet, setCurrentCharacterSheet] = useState<CharacterSheetState | undefined>(undefined);

  const getFromStore = () => {
    const characterSheetString = localStorage.getItem("LOCAL_STORE_CharacterSheetState");
    if (characterSheetString !== null) {
      let characterSheet = JSON.parse(characterSheetString) as CharacterSheetState;
      setCurrentCharacterSheet(characterSheet);
    }
  };

  const saveToStore = (characterSheetState:CharacterSheetState) => {
    let characterSheetStateString = JSON.stringify(characterSheetState);
    localStorage.setItem("LOCAL_STORE_CharacterSheetState", characterSheetStateString);
    setCurrentCharacterSheet(characterSheetState);
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
