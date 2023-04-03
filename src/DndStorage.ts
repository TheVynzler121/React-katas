import { Armor, CharacterLocalStore, CharacterSheetState } from "./DndTypes";


export const getAllFromStore = () => {
  const characterSheetsString = localStorage.getItem("LOCAL_STORE_CharacterSheetState");
  if (characterSheetsString !== null) {
    let characterSheets = JSON.parse(characterSheetsString) as CharacterLocalStore;
    return characterSheets || {};
  }
  return {};
};

export const getFromStore = (name:string) => {
  let allCharacters = getAllFromStore();
  return allCharacters[name];
};

export const saveToStore = (characterSheetState: CharacterSheetState) => {
  let allCharacters = getAllFromStore();
  allCharacters[characterSheetState.characterName] = characterSheetState;
  
  let allCharactersString = JSON.stringify(allCharacters);
  localStorage.setItem("LOCAL_STORE_CharacterSheetState", allCharactersString);
};

export const getInvFromStore = () => {
  const armorDetails = localStorage.getItem("LOCAL_STORE_ArmorState");
  if(armorDetails !== null){
    let armorDetailsState = JSON.parse(armorDetails) as Armor;
    return armorDetailsState || undefined;
  }
  return undefined;
}

export const saveInvToStore = (armorState: Armor) => {
  let armorDetails = JSON.stringify(armorState)
  localStorage.setItem("LOCAL_STORE_ArmorState", armorDetails);
  
}

