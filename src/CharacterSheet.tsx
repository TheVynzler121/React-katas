import './CharacterSheet.css';
import CharacterStatRow from './CharacterStatRow';


function CharacterSheet() {


  return (
    <>

      <table>
        <tr>
          <th>Stat</th>
          <th>Value</th>
          <th>Base Mod</th>
          <th>Bonus Mod</th>
          <th>Total Mod</th>
        </tr>
        <CharacterStatRow statName={"Strength"} />
        <CharacterStatRow statName={"Dexterity"} />
        <CharacterStatRow statName={"Constitution"} />
        <CharacterStatRow statName={"Intelligence"} />
        <CharacterStatRow statName={"Wisdom"} />
        <CharacterStatRow statName={"Charisma"} />
      </table>
    </>
  );
}

export default CharacterSheet;
