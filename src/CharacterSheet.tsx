import { useState } from "react";
import "./CharacterSheet.css";
import CharacterSkillPanel from "./CharacterSkillPanel";
import CharacterStatRow from "./CharacterStatRow";
import { calculateBaseModifier } from "./DndHelpers";

// a child component can't call a parent function, unless it is given the function as a callback

export interface RollResult {
  statName: string;
  totalModifier: number;
  roll: number;
  rollPlusModifier: number;
  rollType: string;
}

export interface CharacterStat {
  //an interface names a shape, the object is the instance that has the data in it
  statName: string;
  abilityScore: number;
  bonusMod: number;
  profBonusCheckbox: boolean;
}

const defaultStat = {
  statName: "",
  abilityScore: 10,
  bonusMod: 0,
  profBonusCheckbox: false,
} as CharacterStat;

interface CharacterSheetState {
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

function CharacterSheet() {
  const [rollResults, setRollResults] = useState<RollResult[]>([]);
  const [profBonus, setProfBonus] = useState<number>(0); //useState to remember user input
  const [strengthStat, setStrengthStat] = useState<CharacterStat>({ ...defaultStat, statName: "Strength" });
  const [dexterityStat, setDexterityStat] = useState<CharacterStat>({ ...defaultStat, statName: "Dexterity" });
  const [constitutionStat, setConstitutionStat] = useState<CharacterStat>({ ...defaultStat, statName: "Constitution" });
  const [intelligenceStat, setIntelligenceStat] = useState<CharacterStat>({ ...defaultStat, statName: "Intelligence" });
  const [wisdomStat, setWisdomStat] = useState<CharacterStat>({ ...defaultStat, statName: "Wisdom" });
  const [charismaStat, setCharismaStat] = useState<CharacterStat>({ ...defaultStat, statName: "Charisma" });
  const [acrobaticsProf, setAcrobaticsProf] = useState<boolean>(false);
  const [animalHandlingProf, setAnimalHandlingProf] = useState<boolean>(false);
  const [arcanaProf, setArcanaProf] = useState<boolean>(false);
  const [athleticsProf, setAthleticsProf] = useState<boolean>(false);
  const [deceptionProf, setDeceptionProf] = useState<boolean>(false);
  const [historyProf, setHistoryProf] = useState<boolean>(false);
  const [insightProf, setInsightProf] = useState<boolean>(false);
  const [intimidationProf, setIntimidationProf] = useState<boolean>(false);
  const [investigationProf, setInvestigationProf] = useState<boolean>(false);
  const [medicineProf, setMedicineProf] = useState<boolean>(false);
  const [natureProf, setNatureProf] = useState<boolean>(false);
  const [perceptionProf, setPerceptionProf] = useState<boolean>(false);
  const [performanceProf, setPerformanceProf] = useState<boolean>(false);
  const [persuasionProf, setPersuasionProf] = useState<boolean>(false);
  const [religionProf, setReligionProf] = useState<boolean>(false);
  const [sleightOfHandProf, setSleightOfHandProf] = useState<boolean>(false);
  const [stealthProf, setStealthProf] = useState<boolean>(false);
  const [survivalProf, setSurvivalProf] = useState<boolean>(false);

  const pushToHistory = (r: RollResult) => {
    let rollResultsWithNewRoll = [r, ...rollResults];
    setRollResults(rollResultsWithNewRoll);
  };

  const saveToStore = () => {
    const characterSheetState: CharacterSheetState = {
      rollResults: rollResults,
      profBonus: profBonus,
      strengthStat: strengthStat,
      dexterityStat: dexterityStat,
      constitutionStat: constitutionStat,
      intelligenceStat: intelligenceStat,
      wisdomStat: wisdomStat,
      charismaStat: charismaStat,
      acrobaticsProf: acrobaticsProf,
      animalHandlingProf: animalHandlingProf,
      arcanaProf: arcanaProf,
      athleticsProf: athleticsProf,
      deceptionProf: deceptionProf,
      historyProf: historyProf,
      insightProf: insightProf,
      intimidationProf: intimidationProf,
      investigationProf: investigationProf,
      medicineProf: medicineProf,
      natureProf: natureProf,
      perceptionProf: perceptionProf,
      performanceProf: performanceProf,
      persuasionProf: persuasionProf,
      religionProf: religionProf,
      sleightOfHandProf: sleightOfHandProf,
      stealthProf: stealthProf,
      survivalProf: survivalProf,
    };
    let characterSheetStateString = JSON.stringify(characterSheetState);
    localStorage.setItem("LOCAL_STORE_CharacterSheetState", characterSheetStateString);
  };

  const getFromStore = () => {
    const characterSheetString = localStorage.getItem("LOCAL_STORE_CharacterSheetState");
    if (characterSheetString !== null) {
      let characterSheet = JSON.parse(characterSheetString) as CharacterSheetState;
      setRollResults(characterSheet.rollResults);
      setProfBonus(characterSheet.profBonus);
      setStrengthStat(characterSheet.strengthStat);
      setDexterityStat(characterSheet.dexterityStat);
      setConstitutionStat(characterSheet.constitutionStat);
      setIntelligenceStat(characterSheet.intelligenceStat);
      setWisdomStat(characterSheet.wisdomStat);
      setCharismaStat(characterSheet.charismaStat);
      setAcrobaticsProf(characterSheet.acrobaticsProf);
      setAnimalHandlingProf(characterSheet.animalHandlingProf);
      setArcanaProf(characterSheet.arcanaProf);
      setAthleticsProf(characterSheet.athleticsProf);
      setDeceptionProf(characterSheet.deceptionProf);
      setHistoryProf(characterSheet.historyProf);
      setInsightProf(characterSheet.insightProf);
      setIntimidationProf(characterSheet.intimidationProf);
      setInvestigationProf(characterSheet.investigationProf);
      setMedicineProf(characterSheet.medicineProf);
      setNatureProf(characterSheet.natureProf);
      setPerceptionProf(characterSheet.perceptionProf);
      setPerformanceProf(characterSheet.performanceProf);
      setPersuasionProf(characterSheet.persuasionProf);
      setReligionProf(characterSheet.religionProf);
      setSleightOfHandProf(characterSheet.sleightOfHandProf);
      setStealthProf(characterSheet.stealthProf);
      setSurvivalProf(characterSheet.survivalProf);
    }
  };

  return (
    <>
      <p>
        <button
          onClick={() => {
            saveToStore();
          }}
        >
          {" "}
          Save In Store{" "}
        </button>
        <button
          onClick={() => {
            getFromStore();
          }}
        >
          {" "}
          Load from Store{" "}
        </button>
      </p>
      <table>
        <tr>
          <th></th>
          <th>Stat</th>
          <th>Value</th>
          <th>Base Mod</th>
          <th>Bonus Mod</th>
        </tr>
        <CharacterStatRow
          characterStat={strengthStat}
          setCharacterStat={setStrengthStat}
          pushToRollResultHistory={pushToHistory}
          profBonus={profBonus}
        />
        <CharacterStatRow
          characterStat={dexterityStat}
          setCharacterStat={setDexterityStat}
          pushToRollResultHistory={pushToHistory}
          profBonus={profBonus}
        />
        <CharacterStatRow
          characterStat={constitutionStat}
          setCharacterStat={setConstitutionStat}
          pushToRollResultHistory={pushToHistory}
          profBonus={profBonus}
        />
        <CharacterStatRow
          characterStat={intelligenceStat}
          setCharacterStat={setIntelligenceStat}
          pushToRollResultHistory={pushToHistory}
          profBonus={profBonus}
        />
        <CharacterStatRow
          characterStat={wisdomStat}
          setCharacterStat={setWisdomStat}
          pushToRollResultHistory={pushToHistory}
          profBonus={profBonus}
        />
        <CharacterStatRow
          characterStat={charismaStat}
          setCharacterStat={setCharismaStat}
          pushToRollResultHistory={pushToHistory}
          profBonus={profBonus}
        />
      </table>
      <p>
        Proficiency Bonus:
        {/* one tag close if there is nothing in between. See line 18 vs 30-33  */}
        <input
          className="statInput"
          type="number"
          onChange={(e) => setProfBonus(parseInt(e.target.value))}
          value={profBonus}
        />
      </p>
      <p>
        <table>
          <CharacterSkillPanel
            skillName="Acrobatics"
            profBonus={profBonus}
            characterStat={dexterityStat}
            hasProf={acrobaticsProf}
            setHasProf={setAcrobaticsProf}
            pushToRollResultHistory={pushToHistory}
          />
          <CharacterSkillPanel
            skillName="Animal Handling"
            profBonus={profBonus}
            characterStat={wisdomStat}
            hasProf={animalHandlingProf}
            setHasProf={setAnimalHandlingProf}
            pushToRollResultHistory={pushToHistory}
          />
          <CharacterSkillPanel
            skillName="Arcana"
            profBonus={profBonus}
            characterStat={intelligenceStat}
            hasProf={arcanaProf}
            setHasProf={setArcanaProf}
            pushToRollResultHistory={pushToHistory}
          />
          <CharacterSkillPanel
            skillName="Athletics"
            profBonus={profBonus}
            characterStat={strengthStat}
            hasProf={athleticsProf}
            setHasProf={setAthleticsProf}
            pushToRollResultHistory={pushToHistory}
          />
          <CharacterSkillPanel
            skillName="Deception"
            profBonus={profBonus}
            characterStat={charismaStat}
            hasProf={deceptionProf}
            setHasProf={setDeceptionProf}
            pushToRollResultHistory={pushToHistory}
          />
          <CharacterSkillPanel
            skillName="History"
            profBonus={profBonus}
            characterStat={intelligenceStat}
            hasProf={historyProf}
            setHasProf={setHistoryProf}
            pushToRollResultHistory={pushToHistory}
          />
          <CharacterSkillPanel
            skillName="Insight"
            profBonus={profBonus}
            characterStat={wisdomStat}
            hasProf={insightProf}
            setHasProf={setInsightProf}
            pushToRollResultHistory={pushToHistory}
          />
          <CharacterSkillPanel
            skillName="Intimidation"
            profBonus={profBonus}
            characterStat={charismaStat}
            hasProf={intimidationProf}
            setHasProf={setIntimidationProf}
            pushToRollResultHistory={pushToHistory}
          />
          <CharacterSkillPanel
            skillName="Investigation"
            profBonus={profBonus}
            characterStat={intelligenceStat}
            hasProf={investigationProf}
            setHasProf={setInvestigationProf}
            pushToRollResultHistory={pushToHistory}
          />
          <CharacterSkillPanel
            skillName="Medicine"
            profBonus={profBonus}
            characterStat={wisdomStat}
            hasProf={medicineProf}
            setHasProf={setMedicineProf}
            pushToRollResultHistory={pushToHistory}
          />
          <CharacterSkillPanel
            skillName="Nature"
            profBonus={profBonus}
            characterStat={intelligenceStat}
            hasProf={natureProf}
            setHasProf={setNatureProf}
            pushToRollResultHistory={pushToHistory}
          />
          <CharacterSkillPanel
            skillName="Perception"
            profBonus={profBonus}
            characterStat={wisdomStat}
            hasProf={perceptionProf}
            setHasProf={setPerceptionProf}
            pushToRollResultHistory={pushToHistory}
          />
          <CharacterSkillPanel
            skillName="Performance"
            profBonus={profBonus}
            characterStat={charismaStat}
            hasProf={performanceProf}
            setHasProf={setPerformanceProf}
            pushToRollResultHistory={pushToHistory}
          />
          <CharacterSkillPanel
            skillName="Persuasion"
            profBonus={profBonus}
            characterStat={charismaStat}
            hasProf={persuasionProf}
            setHasProf={setPersuasionProf}
            pushToRollResultHistory={pushToHistory}
          />
          <CharacterSkillPanel
            skillName="Religion"
            profBonus={profBonus}
            characterStat={intelligenceStat}
            hasProf={religionProf}
            setHasProf={setReligionProf}
            pushToRollResultHistory={pushToHistory}
          />
          <CharacterSkillPanel
            skillName="Sleight of Hand"
            profBonus={profBonus}
            characterStat={dexterityStat}
            hasProf={sleightOfHandProf}
            setHasProf={setSleightOfHandProf}
            pushToRollResultHistory={pushToHistory}
          />
          <CharacterSkillPanel
            skillName="Stealth"
            profBonus={profBonus}
            characterStat={dexterityStat}
            hasProf={stealthProf}
            setHasProf={setStealthProf}
            pushToRollResultHistory={pushToHistory}
          />
          <CharacterSkillPanel
            skillName="Survival"
            profBonus={profBonus}
            characterStat={wisdomStat}
            hasProf={survivalProf}
            setHasProf={setSurvivalProf}
            pushToRollResultHistory={pushToHistory}
          />
        </table>
      </p>
      <p>
        <select>
          {rollResults.map((rollResult, idx) => {
            return (
              <option key={idx}>
                {rollResult.statName} {rollResult.rollType} Mod: {rollResult.totalModifier}, Roll: {rollResult.roll},
                Total: {rollResult.rollPlusModifier}
              </option>
            );
          })}
        </select>
      </p>
    </>
  );
}

export default CharacterSheet;
