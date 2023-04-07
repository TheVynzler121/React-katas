import { Armor, ArmorLocalStore, CharacterLocalStore, CharacterSheetState } from "./DndTypes";


export const getAllFromStore = () => {
  const characterSheetsString = localStorage.getItem("LOCAL_STORE_CharacterSheetState"); // sets a var to the string saved in local storage
  if (characterSheetsString !== null) { //checks if the string is not empty
    let characterSheets = JSON.parse(characterSheetsString) as CharacterLocalStore; //parses the string into an array of keys
    return characterSheets || {}; //returns the keys or an empty object
  }
  return {};
};

export const getFromStore = (name:string) => { //get provided a name
  let allCharacters = getAllFromStore(); //sets a var to be the keys saved in local storage, by calling getAllFromStore()
  return allCharacters[name]; //returns the key of the matching name
};

export const saveToStore = (characterSheetState: CharacterSheetState) => {
  let allCharacters = getAllFromStore(); //gets all the keys for all the currently stored characters
  allCharacters[characterSheetState.characterName] = characterSheetState; //select the name of the sheet passed to saveToStore
  
  let allCharactersString = JSON.stringify(allCharacters); //turn allCharacters into a string
  localStorage.setItem("LOCAL_STORE_CharacterSheetState", allCharactersString); //save the characters string with the provided key
};

export const getAllArmorFromStore = () => {
  const armorDetails = localStorage.getItem("LOCAL_STORE_ArmorState");
  if(armorDetails !== null){
    let armorDetailsState = JSON.parse(armorDetails) as ArmorLocalStore;
    return armorDetailsState || {};
  }
  return {};
};

export const getArmorFromStore = (armorName:string) => {
  let allArmor = getAllArmorFromStore();
  return allArmor[armorName];
};

export const saveArmorToStore = (armorState: Armor) => {
  let allArmor = getAllArmorFromStore();
  allArmor[armorState.name] = armorState; //create or update the key with the new value
  let armorDetails = JSON.stringify(allArmor);
  localStorage.setItem("LOCAL_STORE_ArmorState", armorDetails);
};

