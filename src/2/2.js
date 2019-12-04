"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readFile_1 = __importDefault(require("../common/readFile"));
const util_1 = require("util");
const question2 = async () => {
    readFile_1.default(2).then(data => {
        if (util_1.isString(data)) {
            getFirstAnswer(data);
            getSecondAnswer(data);
        }
        else {
            throw "Wrong data type";
        }
    })
        .catch(err => {
        console.log(err);
    });
};
exports.question2 = question2;
const getFirstAnswer = (dataString) => {
    const data = dataString.split(',').map(v => Number.parseInt(v));
    console.log(`1) Answer is: ${runAllSteps(data)[0]}`);
};
const getSecondAnswer = (dataString) => {
    const data = dataString.split(',').map(v => Number.parseInt(v));
    const A = getA(data);
    const B = getB(data, A);
    const C = getC(data, A);
    let answer = 0;
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            answer = A + B * i + C * j;
            if (answer === 19690720) {
                console.log(`2) Answer is: ${100 * i + j}`);
                return;
            }
        }
    }
};
const getA = (data) => {
    let dataCopy = [...data];
    dataCopy[1] = 0;
    dataCopy[2] = 0;
    return runAllSteps(dataCopy)[0];
};
const getB = (data, A) => {
    let dataCopy = [...data];
    dataCopy[1] = 1;
    dataCopy[2] = 0;
    return runAllSteps(dataCopy)[0] - A;
};
const getC = (data, A) => {
    let dataCopy = [...data];
    dataCopy[1] = 0;
    dataCopy[2] = 1;
    return runAllSteps(dataCopy)[0] - A;
};
const runAllSteps = (data) => {
    let dataCopy = [...data];
    for (let i = 0;; i++) {
        dataCopy = calculateStep(dataCopy, i);
        if (dataCopy[i * 4] === 99 || i * 4 > dataCopy.length) {
            break;
        }
    }
    return dataCopy;
};
exports.runAllSteps = runAllSteps;
const calculateStep = (data, step) => {
    const instruction = data[step * 4];
    switch (instruction) {
        case 1:
            return getArrayAfterAddition(data, data[step * 4 + 1], data[step * 4 + 2], data[step * 4 + 3]);
        case 2:
            return getArrayAfterMultiply(data, data[step * 4 + 1], data[step * 4 + 2], data[step * 4 + 3]);
        default:
            return data;
    }
};
exports.calculateStep = calculateStep;
const getArrayAfterAddition = (data, firstValuePosition, secondValuePosition, positionToChange) => {
    let dataCopy = [...data];
    dataCopy[positionToChange] = data[firstValuePosition] + data[secondValuePosition];
    return dataCopy;
};
const getArrayAfterMultiply = (data, firstValuePosition, secondValuePosition, positionToChange) => {
    let dataCopy = [...data];
    dataCopy[positionToChange] = data[firstValuePosition] * data[secondValuePosition];
    return dataCopy;
};
