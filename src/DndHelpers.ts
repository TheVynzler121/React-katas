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

