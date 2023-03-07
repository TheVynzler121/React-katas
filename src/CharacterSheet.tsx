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
        <ul>
          <li>
            <CharacterSkillPanel
              skillName="Acrobatics"
              profBonus={profBonus}
              characterStat={dexterityStat}
              hasProf={acrobaticsProf}
              setHasProf={setAcrobaticsProf}
              pushToRollResultHistory={pushToHistory}
            />
          </li>
          <li>
            <CharacterSkillPanel
              skillName="Animal Handling"
              profBonus={profBonus}
              characterStat={wisdomStat}
              hasProf={animalHandlingProf}
              setHasProf={setAnimalHandlingProf}
              pushToRollResultHistory={pushToHistory}
            />
          </li>
          <li>
            <CharacterSkillPanel
              skillName="Arcana"
              profBonus={profBonus}
              characterStat={intelligenceStat}
              hasProf={arcanaProf}
              setHasProf={setArcanaProf}
              pushToRollResultHistory={pushToHistory}
            />
          </li>
          <li>
            <CharacterSkillPanel
              skillName="Athletics"
              profBonus={profBonus}
              characterStat={strengthStat}
              hasProf={athleticsProf}
              setHasProf={setAthleticsProf}
              pushToRollResultHistory={pushToHistory}
            />
          </li>
          <li>
            <CharacterSkillPanel
              skillName="Deception"
              profBonus={profBonus}
              characterStat={charismaStat}
              hasProf={deceptionProf}
              setHasProf={setDeceptionProf}
              pushToRollResultHistory={pushToHistory}
            />
          </li>
          <li>
            <CharacterSkillPanel
              skillName="History"
              profBonus={profBonus}
              characterStat={intelligenceStat}
              hasProf={historyProf}
              setHasProf={setHistoryProf}
              pushToRollResultHistory={pushToHistory}
            />
          </li>
          <li>
            <CharacterSkillPanel
              skillName="Insight"
              profBonus={profBonus}
              characterStat={wisdomStat}
              hasProf={insightProf}
              setHasProf={setInsightProf}
              pushToRollResultHistory={pushToHistory}
            />
          </li>
          <li>
            <CharacterSkillPanel
              skillName="Intimidation"
              profBonus={profBonus}
              characterStat={charismaStat}
              hasProf={intimidationProf}
              setHasProf={setIntimidationProf}
              pushToRollResultHistory={pushToHistory}
            />
          </li>
          <li>
            <CharacterSkillPanel
              skillName="Investigation"
              profBonus={profBonus}
              characterStat={intelligenceStat}
              hasProf={investigationProf}
              setHasProf={setInvestigationProf}
              pushToRollResultHistory={pushToHistory}
            />
          </li>
        </ul>
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
