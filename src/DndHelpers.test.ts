import {add5,add5KeepOver6, formatMod, calculateBaseModifier, sub7KeepUnder5, reverseStringArray } from './DndHelpers';

test('calculates base modifier for -2', () => {
  expect(calculateBaseModifier(6)).toBe(-2);
  expect(calculateBaseModifier(7)).toBe(-2);
});

test('calculates base modifier for -1', () => {
  expect(calculateBaseModifier(8)).toBe(-1);
  expect(calculateBaseModifier(9)).toBe(-1);
});

test('calculates base modifier for +0', () => {
  expect(calculateBaseModifier(10)).toBe(0);
  expect(calculateBaseModifier(11)).toBe(0);
});

test('calculates base modifier for +1', () => {
  expect(calculateBaseModifier(12)).toBe(1);
  expect(calculateBaseModifier(13)).toBe(1);
});

test('calculates base modifier for +2', () => {
  expect(calculateBaseModifier(14)).toBe(2);
  expect(calculateBaseModifier(15)).toBe(2);
});

test('calculates base modifier for +3', () => {
  expect(calculateBaseModifier(16)).toBe(3);
  expect(calculateBaseModifier(17)).toBe(3);
});

test('calculates base modifier for +4', () => {
  expect(calculateBaseModifier(18)).toBe(4);
  expect(calculateBaseModifier(19)).toBe(4);
});

test('calculates base modifier for +5', () => {
  expect(calculateBaseModifier(20)).toBe(5);
  
});


// Check
test('formatMod', () => {
  expect(formatMod(0)).toBe("");
  expect(formatMod(1)).toBe("+1");
  expect(formatMod(-1)).toBe("-1");
});

test('map tests', () => {
  expect(add5([1,2,3])).toEqual([6,7,8]);
  expect(add5KeepOver6([1,2,3])).toEqual([7,8]);
  expect(sub7KeepUnder5([8,9,10,13,14])).toEqual([1,2,3])
  expect(reverseStringArray(["H","e","l","l","o"])).toEqual(["o","l","l","e","H"])
});

test('truthy / falsey', () => {
  expect(1).toBeTruthy();
  expect(true).toBeTruthy();
  expect("13").toBeTruthy();
  expect(["13"]).toBeTruthy();
  expect({a: "13"}).toBeTruthy();
  expect([]).toBeTruthy();
  expect({}).toBeTruthy();

  expect(null).toBeFalsy();
  expect(undefined).toBeFalsy();
  expect(0).toBeFalsy();
  expect("").toBeFalsy();
  expect(false).toBeFalsy();


  expect(true && true).toEqual(true); 
  expect(false && true).toEqual(false);
  expect(true && false).toEqual(false);
  expect(false && false).toEqual(false);

  expect(true && 5).toEqual(5);
  expect(false && 5).toEqual(false);
  expect(true && 5 && 6).toEqual(6);
  expect(true && 0 && 6).toEqual(0);

  expect(true && "test").toEqual("test");
  expect(true && "").toEqual("");
});