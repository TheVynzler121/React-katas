
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src="DandDDude.webp" className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>

        <ul>
          <li><a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React Hello World
          </a></li>
          <li><a
            className="App-link"
            href="https://www.google.com"
            target="_blank"
          >
            Let me google that for ya
          </a></li>
        </ul>
        <ul>
          <li>Apples</li>
          <li>Bananas</li>
          <li>Milk
            <ul>
              <li>2%</li>
              <li>Chocolate</li>
            </ul>
          </li>
        </ul>
      </header>
    </div>
  );
}

export default App;
