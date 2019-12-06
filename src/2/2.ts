import readFile from '../common/readFile';
import { isString } from 'util';

const question2 = async () => {
  readFile(2).then(data => {
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
  console.log(`1) Answer is: ${runAllSteps(data)[0]}`);
}

const getSecondAnswer = (dataString: string) => {
  const data = dataString.split(',').map(v => Number.parseInt(v));
  const A = getA(data);
  const B = getB(data, A);
  const C = getC(data, A);
  let answer = 0;
  for(let i = 0; i < 100; i++){
    for(let j = 0; j < 100; j++){
      answer = A + B * i + C * j;
      if(answer === 19690720){
        console.log(`2) Answer is: ${100 * i + j}`);
        return;
      }
    }
  }
}

const getA = (data: number[]): number => {
  let dataCopy = [...data];
  dataCopy[1] = 0;
  dataCopy[2] = 0;
  return runAllSteps(dataCopy)[0];
}

const getB = (data: number[], A: number): number => {
  let dataCopy = [...data];
  dataCopy[1] = 1;
  dataCopy[2] = 0;
  return runAllSteps(dataCopy)[0] - A;
}

const getC = (data: number[], A: number): number => {
  let dataCopy = [...data];
  dataCopy[1] = 0;
  dataCopy[2] = 1;
  return runAllSteps(dataCopy)[0] - A;
}

const runAllSteps = (data: number[]): number[] => {
  let dataCopy = [...data];
  for(let i = 0; ; i++){
    dataCopy = calculateStep(dataCopy, i);
    if(dataCopy[i*4] === 99|| i*4 > dataCopy.length){
      break;
    }
  }
  return dataCopy;
}

const calculateStep = (data: number[], step: number): number[] => {
  const instruction = data[step*4];
  switch (instruction) {
    case 1:
      return getArrayAfterAddition(data, data[step*4+1], data[step*4+2], data[step*4+3]);
    case 2:
      return getArrayAfterMultiply(data, data[step*4+1], data[step*4+2], data[step*4+3]);
    default:
      return data;
  }
}

const getArrayAfterAddition = 
  ( data: number[], 
    firstValuePosition: number, 
    secondValuePosition: number, 
    positionToChange: number
  ): number[] => {
  let dataCopy = [...data];
  dataCopy[positionToChange] = data[firstValuePosition] + data[secondValuePosition];
  return dataCopy;
}

const getArrayAfterMultiply = 
  ( data: number[], 
    firstValuePosition: number, 
    secondValuePosition: number, 
    positionToChange: number
  ): number[] => {
  let dataCopy = [...data];
  dataCopy[positionToChange] = data[firstValuePosition] * data[secondValuePosition];
  return dataCopy;
}

export {
  calculateStep,
  runAllSteps,
  question2
}
