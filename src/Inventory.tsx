import React, { useState } from "react";
import { Item,Armor, ArmorType, Weapon, damageDiceOptions } from "./DndTypes";
import {
  getAllItemsFromStore,
  getItemFromStore,
  saveItemToStore,
} from "./DndStorage";
import WeaponForm from "./Weapon";
import ArmorForm from "./Armor";
import { toOption } from "./DndHelpers";

const groupBy = function(arr:any, prop:any) {  //function with array as any type, prop as any type as its parameters
  return arr.reduce(function(groups:any, item:any) { // setting a 'key' and 'value'
    const val = item[prop] //new variable with the index '(prop)' of item
    groups[val] = groups[val] || [] // ??? groups[item[prop]] is truthy or empty?
    groups[val].push(item) //add item to the end of groups[item[prop]]
    return groups
  }, {})
}
//groupBy(allItems, 'armor')
//allItems.reduce((groups, item){
//  const value = item['armor']
//  groups[item['armor']] = groups[item['armor']] or Empty array?
//  groups[item['armor']].push(item)
//}
//)

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

  const allItems = Object.values(getAllItemsFromStore());
  const itemsGroupedByItemType = groupBy(allItems, 'item');

  const itemsToOptions = (items:Item[]) => {
    return items.map(item=>item.name).map(toOption);
  };

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
        { 
        Object.values(getAllItemsFromStore())
          .map((item:Item) => {
            return <option key={item.name}>{item.name} {item.item}</option>
          }) 
        }
      </select>
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
        { Object.entries(itemsGroupedByItemType)
          .map(([group, items]:[string,any]) => {
            return (
              <optgroup label={group}>
                {itemsToOptions(items as Item[])}
              </optgroup>
            )
          }
        )}
      </select>
      <button onClick={onNewArmorHandler}>New Armor</button>
      <button onClick={onNewWeaponHandler}>New Weapon</button>
      {(newArmor || currentItem?.item === "armor") && ( <ArmorForm key={'armor'+currentItem?.name} armor={currentItem as Armor}/>)}
      {(newWeapon || currentItem?.item === "weapon") && ( <WeaponForm key={'weapon'+currentItem?.name}  weapon={currentItem as Weapon}/>)}
    </div>
  );
}
