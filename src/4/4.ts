import readFile from '../common/readFile';
import { isString } from 'util';

const question4 = async () => {
  readFile(4).then(data => {
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
  let [ low, high ] = data.split('-').map(d => parseInt(d));
  let counter = 0;
  while(low < high){
    if(isPassword1(low.toString().split(''))){
      counter++;
    }
    low++;
  }
  console.log(`1) Result is: ${counter}`);
}

const getSecondAnswer = (data: string) => {
  let [ low, high ] = data.split('-').map(d => parseInt(d));
  let counter = 0;
  while(low < high){
    if(isPassword2(low.toString().split(''))){
      counter++;
    }
    low++;
  }
  console.log(`1) Result is: ${counter}`);
}

const isPassword1 = (numberArray: string[]): boolean => {
  return hasDoubles(numberArray) && doesNotDecrease(numberArray);
}

const isPassword2 = (numberArray: string[]): boolean => {
  return hasNotGroupedDoubles(numberArray) && doesNotDecrease(numberArray);
}

const hasNotGroupedDoubles = (numberArray: string[]): boolean => {
  let currentStreak = numberArray[0];
  for(let i = 0; i < numberArray.length-1; i++){
    if(currentStreak.length === 2 && numberArray[i] !== numberArray[i+1]){
      return true;
    } else if(numberArray[i] === numberArray[i+1]){
      currentStreak += numberArray[i];
    } else {
      currentStreak = numberArray[i];
    }
  }
  if(currentStreak[0] === numberArray[numberArray.length-1]){
    currentStreak += numberArray[numberArray.length-1];
  }
  return currentStreak.length === 2;
}

const hasDoubles = (numberArray: string[]): boolean => {
  for(let i = 0; i < numberArray.length-1; i++){
    if(numberArray[i] === numberArray[i+1]){
      return true;
    }
  }
  return false;
}

const doesNotDecrease = (numberArray: string[]): boolean => {
  for(let i = 0; i < numberArray.length-1; i++){
    if(numberArray[i] > numberArray[i+1]){
      return false;
    }
  }
  return true;
}

export {
  isPassword1,
  isPassword2,
  question4
}
