import React, { useState } from "react";
import { Armor, ArmorType } from "./DndTypes";
import { saveItemToStore } from "./DndStorage";

export interface ArmorProps {
  armor: Armor | undefined;
}

export default function ArmorForm({ armor }: ArmorProps) {
  const [armorName, setArmorName] = useState<string>(armor?.name || "");
  const [armorCost, setArmorCost] = useState<number>(armor?.cost || 0);
  const [armorType, setArmorType] = useState<ArmorType>(armor?.armorType || ArmorType.Helm);
  const [baseArmorClass, setBaseArmorClass] = useState<number>(armor?.baseArmorClass || 0);
  const [strReq, setStrReq] = useState<number | undefined>(armor?.strReq || 0);
  const [stealthDis, setStealthDis] = useState<boolean>(armor?.stealthDisadvantage || false);
  const [armorWeight, setArmorWeight] = useState<number>(armor?.weight || 0);

  const saveArmorToStoreHandler = () => {
    const armorState: Armor = {
      item: "armor",
      name: armorName,
      cost: armorCost,
      armorType: armorType,
      baseArmorClass: baseArmorClass,
      strReq: strReq,
      stealthDisadvantage: stealthDis,
      weight: armorWeight,
    };
    saveItemToStore(armorState);
  };

  return (
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
              Cost: <input type="statName" value={armorCost} onChange={(e) => setArmorCost(parseInt(e.target.value))} />
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
              <input type="statName" value={armorWeight} onChange={(e) => setArmorWeight(parseInt(e.target.value))} />
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
  );
}
