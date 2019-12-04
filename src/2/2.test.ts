import { runAllSteps, calculateStep} from './2';

describe('First & Second Task tests', () => {
  test('First read of [1,9,10,3,2,3,11,0,99,30,40,50] changes the value of index 3 to 70', () => {
    const values: number[] = [1,9,10,3,2,3,11,0,99,30,40,50];
    expect(calculateStep(values, 0)[3]).toBe(70);
  })

  test('Second read of [1,9,10,3,2,3,11,0,99,30,40,50] changes the value of index 0 to 3500', () => {
    let values: number[] = [1,9,10,3,2,3,11,0,99,30,40,50];
    values = calculateStep(values, 0);
    expect(calculateStep(values, 1)[0]).toBe(3500);
  })

  test('Third read of [1,9,10,3,2,3,11,0,99,30,40,50] halts the program and returns the same array as received', () => {
    let values: number[] = [1,9,10,3,2,3,11,0,99,30,40,50];
    values = calculateStep(values, 0);
    values = calculateStep(values, 1);
    expect(calculateStep(values, 2)).toEqual(values);
  })

  test('Full read of [1,0,0,0,99] returns [2,0,0,0,99]', () => {
    let values: number[] = [1,0,0,0,99];
    expect(runAllSteps(values)).toEqual([2,0,0,0,99]);
  })

  test('Full read of [2,3,0,3,99] returns [2,3,0,6,99]', () => {
    let values: number[] = [2,3,0,3,99];
    expect(runAllSteps(values)).toEqual([2,3,0,6,99]);
  })

  test('Full read of [2,4,4,5,99,0] returns [2,4,4,5,99,9801]', () => {
    let values: number[] = [2,4,4,5,99,0];
    expect(runAllSteps(values)).toEqual([2,4,4,5,99,9801]);
  })

  test('Full read of [1,1,1,4,99,5,6,0,99] returns [30,1,1,4,2,5,6,0,99]', () => {
    let values: number[] = [1,1,1,4,99,5,6,0,99];
    expect(runAllSteps(values)).toEqual([30,1,1,4,2,5,6,0,99]);
  })
})