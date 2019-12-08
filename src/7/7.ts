import readFile from '../common/readFile';
import { isString } from 'util';
import { runAllSteps } from '../5/5';
import Combinatorics from 'js-combinatorics';

const question7 = async () => {
  readFile(7).then(data => {
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
  console.log(`1) Answer is ${getMaximumOuput(data)}`);
}

const getSecondAnswer = (dataString: string) => {
  const data = dataString.split(',').map(v => Number.parseInt(v));
  console.log(`2) Answer is ${getMaximumLoopOuput(data)}`);
}

const getMaximumLoopOuput = ( data: number[] ): number => {
  let outputs: number[] = [];
  let permutations = Combinatorics.permutation([5, 6, 7, 8, 9]).toArray();
  for(let sequence of permutations){
    outputs.push(runAllThrusters(data, sequence));
  }
  return outputs.reduce((acc, output) => {
    if(output > acc) {
      return output
    } return acc;
  }, -Infinity)
}

const getMaximumOuput = ( data: number[] ): number => {
  let outputs: number[] = [];
  let permutations = Combinatorics.permutation([0, 1, 2, 3, 4]).toArray();
  for(let sequence of permutations){
    outputs.push(runAllThrusters(data, sequence));
  }
  return outputs.reduce((acc, output) => {
    if(output > acc) {
      return output
    } return acc;
  }, -Infinity)
}

const runAllThrusters = ( data: number[], sequence: number[] ): number => {
  let output = 0;
  for(let phase of sequence) {
    let { output: out } = runAllSteps(data, phase, output);
    output = out;
  }
  console.log(output);
  return output;
}


export {
  runAllThrusters,
  question7
}