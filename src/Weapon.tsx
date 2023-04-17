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

  const [weaponDmgDiceCount, setWeaponDmgDiceCount] = useState<number>(weapon?.damageDiceCount || 0);
  const [weaponDmgDiceType, setWeaponDmgDiceType] = useState<DamageDiceType>(weapon?.damageDiceType || 4);
  const [weaponWeight, setWeaponWeight] = useState<number>(weapon?.weight || 0);
  const [weaponHeavy, setWeaponHeavy] = useState<boolean>(weapon?.heavy || false);
  const [weaponTwoHanded, setWeaponTwoHanded] = useState<boolean>(weapon?.twoHanded || false);
  const [weaponLight, setWeaponLight] = useState<boolean>(weapon?.light || false);
  const [weaponReach, setWeaponReach] = useState<boolean>(weapon?.reach || false);

  const saveWeaponToStoreHandler = () => {
    const weaponState: Weapon = {
      item: "weapon",
      name: weaponName,
      cost: weaponCost,
      damageDiceCount: weaponDmgDiceCount,
      damageDiceType: weaponDmgDiceType,
      weight: weaponWeight,
      heavy: weaponHeavy,
      twoHanded: weaponTwoHanded,
      light: weaponLight,
      reach: weaponReach,
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
                onChange={(e) => setWeaponDmgDiceCount(parseInt(e.target.value))}
              />
            </td>
          </tr>
          <tr>
            <td>
              Damage Dice Type:
              <select
                value={weaponDmgDiceType}
                onChange={(e) => setWeaponDmgDiceType(parseInt(e.target.value) as DamageDiceType)}
              >
                {damageDiceOptions.map(toOption)}
              </select>
            </td>
          </tr>
          <tr>
            <td>
              Weight:{" "}
              <input type="statName" value={weaponWeight} onChange={(e) => setWeaponWeight(parseInt(e.target.value))} />
            </td>
          </tr>
          <tr>
            <td>
              Heavy: <input type="checkbox" checked={weaponHeavy} onChange={() => setWeaponHeavy(!weaponHeavy)} />
            </td>
          </tr>
          <tr>
            <td>
              Two Handed:{" "}
              <input type="checkbox" checked={weaponTwoHanded} onChange={() => setWeaponTwoHanded(!weaponTwoHanded)} />
            </td>
          </tr>
          <tr>
            <td>
              Light: <input type="checkbox" checked={weaponLight} onChange={() => setWeaponLight(!weaponLight)} />
            </td>
          </tr>
          <tr>
            <td>
              Reach: <input type="checkbox" checked={weaponReach} onChange={() => setWeaponReach(!weaponReach)} />
            </td>
          </tr>
        </tbody>
      </table>
      <button onClick={() => saveWeaponToStoreHandler()}>Save Weapon</button>
    </>
  );
}

