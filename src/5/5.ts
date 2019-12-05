import readFile from '../common/readFile';
import { isString } from 'util';

const question5 = async () => {
  readFile(5).then(data => {
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

const getFirstAnswer = (dataString: string) => {
  const data = dataString.split(',').map(v => Number.parseInt(v));
  console.log('===============================')
  console.log('The last number is the result: ')
  runAllSteps(data, 1);
  console.log('===============================')
}

const getSecondAnswer = (dataString: string) => {
  const data = dataString.split(',').map(v => Number.parseInt(v));
  console.log('===============================')
  console.log('The last number is the result: ')
  runAllSteps(data, 5);
  console.log('===============================')
}

const runAllSteps = (data: number[], taskInput: number): number[] => {
  let dataCopy = [...data];
  let it = 0;
  while(it < dataCopy.length){
    let { dataCopy, i } = calculateStep(data, it, taskInput);
    data = dataCopy;
    it = i;
  }
  return dataCopy;
}

const calculateStep = (data: number[], it: number, taskInput: number ): { dataCopy: number[], i: number } => {
  const instruction = getInstruction(data[it]);
  switch (instruction) {
    case 1:
      return getArrayAfterAddition(data, it);
    case 2:
      return getArrayAfterMultiply(data, it);
    case 3:
      return readInput(data, it, taskInput);
    case 4:
      return readOutput(data, it);
    case 5:
      return jumpIfTrue(data, it);
    case 6:
      return jumpIfFalse(data, it);
    case 7:
      return lessThan(data, it);
    case 8:
      return equals(data, it);
    case 99:
      return { dataCopy: data, i: Infinity };
    default:
      return { dataCopy: data, i: it };
  }
}

const jumpIfTrue = (data: number[], it: number): { dataCopy: number[], i: number } => {
  let i = it + 3;
  if(readValue(data[it], 1, data[data[it+1]], data[it+1]) !== 0){
    i = readValue(data[it], 2, data[data[it+2]], data[it+2]);
  }
  return { dataCopy: data, i };
}

const jumpIfFalse = (data: number[], it: number): { dataCopy: number[], i: number } => {
  let i = it + 3;
  if(readValue(data[it], 1, data[data[it+1]], data[it+1]) === 0){
    i = readValue(data[it], 2, data[data[it+2]], data[it+2]);
  }
  return { dataCopy: data, i };
}

const lessThan = (data: number[], it: number): { dataCopy: number[], i: number } => {
  data[data[it+3]] = readValue(data[it], 1, data[data[it+1]], data[it+1]) 
                      < readValue(data[it], 2, data[data[it+2]], data[it+2]) ?
                      1 : 0;
  return { dataCopy: data, i: it + 4 };
}

const equals = (data: number[], it: number): { dataCopy: number[], i: number } => {
  data[data[it+3]] = readValue(data[it], 1, data[data[it+1]], data[it+1]) 
                      === readValue(data[it], 2, data[data[it+2]], data[it+2]) ?
                      1 : 0;
  return { dataCopy: data, i: it + 4 };
}

const readInput = (data: number[], it: number, value: number): { dataCopy: number[], i: number } => {
  let dataCopy = [...data];
  dataCopy[data[it+1]] = value;
  return { dataCopy, i: it + 2 };
}

const readOutput = (data: number[], it: number): { dataCopy: number[], i: number } => {
  console.log(data[data[it+1]]);
  return { dataCopy: data, i: it + 2 };
}

const getInstruction = (optCode: number): number => {
  return optCode % 100;
}

const getArrayAfterAddition = ( data: number[], it: number ): { dataCopy: number[], i: number } => {
  let dataCopy = [...data];
  dataCopy[data[it+3]] = readValue(data[it], 1, data[data[it+1]], data[it+1]) 
                  + readValue(data[it], 2, data[data[it+2]], data[it+2]);
  return { dataCopy, i: it + 4 };
}

const getArrayAfterMultiply = ( data: number[], it: number ): { dataCopy: number[], i: number } => {
  let dataCopy = [...data];
  dataCopy[data[it+3]] = readValue(data[it], 1, data[data[it+1]], data[it+1]) 
                  * readValue(data[it], 2, data[data[it+2]], data[it+2]);
  return { dataCopy, i: it+4 };
}

const readValue = ( 
  optCode: number, 
  position: number, 
  positionModeValue: number, 
  immediateModeValue: number 
  ): number => {
    let modeCode = optCode;
    for(let i = 0; i < 1 + position; i++){
      modeCode = Math.floor(modeCode / 10);
    }
    modeCode = (modeCode % 10);
    if(modeCode === 0){
      return positionModeValue;
    } else {
      return immediateModeValue;
    }
}

export {
  readValue,
  getArrayAfterAddition,
  getArrayAfterMultiply,
  getInstruction,
  readInput,
  readOutput,
  jumpIfTrue,
  jumpIfFalse,
  lessThan,
  equals,
  question5
}
