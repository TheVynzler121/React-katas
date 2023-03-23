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
  itemType: "Helm" | "Chest",
  baseArmorClass: number;
  strReq: number | undefined;
  stealthDisadvantage: boolean;
  weight: number;
}

export interface Weapon {
  name: string;
  cost: number;
  damageDiceCount: number;
  damageDiceType: 4 | 6 | 8 | 10 | 12 | 20;
  weight: number;
  heavy: boolean;
  twoHanded: boolean;
  light: boolean;
  reach: boolean;
}

export interface MeleeWeapon extends Weapon{
  itemType: "Club" | "Dagger" |"Greatclub" | "Battle Axe" | "Longsword";
  finesse: boolean;
  versatile: boolean;
}

export interface RangedWeapon extends Weapon{
  itemType: "Bow"
  thrown: boolean;
  ammunition: boolean;
  loading: boolean;
  special: boolean;
  range: number;
}

export interface MagicArmor extends Armor, MagicDetails {

}

export interface MagicMeleeWeapon extends MeleeWeapon, MagicDetails {
 
}

export interface MagicRangedWeapon extends RangedWeapon, MagicDetails{
  // itemType: "Rod" | "Staff" | "Bow";
}

export interface MagicItem extends MagicDetails{
  itemType: "Ring" | "Rod" | "Potion" | "Wand";
}

export interface MagicDetails {
  name: string;
  quality: 1 | 2 | 3;
  rarity: "Common" | "Uncommon" | "Rare" | "Very Rare" | "Legendary";
  reqAttunement: boolean;
  attuned: boolean;
  cursed: boolean;
  wondrousItem: boolean;
  description: string;
}

const magicRing: MagicItem = {
  name: "Ring of Anti-gravity",
  quality: 2,
  rarity: "Rare",
  itemType: "Ring",
  reqAttunement: true,
  attuned: false,
  cursed: false,
  wondrousItem: true,
  description: "Makes the wielder jump twice as high",
}
const magicSword: MagicMeleeWeapon = {
  name: "Icebound Sword",
  quality: 3,
  rarity: "Legendary",
  itemType: "Longsword",
  reqAttunement: true,
  attuned: true,
  cursed: true,
  cost: 300,
  damageDiceCount: 3,
  damageDiceType: 8,
  weight: 20,
  light: false,
  finesse: false,
  heavy: true,
  reach: false,
  twoHanded: true,
  versatile: false,
  wondrousItem: true,
  description: "Creates an ice field on impact thats 4 square feet, slowing anyone inside the zone"
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
