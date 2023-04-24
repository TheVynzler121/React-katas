import _ from "lodash";


export const calculateBaseModifier = (stat: number) => {
    
    if(stat === 10 || stat === 11){
        return 0;
    }
    return Math.floor((stat - 10) / 2);
};

export const formatMod = (mod: number) => {
    if(mod > 0){
        return `+${mod}`;
    }
    
    if(mod < 0){
        return `${mod}`;
    }

    return "";
};

export const toOption = (x:any) => <option key={x}> { x } </option>; //helper function to fill in options


export const add5 = (nums: number[]) => {
    return nums.map(number => number += 5);
};

export const add5KeepOver6 = (nums: number[]) => {
    return nums.map(num => num += 5).filter(num => num > 6)
};

export const sub7KeepUnder5 = (nums: number[]) => {
    return nums.map(number => number -= 7).filter(number => number < 5);
};

export const reverseStringArray = (sArray: string[]) => {
    
    return sArray.map(sArray.pop, [...sArray]);
};

export function ContainsDupes(nums: number[]): boolean  {
    let countingArray = [] as any;
    
    for (let index = 0; index < nums.length; index++) {
        const element = nums[index];
        if(countingArray[element]){
            return true;
        }
        countingArray[element] = 1;
    }
    return false;
};

export function ReverseString(input: string[]): string[] {
    let reversedString = [] as any;
    input.forEach(letter => {
        reversedString.splice(0, 0, letter)
    })
    return reversedString;
};

export function TwoSum(nums: number[], target: number): number[]{
    let loopLength = nums.length;
    let retArray = [];
    for (let index = 0; index < loopLength; index++) {
        for (let index2 = index + 1; index < loopLength; index++) {
            if(nums[index] + nums[index2] === target){
                retArray.push(index, index2);
            }
        }
    }
    return retArray;
}

export function PlusOne(inputNums: number[]): number[] {
    
    for (let i = inputNums.length - 1; i >= 0; i--) {
        if(inputNums[i] === 9){
            inputNums[i] = 0;
        }  else {
            inputNums[i]++;
            return inputNums;
        }
    }
    let firstOne = [1] as number[]
    return firstOne.concat(inputNums)
}

export function SingleNumber(nums: number[]): number {
    if(nums.length === 1) return nums[0];

    for (let i = 0; i < nums.length; i++) {
        if(nums.indexOf(nums[i]) === nums.lastIndexOf(nums[i])){
            return nums[i]
        }
    }
    return 0
}

export function LongestCommonPrefix(strs: string[]): string {
    const firstStr = strs[0];
    if(strs.length === 1) return firstStr;

    let retString = '';

    for(let i = 0; i < firstStr.length; i++){
        retString += firstStr[i];
        for(let j = 0; j < strs.length; j++){
            if (!strs[j].startsWith(retString)) return retString.slice(0, -1);
        }
    }
    return retString;
}

export function FirstUniqueChar(str: string): number{
    const indexToCountMap = new Map<string, number>(); //HashMap for counting the
    for (let i = 0; i < str.length; i++) {
        if (!indexToCountMap.get(str[i])) {
            indexToCountMap.set(str[i], 1);
        } else {
            indexToCountMap.set(str[i], (indexToCountMap.get(str[i])||0) + 1);
        }
    } 

    for (let i = 0; i < str.length; i++) {
        if (indexToCountMap.get(str[i]) === 1) return i;
    }

    return -1;
}

export function ValidPalindrome(s: string): boolean{
    s = s.replace(/\W|_/g, '').toLowerCase(); //replace any("g") non letter char("\W") or underscore with an empty, lowercase, char
    let point1 = 0;
    let point2 = s.length-1;
    while(point1 <= point2){
        if(s[point1] !== s[point2]) return false;
        point1++;
        point2--;
    }
    return true;
}

