"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1_1 = require("./1/1");
const _2_1 = require("./2/2");
const _3_1 = require("./3/3");
const _4_1 = require("./4/4");
const questionNumber = process.argv[2];
switch (questionNumber) {
    case '1':
        _1_1.question1();
        break;
    case '2':
        _2_1.question2();
        break;
    case '3':
        _3_1.question3();
        break;
    case '4':
        _4_1.question4();
        break;
    default:
        console.log('Wrong question number. ');
}
