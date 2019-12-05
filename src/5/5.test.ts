import {  readValue,
          getArrayAfterAddition,
          getArrayAfterMultiply,
          getInstruction, 
          readInput,
          readOutput,
          jumpIfFalse,
          jumpIfTrue,
          lessThan,
          equals} from './5';

describe('First task tests', () => {
  test('Read value correctly determines which of two values to read', () => {
    expect(readValue(1002,1,2,3)).toBe(2);
    expect(readValue(1102,1,2,3)).toBe(3);
    expect(readValue(102,2,3,4)).toBe(3);
    expect(readValue(1102,2,3,4)).toBe(4);
  })

  test('GetArrayAfterMultiply returns a correct array as in task description', () => {
    const array = [1002,4,3,4,33];
    expect(getArrayAfterMultiply(array, 0).dataCopy[4]).toBe(99);
  })

  test('Instructions correctly change iterator', () => {
    const array = [1002,4,3,4,33];
    expect(getArrayAfterMultiply(array, 0).i).toBe(4);
    expect(getArrayAfterAddition(array, 0).i).toBe(4);
    expect(readInput(array, 0, 1).i).toBe(2);
    expect(readOutput(array, 0).i).toBe(2);
  })

  test('Correctly returns instruction code from optCode', () => {
    expect(getInstruction(1101)).toBe(1);
    expect(getInstruction(1102)).toBe(2);
    expect(getInstruction(1103)).toBe(3);
    expect(getInstruction(1104)).toBe(4);
    expect(getInstruction(1199)).toBe(99);
  })

  test('Input read correctly', () => {
    const array = [1003,2,3,4,33];
    expect(readInput(array, 0, 1).dataCopy[2]).toBe(1);
  })
})

describe('Second task tests', () => {
  test('Correctly returns new instruction code from optCode', () => {
    expect(getInstruction(1105)).toBe(5);
    expect(getInstruction(1106)).toBe(6);
    expect(getInstruction(1107)).toBe(7);
    expect(getInstruction(1108)).toBe(8);
  })

  test('New instructions correctly change iterator (jumps omitted)', () => {
    const array = [1102,0,3,4,33];
    const array2 = [1102,1,3,4,33];
    expect(jumpIfTrue(array, 0).i).toBe(3);
    expect(jumpIfFalse(array2, 0).i).toBe(3);
    expect(lessThan(array, 0).i).toBe(4);
    expect(equals(array, 0).i).toBe(4);
  })

  test('Jump-if-true changes iterator to second parameter if first parameter non-zero', () => {
    const array = [102,1,3,9,33];
    expect(jumpIfTrue(array, 0).i).toBe(9);
    const array2 = [1102,1,5,9,33];
    expect(jumpIfTrue(array2, 0).i).toBe(5);
  })

  test('Jump-if-false changes iterator to second parameter if first parameter zero', () => {
    const array = [102,0,3,9,33];
    expect(jumpIfFalse(array, 0).i).toBe(9);
    const array2 = [1102,0,5,9,33];
    expect(jumpIfFalse(array2, 0).i).toBe(5);
  })

  test('Less than correctly changes position of third parameter', () => {
    const array = [1102,0,1,4,33];
    expect(lessThan(array, 0).dataCopy[4]).toBe(1);
    const array2 = [1102,1,0,4,33];
    expect(lessThan(array2, 0).dataCopy[4]).toBe(0);
  })

  test('Equals correctly changes position of third parameter', () => {
    const array = [1102,1,1,4,33];
    expect(equals(array, 0).dataCopy[4]).toBe(1);
    const array2 = [1102,1,2,4,33];
    expect(equals(array2, 0).dataCopy[4]).toBe(0);
  })
})