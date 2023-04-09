import React, { useState } from "react";
import { Armor, ArmorType, Weapon, damageDiceType } from "./DndTypes";
import { getAllArmorFromStore, getArmorFromStore, saveArmorToStore, saveWeaponToStore } from "./DndStorage";

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
  // const [weapCost, setWeapCost] = useState<number>(0);
  // const [weapDmgDiceCount, setWeapDmgDiceCount] = useState<number>(0);
  // const [weapDmgDiceType, setWeapDmgDiceType] = useState<damageDiceType>(damageDiceType[0]);
  // const [weapWeight, setWeapWeight] = useState<number>(0);
  // const [weapHeavy, setWeapHeavy] = useState<boolean>(false);
  // const [weapTwoHanded, setWeapTwoHanded] = useState<boolean>(false);
  // const [weapLight, setWeapLight] = useState<boolean>(false);
  // const [weapReach, setWeapReach] = useState<boolean>(false);

  const getArmorFromStorehandler = (armorName: string) => {
    let armor = getArmorFromStore(armorName);
    if (armor) {
      setArmorName(armor.name);
      setArmorCost(armor.cost);
      setArmorType(armor.itemType);
      setBaseArmorClass(armor.baseArmorClass);
      setStrReq(armor.strReq);
      setStealthDis(armor.stealthDisadvantage);
      setArmorWeight(armor.weight);
    }
  };

  const saveArmorToStoreHandler = () => {
    const armorState: Armor = {
      name: armorName,
      cost: armorCost,
      itemType: armorType,
      baseArmorClass: baseArmorClass,
      strReq: strReq,
      stealthDisadvantage: stealthDis,
      weight: armorWeight,
    };
    saveArmorToStore(armorState);
  };

  const saveWeaponToStoreHandler = () => {
    const weaponState: Weapon = {
      name: weapName,
    };
    saveWeaponToStore(weaponState)
  };

  return (
    <div>
      <select
        value={armorName}
        onChange={(e) => {
          const armorName = e.target.value;
          if (armorName !== "-----") {
            getArmorFromStorehandler(armorName);
          }
        }}
      >
        <option>-----</option>
        {Object.keys(getAllArmorFromStore()).map((armorName) => {
          return <option key={armorName}>{armorName}</option>;
        })}
      </select>
      <button onClick={() => setNewArmor(!newArmor)}>New Armor</button>
      {(newArmor || armorName) && (
        <>
          <table>
            <tbody>
              <tr>
                <td>
                  Name: <input type="statName" value={armorName} onChange={(e) => setArmorName(e.target.value)} />
                </td>
              </tr>
              <tr>
                <td>
                  Cost:{" "}
                  <input type="statName" value={armorCost} onChange={(e) => setArmorCost(parseInt(e.target.value))} />
                </td>
              </tr>
              <tr>
                <td>
                  <select value={armorType} onChange={(e) => setArmorType(e.target.value as any)}>
                    {Object.keys(ArmorType)
                      .filter((armrType) => !(parseInt(armrType) >= 0))
                      .map((armrType) => {
                        return <option key={armrType}>{armrType}</option>;
                      })}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  Base AC:{" "}
                  <input
                    type="statName"
                    value={baseArmorClass}
                    onChange={(e) => setBaseArmorClass(parseInt(e.target.value))}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  Strength Requirement:{" "}
                  <input type="statName" value={strReq} onChange={(e) => setStrReq(parseInt(e.target.value))} />
                </td>
              </tr>
              <tr>
                <td>
                  Stealth Disadvantage:{" "}
                  <input type="checkbox" checked={stealthDis} onChange={() => setStealthDis(!stealthDis)} />
                </td>
              </tr>
              <tr>
                <td>
                  Weight:{" "}
                  <input
                    type="statName"
                    value={armorWeight}
                    onChange={(e) => setArmorWeight(parseInt(e.target.value))}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <button
            onClick={() => {
              saveArmorToStoreHandler();
            }}
          >
            Save Armor
          </button>
        </>
      )}
      <button onClick={() => setNewWeapon(!newWeapon)}>New Weapon</button>
      {newWeapon && (
        <>
          <table>
            <tbody>
              <tr>
                <td>
                  Name: <input type="statName" value={weapName} onChange={(e) => setWeapName(e.target.value)} />
                </td>
              </tr>
              {/* 
                <tr>
                  Cost: <input type="statName" value={weapCost} onChange={(e) => setWeapCost(parseInt(e.target.value))}/>
                </tr>
                <tr>
                  Damage Dice Count: <input type="statName" value={weapDmgDiceCount} onChange={(e) => setWeapDmgDiceCount(parseInt(e.target.value))}/>
                </tr>
                <tr>
                  Damage Dice Type: <select value={weapDmgDiceType}
                  onChange={(e) => setWeapDmgDiceType()))}>
                    {Object.keys(weapDmgDiceType).map(dmgDiceType => {
                      return (
                        <option>
                          {dmgDiceType}
                        </option>
                      )
                    })}
                  </select>
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
                </tr>*/}
            </tbody>
          </table>
          <button
            onClick={() => {
              saveWeaponToStoreHandler();
            }}
          >
            Save Weapon
          </button>
        </>
      )}
    </div>
  );
}
