import { question1 } from './1/1';
import { question2 } from './2/2';
import { question3 } from './3/3';
import { question4 } from './4/4';

const questionNumber: string = process.argv[2];
switch (questionNumber) {
  case '1':
    question1();
    break;
  case '2':
    question2();
    break;
  case '3':
    question3();
    break;
  case '4':
    question4();
    break;
  default:
    console.log('Wrong question number. ');
}