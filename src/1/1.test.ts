import { getFuel, getFuelRecursive } from './1';

describe('First Task tests', () => {
  test('Returns correct fuel numbers as on website. ', () => {
    expect(getFuel(12)).toBe(2);
    expect(getFuel(14)).toBe(2);
    expect(getFuel(1969)).toBe(654);
    expect(getFuel(100756)).toBe(33583);
  })
})

describe('Second Task tests', () => {
  test('Returns correct fuel numbers as on website. ', () => {
    expect(getFuelRecursive(12)).toBe(2);
    expect(getFuelRecursive(14)).toBe(2);
    expect(getFuelRecursive(1969)).toBe(966);
    expect(getFuelRecursive(100756)).toBe(50346);
  })
})