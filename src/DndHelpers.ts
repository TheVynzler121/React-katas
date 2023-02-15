export const calculateBaseModifier = (stat: number) => {
    if(stat === 10 || stat === 11){
        return 0;
    }
    if(stat === 12 || stat === 13){
        return 1;
    }
    if(stat === 14 || stat === 15){
        return 2;
    }
    if(stat === 16 || stat === 17){
        return 3;
    }
    if(stat === 18 || stat === 19){
        return 4;
    }
    if(stat === 20){
        return 5;
    }
    return 0;
};

