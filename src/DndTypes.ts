export interface RollResult {
  statName: string;
  totalModifier: number;
  roll: number;
  rollPlusModifier: number;
  rollType: string;
}

export interface CharacterStat {
  // INTERFACE IS NOT A CLASS
  //an interface names a shape, the object is the instance that has the data in it
  statName: string;
  abilityScore: number;
  bonusMod: number;
  profBonusCheckbox: boolean;
}

export interface CharacterSheetState {
  characterName: string;
  characterLevel: number;
  rollResults: RollResult[]; // List<RollResult>  // IEnumerable<RollResult>
  profBonus: number;
  strengthStat: CharacterStat;
  dexterityStat: CharacterStat;
  constitutionStat: CharacterStat;
  intelligenceStat: CharacterStat;
  wisdomStat: CharacterStat;
  charismaStat: CharacterStat;
  acrobaticsProf: boolean;
  animalHandlingProf: boolean;
  arcanaProf: boolean;
  athleticsProf: boolean;
  deceptionProf: boolean;
  historyProf: boolean;
  insightProf: boolean;
  intimidationProf: boolean;
  investigationProf: boolean;
  medicineProf: boolean;
  natureProf: boolean;
  perceptionProf: boolean;
  performanceProf: boolean;
  persuasionProf: boolean;
  religionProf: boolean;
  sleightOfHandProf: boolean;
  stealthProf: boolean;
  survivalProf: boolean;
}

export interface Armor{
  name: string;
  cost: number;
  baseArmorClass: number;
  strReq: number | undefined;
  stealthDisadvantage: boolean;
  weight: number;
}

export interface Weapon{
  name: string;
  cost: number;
  damageDiceCount: number;
  damageDiceType: 4 | 6 | 8 | 10 | 12 | 20;
  weight: number;
  light: boolean;
  finesse: boolean;
  thrown: boolean;
  twoHanded: boolean;
  versatile: boolean;
  ammunition: boolean;
  heavy: boolean;
  reach: boolean;
  loading: boolean;
  special: boolean;
  range: number;
}

export interface MagicItem extends Armor, Weapon {
  quality: 1 | 2 | 3;
  rarity: "Common" | "Uncommon" | "Rare" | "Very Rare" | "Legendary";
  itemType: "Armor" | "Potion" | "Ring" | "Rod" | "Scroll" | "Staff" | "Wand" | "Weapon" | "Wondrous Item";
  reqAttunement: boolean;
  attuned: boolean;
  cursed: boolean;
  description: string;
}

export interface AdventureGear{
  name: string;
  cost: number;
  weight: number;
}

export type Item = 
  | Weapon 
  | AdventureGear 
  | Armor
  | MagicItem

export interface CharacterLocalStore {
  [key:string]: CharacterSheetState
}
