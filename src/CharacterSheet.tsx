import { useState } from "react";
import "./CharacterSheet.css";
import CharacterSkillPanel from "./CharacterSkillPanel";
import CharacterStatRow from "./CharacterStatRow";
import { calculateBaseModifier } from "./DndHelpers";

// a child component can't call a parent function, unless it is given the function as a callback
// && returns the last element if the first is true

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
  const [showStats, setShowStats] = useState<boolean>(true);
  const [showSkills, setShowSkills] = useState<boolean>(true);

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
      <button onClick={() => setShowStats(!showStats)}>Toggle Stats</button>
      {showStats && (
        <table>
          <tr>
            <th></th>
            <th>Stat</th>
            <th>Value</th>
            <th>Base Mod</th>
            <th>Bonus Mod</th>
          </tr>
          {[
            { stat: strengthStat, setStat: setStrengthStat },
            { stat: dexterityStat, setStat: setDexterityStat },
            { stat: constitutionStat, setStat: setConstitutionStat },
            { stat: intelligenceStat, setStat: setIntelligenceStat },
            { stat: wisdomStat, setStat: setWisdomStat },
            { stat: charismaStat, setStat: setCharismaStat },
          ].map(({ stat, setStat }) => {
            return (
              <CharacterStatRow
                characterStat={stat}
                setCharacterStat={setStat}
                pushToRollResultHistory={pushToHistory}
                profBonus={profBonus}
              />
            );
          })}
        </table>
      )}
      <p>
        Proficiency Bonus:
        {/* one tag close if there is nothing in between. See line 18 vs 30-33  */}
        <input
          className="statInput"
          type="number"
          onChange={(e) => setProfBonus(parseInt(e.target.value))}
          value={profBonus}
        />
        <button onClick={() => setShowSkills(!showSkills)}>Toggle Skills</button>
      </p>
      <p>
        {showSkills && (
          <table>
            {[
              { name: "Acrobatics", stat: dexterityStat, prof: acrobaticsProf, setProf: setAcrobaticsProf },
              { name: "Animal Handling", stat: wisdomStat, prof: animalHandlingProf, setProf: setAnimalHandlingProf, },
              { name: "Arcana", stat: intelligenceStat, prof: arcanaProf, setProf: setArcanaProf, },
              { name: "Athletics", stat: strengthStat, prof: athleticsProf, setProf: setAthleticsProf, },
              { name: "Deception", stat: charismaStat, prof: deceptionProf, setProf: setDeceptionProf, },
              { name: "History", stat: intelligenceStat, prof: historyProf, setProf: setHistoryProf, },
              { name: "Insight", stat: wisdomStat, prof: insightProf, setProf: setInsightProf, },
              { name: "Intimidation", stat: charismaStat, prof: intimidationProf, setProf: setIntimidationProf, },
              { name: "Investigation", stat: intelligenceStat, prof: investigationProf, setProf: setInvestigationProf, },
              { name: "Medicine", stat: wisdomStat, prof: medicineProf, setProf: setMedicineProf, },
              { name: "Nature", stat: intelligenceStat, prof: natureProf, setProf: setNatureProf, },
              { name: "Perception", stat: wisdomStat, prof: perceptionProf, setProf: setPerceptionProf, },
              { name: "Performance", stat: charismaStat, prof: performanceProf, setProf: setPerformanceProf, },
              { name: "Persuasion", stat: charismaStat, prof: persuasionProf, setProf: setPersuasionProf, },
              { name: "Religion", stat: intelligenceStat, prof: religionProf, setProf: setReligionProf, },
              { name: "Sleight of Hand", stat: dexterityStat, prof: sleightOfHandProf, setProf: setSleightOfHandProf, },
              { name: "Stealth", stat: dexterityStat, prof: stealthProf, setProf: setStealthProf, },
              { name: "Survival", stat: wisdomStat, prof: survivalProf, setProf: setSurvivalProf, },
            ].map(({ name, stat, prof, setProf }) => {
              return (
                <CharacterSkillPanel
                  skillName={name}
                  profBonus={profBonus}
                  characterStat={stat}
                  hasProf={prof}
                  setHasProf={setProf}
                  pushToRollResultHistory={pushToHistory}
                />
              );
            })}
          </table>
        )}
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
