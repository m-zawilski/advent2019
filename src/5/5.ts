import readFile from '../common/readFile';
import { isString } from 'util';

const question5 = async () => {
  readFile(5).then(data => {
    if (isString(data)) {
      getFirstAnswer(data);
      getSecondAnswer(data);
    } else {
      throw 'Wrong data type';
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

const runAllSteps = ( 
    data: number[], 
    phase: number, 
    previousOutput: number = 0 
  ): { data: number[], output: number } => {
  let dataCopy = [...data];
  let it = 0;
  let output = 0;
  let input = phase;
  while(it < dataCopy.length){
    const instruction = getInstruction(data[it]);
    let { dataCopy, i, output: out } = calculateStep(instruction, data, it, input, output);
    if(instruction === 3){
      input = previousOutput;
    }
    data = dataCopy;
    it = i;
    output = out;
  }
  return { data: dataCopy, output };
}

const calculateStep = ( 
  instruction: number, 
  data: number[], 
  it: number, 
  taskInput: number,
  output: number ): 
  { dataCopy: number[], i: number, output: number } => {
  switch (instruction) {
    case 1:
      return {
        output,
        ...getArrayAfterAddition(data, it)
      }
    case 2:
      return  {
        output,
        ...getArrayAfterMultiply(data, it)
      }
    case 3:
      return {
        output,
        ...readInput(data, it, taskInput)
      }
    case 4:
      const { dataCopy, i, output: out } = readOutput(data, it);
      console.log(out);
      return { dataCopy, i, output: out };
    case 5:
      return {
        output,
        ...jumpIfTrue(data, it)
      }
    case 6:
      return {
        output,
        ...jumpIfFalse(data, it)
      }
    case 7:
      return {
        output,
        ...lessThan(data, it)
      }
    case 8:
      return {
        output,
        ...equals(data, it)
      }
    case 99:
      return { dataCopy: data, i: Infinity, output };
    default:
      return { dataCopy: data, i: it, output };
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

const readOutput = (data: number[], it: number): { dataCopy: number[], i: number, output: number } => {
  const output = data[data[it+1]];
  return { dataCopy: data, i: it + 2, output };
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
  runAllSteps,
  question5
}
