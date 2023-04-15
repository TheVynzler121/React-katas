import React, { useState } from "react";
import { Weapon, DamageDiceType, damageDiceOptions } from "./DndTypes";
import { saveItemToStore } from "./DndStorage";
import { toOption } from "./DndHelpers";

export interface WeaponProps {
  weapon: Weapon | undefined;
}

export default function WeaponForm({ weapon }: WeaponProps) {
  const [weaponName, setWeaponName] = useState<string>(weapon?.name || "");
  const [weaponCost, setWeaponCost] = useState<number>(weapon?.cost || 0);

  const [weaponDmgDiceCount, setWeapDmgDiceCount] = useState<number>(weapon?.damageDiceCount || 0);
  const [weaponDmgDiceType, setWeapDmgDiceType] = useState<DamageDiceType>(weapon?.damageDiceType || 4);
  const [weaponWeight, setWeapWeight] = useState<number>(weapon?.weight || 0);
  const [weapHeavy, setWeapHeavy] = useState<boolean>(weapon?.heavy || false);
  const [weapTwoHanded, setWeapTwoHanded] = useState<boolean>(weapon?.twoHanded || false);
  const [weapLight, setWeapLight] = useState<boolean>(weapon?.light || false);
  const [weapReach, setWeapReach] = useState<boolean>(weapon?.reach || false);

  const saveWeaponToStoreHandler = () => {
    const weaponState: Weapon = {
      item: "weapon",
      name: weaponName,
      cost: weaponCost,
      damageDiceCount: weaponDmgDiceCount,
      damageDiceType: weaponDmgDiceType,
      weight: weaponWeight,
      heavy: weapHeavy,
      twoHanded: weapTwoHanded,
      light: weapLight,
      reach: weapReach,
    };
    saveItemToStore(weaponState);
  };

  return (
    <>
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
              <input type="statName" value={weaponCost} onChange={(e) => setWeaponCost(parseInt(e.target.value))} />
            </td>
          </tr>
          <tr>
            <td>
              Damage Dice Count:{" "}
              <input
                type="statName"
                value={weaponDmgDiceCount}
                onChange={(e) => setWeapDmgDiceCount(parseInt(e.target.value))}
              />
            </td>
          </tr>
          <tr>
            <td>
              Damage Dice Type:
              <select
                value={weaponDmgDiceType}
                onChange={(e) => setWeapDmgDiceType(parseInt(e.target.value) as DamageDiceType)}
              >
                {damageDiceOptions.map(toOption)}
              </select>
            </td>
          </tr>
          <tr>
            <td>
              Weight:{" "}
              <input type="statName" value={weaponWeight} onChange={(e) => setWeapWeight(parseInt(e.target.value))} />
            </td>
          </tr>
          <tr>
            <td>
              Heavy: <input type="checkbox" checked={weapHeavy} onChange={() => setWeapHeavy(!weapHeavy)} />
            </td>
          </tr>
          <tr>
            <td>
              Two Handed:{" "}
              <input type="checkbox" checked={weapTwoHanded} onChange={() => setWeapTwoHanded(!weapTwoHanded)} />
            </td>
          </tr>
          <tr>
            <td>
              Light: <input type="checkbox" checked={weapLight} onChange={() => setWeapLight(!weapLight)} />
            </td>
          </tr>
          <tr>
            <td>
              Reach: <input type="checkbox" checked={weapReach} onChange={() => setWeapReach(!weapReach)} />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => saveWeaponToStoreHandler()}>Save Weapon</button>
    </>
  );
}

