import readFile from '../common/readFile';
import { isString } from 'util';

interface Line {
  position: number,
  start: number,
  end: number,
  horizontal: boolean
}

interface Cable {
  lines: Line[]
}

interface Intersection {
  x: number,
  y: number,
  intersectionMetadata: {
    firstCable: number,
    secondCable: number
  }
}

const question3 = async () => {
  readFile(3).then(data => {
    if (isString(data)) {
      getFirstAnswer(data);
      getSecondAnswer(data);
    } else {
      throw "Wrong data type";
    }
  })
  .catch(err => {
    console.log(err);
  });
}

const getFirstAnswer = (data: string) => {
  const [ firstCableString, secondCableString ] = data.split('\n');
  const firstCable: Cable = getCable(firstCableString.split(','));
  const secondCable: Cable = getCable(secondCableString.split(','));
  const intersections: Intersection[] = findIntersections(firstCable, secondCable);
  console.log(`1) Result is: ${findShortestDistance(intersections)}`)

}

const getSecondAnswer = (data: string) => {
  const [ firstCableString, secondCableString ] = data.split('\n');
  const firstCable: Cable = getCable(firstCableString.split(','));
  const secondCable: Cable = getCable(secondCableString.split(','));
  const intersections: Intersection[] = findIntersections(firstCable, secondCable);
  console.log(`2) Result is: ${findMinCableLength(firstCable, secondCable, intersections)}`)
}

const findMinCableLength = (firstCable: Cable, secondCable: Cable, intersections: Intersection[]): number => {
  const distances: number[] = intersections.map((intersection) => {
    return getLength(firstCable, secondCable, intersection);
  })
  return distances.reduce((min, distance) => {
    return distance < min ? distance : min;
  }, Infinity);
}

const getLength = (cable1: Cable, cable2: Cable, intersection: Intersection): number => {
  let length = 0;
  for(let i = 0; i < intersection.intersectionMetadata.firstCable; i++){
    length += Math.abs(cable1.lines[i].end - cable1.lines[i].start);
  }
  for(let i = 0; i < intersection.intersectionMetadata.secondCable; i++){
    length += Math.abs(cable2.lines[i].end - cable2.lines[i].start);
  }
  if(cable1.lines[intersection.intersectionMetadata.firstCable].horizontal){
    length += Math.abs(cable1.lines[intersection.intersectionMetadata.firstCable].start - intersection.x)
  } else {
    length += Math.abs(cable1.lines[intersection.intersectionMetadata.firstCable].start - intersection.y)
  }
  if(cable2.lines[intersection.intersectionMetadata.secondCable].horizontal){
    length += Math.abs(cable2.lines[intersection.intersectionMetadata.secondCable].start - intersection.x)
  } else {
    length += Math.abs(cable2.lines[intersection.intersectionMetadata.secondCable].start - intersection.y)
  }
  return length;
}

const getCable = (data: string[]): Cable => {
  let lines: Line[] = [];
  let line: Line = {
    position: 0,
    start: 0,
    end: 0,
    horizontal: false
  }
  for(let i = 0; i < data.length; i++) {
    line = getLine(data[i], line.end, line.position);
    lines.push(line)
  }
  return { lines };
}

const getLine = (data: string, previousEnd: number = 0, previousPosition: number = 0): Line => {
  const direction = data.substring(0, 1);
  const translation = Number.parseInt(data.substring(1));
  switch (direction) {
    case 'U':
      return {
        position: previousEnd,
        start: previousPosition,
        end: previousPosition + translation,
        horizontal: false
      }
    case 'R':
      return {
        position: previousEnd,
        start: previousPosition,
        end: previousPosition + translation,
        horizontal: true
      }
    case 'D':
      return {
        position: previousEnd,
        start: previousPosition,
        end: previousPosition - translation,
        horizontal: false
      }
    case 'L':
      return {
        position: previousEnd,
        start: previousPosition,
        end: previousPosition - translation,
        horizontal: true
      }
    default:
      throw 'Wrong direction letter ' + direction;
  }
}

const findShortestDistance = (points: Intersection[]): number => {
  return points.reduce((min, p) => {
    const distance = Math.abs(p.x) + Math.abs(p.y);
    return distance < min ? distance : min;
  }, Infinity)
}

const findIntersections = (firstCable: Cable, secondCable: Cable): Intersection[] => {
  let intersections: Intersection[] = []
  firstCable.lines.map((line1, i) => {
    secondCable.lines.map((line2, j) => {
      if (line1.horizontal && !line2.horizontal && intersects(line1, line2)){
          intersections.push({
            x: line2.position,
            y: line1.position,
            intersectionMetadata: {
              firstCable: i,
              secondCable: j
            }
          })
      } else if (!line1.horizontal && line2.horizontal && intersects(line1, line2)){
        intersections.push({
          x: line1.position,
          y: line2.position,
          intersectionMetadata: {
            firstCable: i,
            secondCable: j
          }
        })
      }
    })
  });
  return intersections.filter(p => p.x !== 0 && p.y !== 0);
}

const intersects = (vLine: Line, hLine: Line): boolean => {
  const vAbsoluteStart = Math.min(vLine.start, vLine.end);
  const vAbsoluteEnd = Math.max(vLine.start, vLine.end);
  const hAbsoluteStart = Math.min(hLine.start, hLine.end);
  const hAbsoluteEnd = Math.max(hLine.start, hLine.end);
  if(hLine.position <= vAbsoluteEnd && hLine.position >= vAbsoluteStart
    && vLine.position <= hAbsoluteEnd && vLine.position >= hAbsoluteStart){
      return true;
  }
  return false;
}

export {
  getCable,
  getLine,
  findIntersections,
  findShortestDistance,
  findMinCableLength,
  question3
}
