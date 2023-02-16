import React, { useState } from 'react';
import { rollDice } from './DiceHelpers';
import { calculateBaseModifier } from './DndHelpers';

function CharacterSheet() {
  
  const [str, setStr] = useState(10);
  let strMod = calculateBaseModifier(str);

  

  return (
    <>
      <p>
        Strength: 
        <input type='number' onChange={(e) => {setStr(parseInt(e.target.value))}} value={str} />
        {strMod > 0 ? "+" : ""}
        {strMod}
      </p>
    </>
  );
}

export default CharacterSheet;
