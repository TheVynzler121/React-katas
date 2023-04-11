
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

  // const [weapDmgDiceCount, setWeapDmgDiceCount] = useState<number>(0);
  const [weapDmgDiceType, setWeapDmgDiceType] = useState<DamageDiceType>(4);
  // const [weapWeight, setWeapWeight] = useState<number>(0);
  // const [weapHeavy, setWeapHeavy] = useState<boolean>(false);
  // const [weapTwoHanded, setWeapTwoHanded] = useState<boolean>(false);
  // const [weapLight, setWeapLight] = useState<boolean>(false);
  // const [weapReach, setWeapReach] = useState<boolean>(false);

	const saveWeaponToStoreHandler = () => {
		const weaponState: Weapon = {
		item: "weapon",
		name: weaponName,
		cost: weaponCost,
    damageDiceType: weapDmgDiceType,
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
                  Damage Dice Type: 
                  <select value={weapDmgDiceType}
                    onChange={(e) => setWeapDmgDiceType(parseInt(e.target.value) as DamageDiceType)}>
                    {damageDiceOptions.map(toOption)}
                  </select>
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
                  Damage Dice Count: <input type="statName" value={weapDmgDiceCount} onChange={(e) => setWeapDmgDiceCount(parseInt(e.target.value))}/>
                </tr>
                
                <tr>
                  Weight: <input type="statName" value={weapWeight} onChange={(e) => setWeapWeight(parseInt(e.target.value))}/>
                </tr>
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