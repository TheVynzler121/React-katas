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

const groupBy = function(arr:any[], prop:any) {  //function with an array and prop (or "Key") as its parameters
  return arr.reduce((groups:any, item:any) => { // the parameters for the reduce. i.e. ("sum", "num")
    const val = item[prop] //new variable with the index ("Key") of item as its value
    groups[val] = groups[val] || [] // edge case checking for a filled array or an empty one
    groups[val].push(item) //add item to the end of groups['armor']
    return groups // loop back to the start of the reduce with the new "sum"
  }, {}) //the initial value, also known as Seed
}
//groupBy(allItems("arr"), 'item'("prop"))
//allItems.reduce((groups("sum"), item("num")){
//  const value = "num"['item'] >>> value = 'armor'
//  "sum"['armor'] = "sum"['armor'] or Empty array
//  "sum"['armor'].push(item)
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

  const itemsToOptions = (items:Item[]) => { //takes an array of "Item" type
    return items.map(item=>item.name).map(toOption); //maps all the item name's as options
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
        Object.values(getAllItemsFromStore()) //gets the values from getAllItemsFromStore
          .map((item:Item) => { //maps the values as Item Type
            return <option key={item.name}>{item.name} {item.item}</option> //renders the name of the item then its type i.e. "Weapon" 
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
