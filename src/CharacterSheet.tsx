import React, { useState } from 'react';
import { rollDice } from './DiceHelpers.tsx';
import { calculateBaseModifier } from './DndHelpers.tsx';

function CharacterSheet() {
  
  const [str, setStr] = useState(0);
  

  return (
    <>
      <p>
        Strength: <input type='number' onChange={(e) => {setStr(parseInt(e.target.value))}} value={str} />
        +{calculateBaseModifier(str)}
      </p>
    </>
  );
}

export default CharacterSheet;
