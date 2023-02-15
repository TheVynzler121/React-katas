import {calculateBaseModifier} from './DndHelpers.ts';

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