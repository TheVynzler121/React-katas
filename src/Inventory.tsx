import React, { useState } from "react";
import { Item,Armor, ArmorType, Weapon, damageDiceType } from "./DndTypes";
import {
  getAllItemsFromStore,
  getItemFromStore,
  saveItemToStore,
} from "./DndStorage";
import WeaponForm from "./Weapon";
import ArmorForm from "./Armor";

export default function Inventory() {
  const [currentItem, setCurrentItem] = useState<Item|undefined>(undefined);
  const [newArmor, setNewArmor] = useState<boolean>(false);
  const [newWeapon, setNewWeapon] = useState<boolean>(false);
  
  const getItemFromStorehandler = (itemName: string) => {
    let item = getItemFromStore(itemName);
    setCurrentItem(item);
    setNewArmor(false);
    setNewWeapon(false);
  };

  const onNewArmorHandler = () => {
    setNewArmor(!newArmor);
    setNewWeapon(false);
    setCurrentItem(undefined);
  };

  const onNewWeaponHandler = () =>{
    setNewWeapon(!newWeapon);
    setNewArmor(false);
    setCurrentItem(undefined);
  };

  console.log('currentItem', currentItem);
  console.log('newArmor', newArmor);
  console.log('newWeapon', newWeapon);
  return (
    <div>
      <select
        key={'select' + currentItem?.name}
        value={currentItem?.name}
        onChange={(e) => {
          const itemName = e.target.value;
          if (itemName !== "-----") {
            getItemFromStorehandler(itemName);
          }
        }}
      >
        <option>-----</option>
        {Object.keys(getAllItemsFromStore()).map((itemName) => {
          return <option key={itemName}>{itemName}</option>;
        })}
      </select>
      <button onClick={onNewArmorHandler}>New Armor</button>
      <button onClick={onNewWeaponHandler}>New Weapon</button>
      {(newArmor || currentItem?.item === "armor") && ( <ArmorForm key={'armor'+currentItem?.name} armor={currentItem as Armor}/>)}
      {(newWeapon || currentItem?.item === "weapon") && ( <WeaponForm key={'weapon'+currentItem?.name}  weapon={currentItem as Weapon}/>)}
    </div>
  );
}
