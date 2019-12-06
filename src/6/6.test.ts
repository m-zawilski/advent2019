import {  updatePlanets, 
          putNewPlanetIfInChain, 
          Planet, 
          isPlanetInArray, 
          calculateChainLength, 
          getOrbitSum,
          createPlanets,
          findClosestCommonParent,
          getTransfersSum} from './6';

describe('First task tests', () => {
  test('UpdatePlanets adds a new planet to array', () => {
    const planets = [{name: 'A', orbitChain: []}];
    expect(updatePlanets('A)B', planets).length).toBe(2);
    expect(updatePlanets('A)B', planets)[1].name).toBe('B');
  })

  test('PutNewPlanetIfInChain updates planet chain if direct satellite is added', () => {
    const planets = [
      {name: 'A', orbitChain: []}
    ];
    expect(putNewPlanetIfInChain(planets[0], 'A', 'B').orbitChain.length).toBe(1);
    expect(putNewPlanetIfInChain(planets[0], 'A', 'B').orbitChain[0]).toBe('B');
  })

  test('PutNewPlanetIfInChain updates planet chain if indirect satellite is added', () => {
    const planets = [
      {name: 'A', orbitChain: []},
      {name: 'C', orbitChain: ['A']}
    ];
    expect(putNewPlanetIfInChain(planets[1], 'A', 'B').orbitChain.length).toBe(2);
    expect(putNewPlanetIfInChain(planets[1], 'A', 'B').orbitChain[1]).toBe('B');
  })

  test('PutNewPlanetIfInChain does not update planet chain if orbiting planet is not a direct satellite', () => {
    const planets = [
      {name: 'A', orbitChain: []}
    ];
    expect(putNewPlanetIfInChain(planets[0], 'C', 'B').orbitChain.length).toBe(0);
  })

  test('PutNewPlanetIfInChain does not update planet chain if orbiting planet is not an indirect satellite', () => {
    const planets = [
      {name: 'A', orbitChain: []},
      {name: 'C', orbitChain: ['B']}
    ];
    expect(putNewPlanetIfInChain(planets[1], 'A', 'D').orbitChain.length).toBe(1);
    expect(putNewPlanetIfInChain(planets[1], 'A', 'D').orbitChain.includes('B')).toBeTruthy();
  })

  test('IsPlanetInArray correctly responds if the planet is in array', () => {
    const planets = [{name: 'A', orbitChain: []}];
    expect(isPlanetInArray('A', planets)).toBeTruthy();
  })

  test('IsPlanetInArray correctly responds if the planet is not in array', () => {
    const planets = [{name: 'A', orbitChain: []}];
    expect(isPlanetInArray('B', planets)).toBeFalsy();
  })

  test('UpdatePlanets updates old planets orbit chain when orbiting planet added', () => {
    const planets = [{name: 'A', orbitChain: []}];
    expect(updatePlanets('A)B', planets)[0].orbitChain.length).toBe(1);
    expect(updatePlanets('A)B', planets)[0].orbitChain.includes('B')).toBeTruthy();
  })

  test('UpdatePlanets adds both new planets if orbiting and orbited planets are not in array', () => {
    const planets: Planet[] = [{name: 'C', orbitChain: ['']}];
    expect(updatePlanets('A)B', planets).length).toBe(3);
    expect(updatePlanets('A)B', planets)[1].name).toBe('A');
    expect(updatePlanets('A)B', planets)[1].orbitChain.length).toBe(1);
    expect(updatePlanets('A)B', planets)[1].orbitChain.includes('B')).toBeTruthy();
    expect(updatePlanets('A)B', planets)[2].name).toBe('B');
    expect(updatePlanets('A)B', planets)[2].orbitChain.length).toBe(0);
  })

  test('UpdatePlanets adds orbited planet if did not exist in array before while orbiting existed', () => {
    const planets: Planet[] = [{name: 'B', orbitChain: ['']}];
    expect(updatePlanets('A)B', planets).length).toBe(2);
  })

  test('UpdatePlanets added new orbited planet has orbitChain of orbiting + its chain', () => {
    const planets: Planet[] = [{name: 'B', orbitChain: ['X', 'Y', 'Z']}];
    expect(updatePlanets('A)B', planets)[1].orbitChain.length).toBe(4);
    expect(updatePlanets('A)B', planets)[1].orbitChain.includes('B')).toBeTruthy();
    expect(updatePlanets('A)B', planets)[1].orbitChain[3]).toBe('Z');
  })

  test('UpdatePlanets connects already existing orbited with already existing orbiting', () => {
    const planets: Planet[] = [
      {name: 'B', orbitChain: ['C']},
      {name: 'A', orbitChain: ['D']}
    ];
    expect(updatePlanets('A)B', planets)[1].orbitChain.length).toBe(3);
    expect(updatePlanets('A)B', planets)[1].orbitChain.includes('B')).toBeTruthy();
    expect(updatePlanets('A)B', planets)[1].orbitChain.includes('C')).toBeTruthy();
  })

  test('UpdatePlanets connects already existing indirect orbited with already existing orbiting', () => {
    const planets: Planet[] = [
      {name: 'B', orbitChain: ['C']},
      {name: 'D', orbitChain: ['A', 'E']},
      {name: 'A', orbitChain: ['E']},
    ];
    expect(updatePlanets('A)B', planets)[1].orbitChain.length).toBe(4);
    expect(updatePlanets('A)B', planets)[1].orbitChain.includes('B')).toBeTruthy();
    expect(updatePlanets('A)B', planets)[1].orbitChain.includes('C')).toBeTruthy();
  })

  test('CalculateChainLength correctly sums up chains', () => {
    const planets: Planet[] = [
      {name: 'B', orbitChain: ['C']},
      {name: 'D', orbitChain: ['A', 'E']},
      {name: 'A', orbitChain: ['E']},
    ];
    expect(calculateChainLength(planets)).toBe(4);
  })

  test('GetFirstAnswer gives correct answer for example as in task description', () => {
    const data = 'COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L';
    expect(getOrbitSum(data)).toBe(42);
  })
})

describe('Second task tests', () => {
  test('FindClosestCommonParent correctly finds closest common parent as in task description', () => {
    const data = 'COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L\nK)YOU\nI)SAN';
    const planets = createPlanets(data);
    expect(findClosestCommonParent(planets, 'YOU', 'SAN').name).toBe('D');
    expect(findClosestCommonParent(planets, 'YOU', 'SAN').orbitChain.length).toBe(8);
  })

  test('GetTransferSum correctly calculates sum of transfers as in task description', () => {
    const data = 'COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L\nK)YOU\nI)SAN';
    const planets = createPlanets(data);
    const closestCommonParent = findClosestCommonParent(planets, 'YOU', 'SAN');
    expect(getTransfersSum(planets, closestCommonParent, 'YOU', 'SAN')).toBe(4);
  })
})