import { type } from "os";

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

export enum CharacterClass {
  Artificer,
  Barbarian,
  Bard,
  Cleric,
  Druid,
  Fighter,
  Monk,
  Paladin,
  Ranger,
  Rogue,
  Sorcerer,
  Warlock,
  Wizard,
}

export enum CharacterRace {
  Dwarf,
  Elf,
  Halfling,
  Human,
  Dragonborn,
  Gnome,
  HalfElf,
  HalfOrc,
  Tiefling,
}

export interface CharacterSheetState {
  characterName: string;
  characterLevel: number;
  characterClass: CharacterClass;
  characterRace: CharacterRace;
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

export enum ArmorType {
  Helm,
  Chest,
  Gloves,
  Boots,
  Belt,
}

export interface Armor {
  item: "armor";
  name: string;
  cost: number;
  armorType: ArmorType;
  baseArmorClass: number;
  strReq: number | undefined;
  stealthDisadvantage: boolean;
  weight: number;
}

export const damageDiceOptions = [4 , 6 , 8 , 10 , 12 , 20] as const;
export type DamageDiceType = typeof damageDiceOptions[number];
export interface Weapon {
  item: "weapon";
  name: string;
  cost: number;
  damageDiceCount: number;
  damageDiceType: DamageDiceType; // this is a literal type
  weight: number;
  // heavy: boolean;
  // twoHanded: boolean;
  // light: boolean;
  // reach: boolean;
}



export interface MeleeWeapon extends Weapon {
  itemType:
    | "Club"
    | "Dagger"
    | "Greatclub"
    | "Handaxe"
    | "Javelin"
    | "Light Hammer"
    | "Mace"
    | "Quarterstaff"
    | "Sickle"
    | "Spear"
    | "Battleaxe"
    | "Flail"
    | "Glaive"
    | "Greataxe"
    | "Greatsword"
    | "Halberd"
    | "Lance"
    | "Longsword"
    | "Maul"
    | "Morningstar"
    | "Pike"
    | "Rapier"
    | "Scimitar"
    | "Shortsword"
    | "Trident"
    | "War pick"
    | "Warhammer"
    | "Whip";
  finesse: boolean;
  versatile: boolean;
  thrown: boolean;
}

export interface RangedWeapon extends Weapon {
  itemType:
    | "Light Crossbow"
    | "Dart"
    | "Shortbow"
    | "Sling"
    | "Blowgun"
    | "Hand Crossbow"
    | "Heavy Crossbow"
    | "Longbow"
    | "Net"
    | "Wand"
    | "Quarterstaff";
  ammunition: boolean;
  loading: boolean;
  special: boolean;
  range: number;
}

export interface MagicArmor extends Armor, MagicDetails {}

export interface MagicMeleeWeapon extends MeleeWeapon, MagicDetails {}

export interface MagicRangedWeapon extends RangedWeapon, MagicDetails {}

export interface MagicItem extends MagicDetails {
  item: "magicItem";
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

export interface AdventureGear {
  item: "adventureGear";
  name: string;
  cost: number;
  weight: number;
}

export type Item = Weapon | AdventureGear | Armor | MagicItem;

export interface CharacterLocalStore {
  [key: string]: CharacterSheetState;
}

export interface ItemLocalStore {
  [key: string]: Item; //think Dictionary<string, Item>();
}

export interface WeaponLocalStore {
  [key: string]: Weapon;
}
