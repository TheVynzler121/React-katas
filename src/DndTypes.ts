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

export interface Armor {
  name: string;
  cost: number;
  itemType: "Helm" | "Chest" | "Gloves" | "Boots" | "Belt"; //known as a literal type
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
};
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
  thrown: false,
  wondrousItem: true,
  description: "Creates an ice field on impact thats 4 square feet, slowing anyone inside the zone",
};

const simpleAxe: MeleeWeapon = {
  name: "Simple Axe",
  cost: 12,
  damageDiceCount: 1,
  damageDiceType: 6,
  finesse: false,
  heavy: false,
  itemType: "Handaxe",
  light: true,
  reach: false,
  thrown: true,
  twoHanded: false,
  versatile: false,
  weight: 2,
};

const simpleCrossbow: RangedWeapon = {
  ammunition: true,
  cost: 10,
  damageDiceCount: 1,
  damageDiceType: 8,
  heavy: false,
  itemType: "Light Crossbow",
  light: true,
  loading: true,
  name: "Simple Crossbow",
  range: 120,
  reach: false,
  special: false,
  twoHanded: true,
  weight: 4,
};

const magicRanged: MagicRangedWeapon = {
  ammunition: true,
  itemType: "Longbow",
  heavy: false,
  light: false,
  loading: false,
  name: "Lightning Bolt",
  quality: 2,
  range: 240,
  rarity: "Uncommon",
  reach: false,
  reqAttunement: true,
  special: false,
  twoHanded: true,
  weight: 4,
  wondrousItem: true,
  attuned: false,
  cost: 200,
  cursed: false,
  damageDiceCount: 2,
  damageDiceType: 8,
  description: "A bow the shoots lightning",
};

const magicHelm: MagicArmor = {
  attuned: false,
  itemType: "Helm",
  name: "Bone Helm",
  quality: 1,
  rarity: "Rare",
  reqAttunement: true,
  stealthDisadvantage: false,
  strReq: 0,
  weight: 2,
  wondrousItem: false,
  baseArmorClass: 10,
  cost: 400,
  cursed: true,
  description: "A helm that melds to the wearers head",
};

export interface AdventureGear {
  name: string;
  cost: number;
  weight: number;
}

export type Item = Weapon | AdventureGear | Armor | MagicItem;

export interface CharacterLocalStore {
  [key: string]: CharacterSheetState;
}
