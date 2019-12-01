import { question1 } from './1/1'

const questionNumber: string = process.argv[2];
switch (questionNumber) {
  case '1':
    question1();
    break;
  default:
    console.log('Wrong question number. ');
}