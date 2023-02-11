import {useState} from 'react';
import Dice from './Dice.tsx';
import './App.css';
import AddSub from './AddSub.tsx';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <AddSub />
        <Dice />
      </header>
    </div>
  );
}

export default App;
