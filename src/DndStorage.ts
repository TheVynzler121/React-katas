import { Armor, CharacterLocalStore, CharacterSheetState } from "./DndTypes";


export const getAllFromStore = () => {
  const characterSheetsString = localStorage.getItem("LOCAL_STORE_CharacterSheetState"); // sets a var to the string saved in local storage
  if (characterSheetsString !== null) { //checks if the string is not empty
    let characterSheets = JSON.parse(characterSheetsString) as CharacterLocalStore; //parses the string into and array of keys
    return characterSheets || {}; //returns the keys or and empty object
  }
  return {};
};

export const getFromStore = (name:string) => { //get provided a name
  let allCharacters = getAllFromStore(); //sets a var to be the keys saved in local storage, by calling getAllFromStore()
  return allCharacters[name]; //returns the key of the matching name
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

