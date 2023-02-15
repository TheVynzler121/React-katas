import {useState} from 'react';
import Dice from './Dice.tsx';
import './App.css';
import AddSub from './AddSub.tsx';
import CharacterSheet from './CharacterSheet.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CharacterSheet/>
        {/* <AddSub /> */}
        {/* <Dice /> */}
      </header>
    </div>
  );
}

export default App;
