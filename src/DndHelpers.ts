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
   let countArr = [] as any;
   let loopLength = nums.length; // no "- 1" if its an array?
   let retBool = false;
   for (let index = 0; index < loopLength; index++) {
    const element = nums[index];
    if(countArr[element]){
        retBool = true;
        return retBool;
    }
    countArr[element] = 1;
   }
   return retBool;
};

export function ReverseString(input: string[]): string[] {
    let reversedArray: any[] = [];
    input.forEach(character => {
        reversedArray.splice(0, 0, character);
    });
    return reversedArray;
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

export function PlusOne(digits: number[]): number[] {
    let loopCount = digits.length - 1;

    for (let i = loopCount; i >= 0; i--) {
        if(digits[i] === 9){
            digits[i] = 0
        }else{
            digits[i]++;
            return digits;
        }
    }
    let newOne = [1] as number[];
    return newOne.concat(digits);
}

export function SingleNumber(nums: number[]): number {
    const countingMap = new Map<number, number>();

    nums.forEach((i) => {
        const numCount = (countingMap.get(i) ?? 0) + 1;
        countingMap.set(i, numCount);
    });

    for (let [key, value] of countingMap as any) {
        if(value === 1){
            return key;
        }
    };
    return 0;
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

