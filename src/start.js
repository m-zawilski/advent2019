"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1_1 = require("./1/1");
const questionNumber = process.argv[2];
switch (questionNumber) {
    case '1':
        _1_1.question1();
        break;
    default:
        console.log('Wrong question number. ');
}
