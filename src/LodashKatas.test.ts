import _, { forEach } from 'lodash';

const numbers = [1,2,3,4,1,1,2,3,3,3,3,3,3,3,3,3,3];

test('groupBy basics', () => {

	const output = _.groupBy(numbers, x => x);

    expect(output).toEqual({
		1: [1,1,1],
		2: [2,2],
		3: [3,3,3,3,3,3,3,3,3,3,3],
		4: [4],
	});

    expect(output[1].length).toEqual(3);
    expect(output[2].length).toEqual(2);
    expect(output[3].length).toEqual(11);
    expect(output[4].length).toEqual(1);
});

test('groupBy is even', () => {
	const isEven = (x:number) => x % 2 === 0;

	const output = _.groupBy(numbers, x => isEven(x) ? 'even' : 'odd');

    expect(output).toEqual({
		'even': [2,4,2],
		'odd': [1,3,1,1,3,3,3,3,3,3,3,3,3,3]
	});

    expect(output['even'].length).toEqual(3);
    expect(output['odd'].length).toEqual(14);
});

test('count numbers greater than 5', () => {
    const numbers = [1,2,3,4,5,6,6,6,8,1];

    const output = _.groupBy(numbers, x => x > 5)['true'].length
    // const output = numbers.filter(x => x > 5).length

    expect(output).toEqual(4);
});

test('return most common number', () => {

    
    const largestNumber = _.chain(numbers)
                        .groupBy()
                        .toPairs()
                        .map(([key, numbers]) => [key, numbers.length] as [string, number])
                        .orderBy(([_, count]) => count, ['desc'])
                        .head()
                        .head()
                        .value();

    console.log(largestNumber);
    let output = parseInt(largestNumber.toString());
    // let prevCount = 0;
    // let prevCountKey = '';

    // for (let index = 0; index < groupArr.length; index++) {
        
    //     if(mappedArr[index][1] > prevCount){
    //         prevCount = mappedArr[index][1]
    //         prevCountKey = mappedArr[index][0]
    //     }
    // }
    
    // output = parseInt(prevCountKey)

    expect(output).toEqual(3);
});