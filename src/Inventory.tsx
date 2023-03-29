import React, { useState } from 'react';
import { Armor, ArmorType } from './DndTypes';


export default function Inventory() {
  const [newItem, setNewItem] = useState<boolean>(false);
  const [armorName, setArmorName] = useState<string>("");
  const [armorCost, setArmorCost] = useState<number>(0);
  const [armorType, setArmorType] = useState<ArmorType>(ArmorType.Helm);
  const [baseArmorClass, setBaseArmorClass] = useState<number>(0);
  const [strReq, setStrReq] = useState<number | undefined>(0);
  const [stealthDis, setStealthDis] = useState<boolean>(false);
  const [armorWeight, setArmorWeight] = useState<number>(0);

  return (
    <div >
      <button onClick={() => setNewItem(!newItem)}>New Item</button>
        {newItem &&(
        <p>
          <table>
            <tbody>
              <tr>
                Name: <input type="statName" value={armorName} onChange={(e) => setArmorName(e.target.value)}/>
              </tr>
              <tr>
                Cost: <input type="statName" value={armorCost} onChange={(e) => setArmorCost(parseInt(e.target.value))}/>
              </tr>
              <tr>
                <select value={armorType}
                onChange={(e) => setArmorType(e.target.value as any)}>
                  {Object.keys(ArmorType).filter(armrType => !(parseInt(armrType)>=0)).map(armrType => {
                    return (
                      <option>
                        {armrType}
                      </option>
                    )
                  })}
                </select>
              </tr>
              <tr>
                Base AC: <input type="statName" value={baseArmorClass} onChange={(e) => setBaseArmorClass(parseInt(e.target.value))}/>
              </tr>
              <tr>
                Strength Requirement: <input type="statName" value={strReq} onChange={(e) => setStrReq(parseInt(e.target.value))}/>
              </tr>
              <tr>
                Stealth Disadvantage: <input type="checkbox" checked={stealthDis} onChange={() => setStealthDis(!stealthDis)}/>
              </tr>
              <tr>
                Weight: <input type="statName" value={armorWeight} onChange={(e) => setArmorWeight(parseInt(e.target.value))}/>
              </tr>
            </tbody>
          </table>
        </p>
        )}
    </div>
  );
}