import { question1 } from './1/1';
import { question2 } from './2/2';
import { question3 } from './3/3';
import { question4 } from './4/4';
import { question5 } from './5/5';
import { question6 } from './6/6';
import { question7 } from './7/7';
import { question8 } from './8/8';

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
  case '5':
    question5();
    break;
  case '6':
    question6();
    break;
  case '7':
    question7();
    break;
  case '8':
    question8();
    break;
  default:
    console.log('Wrong question number. ');
}