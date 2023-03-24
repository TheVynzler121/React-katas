import React from 'react';
import './App.css';
import CharacterSheet from './CharacterSheet';
import DndAdminPanel from './DndAdminPanel';
import Inventory from './Inventory';
import {
  Routes,
  Route,
  BrowserRouter,
  NavLink,
  useLocation
} from "react-router-dom";

function App() {
  const links = [
    ['/', "Character Sheet"],
    ["/inventory", "Inventory Management"] 
  ];

  return (
    <>
      <BrowserRouter>
        <nav className="navbar">
          <ul className="menu">
            {links.map(([path, name]) => {
              return (
              <li className="menuItem" key={name}>
                      <NavLink
                        to={path}
                        className={({ isActive }) => isActive ? "active" : "" } 
                      > 
                        {name}
                      </NavLink>
                </li>);
            })}
          </ul>
        </nav>
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route path="/" element={<DndAdminPanel/>}/>
              <Route path="/inventory" element={<Inventory/>}/>
            </Routes>
          </header>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
