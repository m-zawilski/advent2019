import {  getLayer, 
          getAllLayers,
          getLayerWithFewestZeroes } from './8';

describe('First Task tests', () => {
  test('GetLayer correctly creates layer as in the task', () => {
    const data = [1,2,3,4,5,6,7,8,9,0,1,2];
    const width = 3;
    const height = 2;
    expect(getLayer(data, 0, width, height)).toEqual([[1,2,3],[4,5,6]]);
    expect(getLayer(data, 1, width, height)).toEqual([[7,8,9],[0,1,2]]);
  })

  test('GetAllLayers correctly creates layers as in the task', () => {
    const data = [1,2,3,4,5,6,7,8,9,0,1,2];
    const width = 3;
    const height = 2;
    expect(getAllLayers(data, width, height)).toEqual([[[1,2,3],[4,5,6]], [[7,8,9],[0,1,2]]]);
  })

  test('GetLayerWithMostZeroes finds the correct layer', () => {
    const data = [1,2,3,4,5,6,7,8,9,0,1,2];
    const width = 3;
    const height = 2;
    const layers = getAllLayers(data, width, height);
    expect(getLayerWithFewestZeroes(layers)).toEqual([[1,2,3],[4,5,6]]);
  })
})