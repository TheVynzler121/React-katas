import {useState} from 'react';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);

  console.log("Rendering", counter); 
  return (
    <div className="App">
      <header className="App-header">
        {counter}
        <p>
          <button className="horse" onClick={() => {
            console.log("clicked!");
            
            setCounter(counter - 2);
            }}
            >Click me</button>
        </p>
      </header>
    </div>
  );
}

export default App;
