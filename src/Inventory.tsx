import React, { useState } from 'react';
import { Armor, ArmorType, damageDiceType } from './DndTypes';


export default function Inventory() {
  const [newArmor, setNewArmor] = useState<boolean>(false);
  const [newWeapon, setNewWeapon] = useState<boolean>(false);
  const [armorName, setArmorName] = useState<string>("");
  const [armorCost, setArmorCost] = useState<number>(0);
  const [armorType, setArmorType] = useState<ArmorType>(ArmorType.Helm);
  const [baseArmorClass, setBaseArmorClass] = useState<number>(0);
  const [strReq, setStrReq] = useState<number | undefined>(0);
  const [stealthDis, setStealthDis] = useState<boolean>(false);
  const [armorWeight, setArmorWeight] = useState<number>(0);
  const [weapName, setWeapName] = useState<string>("");
  const [weapCost, setWeapCost] = useState<number>(0);
  const [weapDmgDiceCount, setWeapDmgDiceCount] = useState<number>(0);
  const [weapDmgDiceType, setWeapDmgDiceType] = useState<damageDiceType>(damageDiceType[0]);
  const [weapWeight, setWeapWeight] = useState<number>(0);
  const [weapHeavy, setWeapHeavy] = useState<boolean>(false);
  const [weapTwoHanded, setWeapTwoHanded] = useState<boolean>(false);
  const [weapLight, setWeapLight] = useState<boolean>(false);
  const [weapReach, setWeapReach] = useState<boolean>(false);

  return (
    <div >
      <button onClick={() => setNewArmor(!newArmor)}>New Armor</button>
        {newArmor &&(
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
      <button onClick={() => setNewWeapon(!newWeapon)}>New Weapon</button>
        {newWeapon &&(
          <p>
            <table>
              <tbody>
                <tr>
                  Name: <input type="statName" value={weapName} onChange={(e) => setWeapName(e.target.value)}/>
                </tr>
                <tr>
                  Cost: <input type="statName" value={weapCost} onChange={(e) => setWeapCost(parseInt(e.target.value))}/>
                </tr>
                <tr>
                  Damage Dice Count: <input type="statName" value={weapDmgDiceCount} onChange={(e) => setWeapDmgDiceCount(parseInt(e.target.value))}/>
                </tr>
                <tr>
                  {/* Damage Dice Type: <select value={weapDmgDiceType}
                  onChange={(e) => setWeapDmgDiceType()))}>
                    {Object.keys(weapDmgDiceType).map(dmgDiceType => {
                      return (
                        <option>
                          {dmgDiceType}
                        </option>
                      )
                    })}
                  </select> */}
                </tr>
              </tbody>
            </table>
          </p>
        )}
    </div>
  );
}