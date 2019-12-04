import { getCable, getLine, findIntersections, findShortestDistance, findMinCableLength } from './3';

describe('Cable data structure tests', () => {
  test('First cable R5 results in cable (0, 0, 5)', () => {
    const line = getLine('R5', 0, 0);
    expect(line.position).toEqual(0);
    expect(line.start).toEqual(0);
    expect(line.end).toEqual(5);
  })

  test('Two cables R5, D8 result in second cable being (5, 0, -8)', () => {
    const line = getLine('R5', 0, 0);
    const line2 = getLine('D8', line.end, line.position);
    expect(line2.position).toEqual(5);
    expect(line2.start).toEqual(0);
    expect(line2.end).toEqual(-8);
  })

  test('Three cables R5, D8, R8 result in third cable being (-8, 5, 13)', () => {
    const line = getLine('R5', 0, 0);
    const line2 = getLine('D8', line.end, line.position);
    const line3 = getLine('R8', line2.end, line2.position);
    expect(line3.position).toEqual(-8);
    expect(line3.start).toEqual(5);
    expect(line3.end).toEqual(13);
  })

  test('Cable lists of R8,U5,L5,D3 and U7,R6,D4,L4 intersect in two places - (3, 3) and (6, 5)', () => {
    const firstCable = getCable(['R8', 'U5', 'L5', 'D3']);
    const secondCable = getCable(['U7', 'R6', 'D4', 'L4']);
    const intersections = findIntersections(firstCable, secondCable);
    expect(intersections.find(p => p.x === 3 && p.y === 3)).toBeTruthy();
    expect(intersections.find(p => p.x === 6 && p.y === 5)).toBeTruthy();
  })
})

describe('First Task test', () => {
  test('Cable lists of R8,U5,L5,D3 and U7,R6,D4,L4 shortest distance is 6', () => {
    const firstCable = getCable(['R8', 'U5', 'L5', 'D3']);
    const secondCable = getCable(['U7', 'R6', 'D4', 'L4']);
    const intersections = findIntersections(firstCable, secondCable);
    expect(findShortestDistance(intersections)).toEqual(6);
  })

  test('Cable lists of R75,D30,R83,U83,L12,D49,R71,U7,L72 and U62,R66,U55,R34,D71,R55,D58,R83 shortest distance is 159', () => {
    const firstCable = getCable(['R75','D30','R83','U83','L12','D49','R71','U7','L72']);
    const secondCable = getCable(['U62','R66','U55','R34','D71','R55','D58','R83']);
    const intersections = findIntersections(firstCable, secondCable);
    expect(findShortestDistance(intersections)).toEqual(159);
  })
})

describe('Second Task test', () => {
  // test('Cable lists of R8,U5,L5,D3 and U7,R6,D4,L4 shortest cable length is 40', () => {
  //   const firstCable = getCable(['R8', 'U5', 'L5', 'D3']);
  //   const secondCable = getCable(['U7', 'R6', 'D4', 'L4']);
  //   const intersections = findIntersections(firstCable, secondCable);
  //   expect(findMinCableLength(firstCable, secondCable, intersections)).toEqual(30);
  // })

  test('Cable lists of R75,D30,R83,U83,L12,D49,R71,U7,L72 and U62,R66,U55,R34,D71,R55,D58,R83 shortest cable length is 610', () => {
    const firstCable = getCable(['R75','D30','R83','U83','L12','D49','R71','U7','L72']);
    const secondCable = getCable(['U62','R66','U55','R34','D71','R55','D58','R83']);
    const intersections = findIntersections(firstCable, secondCable);
    expect(findMinCableLength(firstCable, secondCable, intersections)).toEqual(610);
  })
})