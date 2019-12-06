import readFile from '../common/readFile';
import { isString } from 'util';

const question1 = async () => {
  readFile(1).then(data => {
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

const getFirstAnswer = (data: string) => {
  const fuels: number[] = getMassAray(data)
                          .map(m => getFuel(m));;
  const totalFuel = getTotalFuel(fuels);
  console.log(`1) Total fuel: ${totalFuel}`);
}

const getSecondAnswer = (data: string) => {
  const fuels: number[] = getMassAray(data)
                          .map(m => getFuelRecursive(m));;
  const totalFuel = getTotalFuel(fuels);
  console.log(`2) Total fuel: ${totalFuel}`);
}

const getTotalFuel = (fuels: number[]): number => {
  return fuels.reduce((sum, f) => {
    return sum + f;
  }, 0);
}

const getMassAray = (data: string): number[] => {
  return data.split('\n')
          .map(l => Number.parseInt(l));
}

const getFuel = (mass : number): number => {
  return Math.floor(mass/3) - 2;
}

const getFuelRecursive = (mass : number): number => {
  const additionalFuel = getFuel(mass);
  if(additionalFuel <= 0){
    return 0;
  } else {
    return additionalFuel + getFuelRecursive(additionalFuel);
  }
}

export {
  getFuel,
  getFuelRecursive,
  question1
}
