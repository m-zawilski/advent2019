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
  return data;
}

const getSecondAnswer = (data: string) => {
  return data;
}

export {
  question4
}
