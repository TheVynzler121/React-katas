import { useState } from "react";
import "./CharacterSheet.css";
import CharacterSkillPanel from "./CharacterSkillPanel";
import CharacterStatRow from "./CharacterStatRow";
import { CharacterSheetState, CharacterStat, RollResult } from "./DndTypes";

// a child component can't call a parent function, unless it is given the function as a callback
// '&&' returns the last element if the first is true

const defaultStat = { //objects can hold anything, and it'll work as long as it has the interface shape. they are like flexible dictionaries
  statName : "",
  abilityScore: 10,
  bonusMod: 0,
  profBonusCheckbox: false,
 };

function CharacterSheet(props: {
  characterSheet: CharacterSheetState;
  saveToStore: (characterSheetState:CharacterSheetState) => void;
}) {
  const [rollResults, setRollResults] = useState<RollResult[]>(props.characterSheet.rollResults);
  const [profBonus, setProfBonus] = useState<number>(props.characterSheet.profBonus); //useState to remember user input
  const [strengthStat, setStrengthStat] = useState<CharacterStat>(props.characterSheet.strengthStat);
  const [dexterityStat, setDexterityStat] = useState<CharacterStat>(props.characterSheet.dexterityStat);
  const [constitutionStat, setConstitutionStat] = useState<CharacterStat>(props.characterSheet.constitutionStat);
  const [intelligenceStat, setIntelligenceStat] = useState<CharacterStat>(props.characterSheet.intelligenceStat);
  const [wisdomStat, setWisdomStat] = useState<CharacterStat>(props.characterSheet.wisdomStat);
  const [charismaStat, setCharismaStat] = useState<CharacterStat>(props.characterSheet.charismaStat);
  const [acrobaticsProf, setAcrobaticsProf] = useState<boolean>(props.characterSheet.acrobaticsProf);
  const [animalHandlingProf, setAnimalHandlingProf] = useState<boolean>(props.characterSheet.animalHandlingProf);
  const [arcanaProf, setArcanaProf] = useState<boolean>(props.characterSheet.arcanaProf);
  const [athleticsProf, setAthleticsProf] = useState<boolean>(props.characterSheet.athleticsProf);
  const [deceptionProf, setDeceptionProf] = useState<boolean>(props.characterSheet.deceptionProf);
  const [historyProf, setHistoryProf] = useState<boolean>(props.characterSheet.historyProf);
  const [insightProf, setInsightProf] = useState<boolean>(props.characterSheet.insightProf);
  const [intimidationProf, setIntimidationProf] = useState<boolean>(props.characterSheet.intimidationProf);
  const [investigationProf, setInvestigationProf] = useState<boolean>(props.characterSheet.investigationProf);
  const [medicineProf, setMedicineProf] = useState<boolean>(props.characterSheet.medicineProf);
  const [natureProf, setNatureProf] = useState<boolean>(props.characterSheet.natureProf);
  const [perceptionProf, setPerceptionProf] = useState<boolean>(props.characterSheet.perceptionProf);
  const [performanceProf, setPerformanceProf] = useState<boolean>(props.characterSheet.performanceProf);
  const [persuasionProf, setPersuasionProf] = useState<boolean>(props.characterSheet.persuasionProf);
  const [religionProf, setReligionProf] = useState<boolean>(props.characterSheet.religionProf);
  const [sleightOfHandProf, setSleightOfHandProf] = useState<boolean>(props.characterSheet.sleightOfHandProf);
  const [stealthProf, setStealthProf] = useState<boolean>(props.characterSheet.stealthProf);
  const [survivalProf, setSurvivalProf] = useState<boolean>(props.characterSheet.survivalProf);
  const [showStats, setShowStats] = useState<boolean>(true);
  const [showSkills, setShowSkills] = useState<boolean>(true);

  const pushToHistory = (r: RollResult) => {
    let rollResultsWithNewRoll = [r, ...rollResults];
    setRollResults(rollResultsWithNewRoll);
  };

  const saveToStoreHandler = () => {
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
      props.saveToStore(characterSheetState)
  }
  

  return (
    <>
      <p>
        <button
          onClick={() => {
            saveToStoreHandler();
          }}
        >
          {" "}
          Save In Store{" "}
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
