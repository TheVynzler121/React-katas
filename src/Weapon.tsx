
import React, { useState } from "react";
import { Weapon, DamageDiceType, damageDiceOptions } from "./DndTypes";
import { saveItemToStore } from "./DndStorage";
import { toOption } from "./DndHelpers";

export interface WeaponProps {
	weapon: Weapon | undefined
}

export default function WeaponForm({weapon} : WeaponProps) {
	const [weaponName, setWeaponName] = useState<string>(weapon?.name || "");
	const [weaponCost, setWeaponCost] = useState<number>(weapon?.cost || 0);

  const [weaponDmgDiceCount, setWeapDmgDiceCount] = useState<number>(0);
  const [weaponDmgDiceType, setWeapDmgDiceType] = useState<DamageDiceType>(4);
  const [weaponWeight, setWeapWeight] = useState<number>(0);
  // const [weapHeavy, setWeapHeavy] = useState<boolean>(false);
  // const [weapTwoHanded, setWeapTwoHanded] = useState<boolean>(false);
  // const [weapLight, setWeapLight] = useState<boolean>(false);
  // const [weapReach, setWeapReach] = useState<boolean>(false);

	const saveWeaponToStoreHandler = () => {
		const weaponState: Weapon = {
		item: "weapon",
		name: weaponName,
		cost: weaponCost,
    damageDiceCount: weaponDmgDiceCount,
    damageDiceType: weaponDmgDiceType,
    weight: weaponWeight,
		};
		saveItemToStore(weaponState);
	};


	return (<>
          <table>
            <tbody>
              <tr>
                <td>
                  Name: <input type="statName" value={weaponName} onChange={(e) => setWeaponName(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td>
                  Cost:{" "}
                  <input type="statName" value={weaponCost} onChange={(e) => setWeaponCost( parseInt( e.target.value)) } />
                </td>
              </tr>
              <tr>
                <td>
                  Damage Dice Count: <input type="statName" value={weaponDmgDiceCount} onChange={(e) => setWeapDmgDiceCount(parseInt(e.target.value))}/>
                </td>
              </tr>
              <tr>
                <td>
                  Damage Dice Type: 
                  <select value={weaponDmgDiceType}
                    onChange={(e) => setWeapDmgDiceType(parseInt(e.target.value) as DamageDiceType)}>
                    {damageDiceOptions.map(toOption)}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  Weight: <input type="statName" value={weaponWeight} onChange={(e) => setWeapWeight(parseInt(e.target.value))}/>
                </td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => saveWeaponToStoreHandler()}>
            Save Weapon
          </button>
	
	</>);
}

              /* 
                
                
                
                <tr>
                  Heavy: <input type="checkbox" checked={weapHeavy} onChange={() => setWeapHeavy(!weapHeavy)}/>
                </tr>
                <tr>
                  Two Handed: <input type="checkbox" checked={weapTwoHanded} onChange={() => setWeapTwoHanded(!weapTwoHanded)}/>
                </tr>
                <tr>
                  Light: <input type="checkbox" checked={weapLight} onChange={() => setWeapLight(!weapLight)}/>
                </tr>
                <tr>
                  Reach: <input type="checkbox" checked={weapReach} onChange={() => setWeapReach(!weapReach)}/>
                </tr>*/