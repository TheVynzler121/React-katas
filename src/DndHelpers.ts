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
    return nums.map(number => number += 5).filter(number => number > 6);
};

export const sub7KeepUnder5 = (nums: number[]) => {
    return nums.map(number => number -= 7).filter(number => number < 5);
};

export const reverseStringArray = (sArray: string[]) => {
    
    return sArray.map(sArray.pop, [...sArray]);
};

export function ContainsDupes(nums: number[]): boolean  {
    const dict = [];

    for (let i = 0; i < nums.length; i++) {
        if(dict[nums[i]]){
            return true
        }
        dict[nums[i]] = 1;
    }
    return false;
};

export function ReverseString(input: string[]): string[] {
    let reversedArray: any[] = [];
    input.forEach(character => {
        reversedArray.splice(0, 0, character);
    });
    return reversedArray;
};

export function TwoSum(nums: number[], target: number): number[]{
    let retArray = [] as number[];
    let loopCount = nums.length;
    for (let i = 0; i < loopCount; i++) {
       for (let j = i + 1; j < loopCount; j++) {
            if(nums[i] + nums[j] == target)
                retArray.push(i, j);              
       }
    }
    return retArray;
};