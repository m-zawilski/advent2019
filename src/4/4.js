"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readFile_1 = __importDefault(require("../common/readFile"));
const util_1 = require("util");
const question4 = async () => {
    readFile_1.default(4).then(data => {
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
exports.question4 = question4;
const getFirstAnswer = (data) => {
    let [low, high] = data.split('-');
    let counter = 0;
    let [parsedLow, parsedHigh] = [parseInt(low), parseInt(high)];
    while (parsedLow < parsedHigh) {
        if (isPassword1(parsedLow.toString().split(''))) {
            counter++;
        }
        parsedLow++;
    }
    console.log(`1) Result is: ${counter}`);
};
const getSecondAnswer = (data) => {
    let [low, high] = data.split('-');
    let counter = 0;
    let [parsedLow, parsedHigh] = [parseInt(low), parseInt(high)];
    while (parsedLow < parsedHigh) {
        if (isPassword2(parsedLow.toString().split(''))) {
            counter++;
        }
        parsedLow++;
    }
    console.log(`1) Result is: ${counter}`);
};
const isPassword1 = (numberArray) => {
    return hasDoubles(numberArray) && doesNotDecrease(numberArray);
};
exports.isPassword1 = isPassword1;
const isPassword2 = (numberArray) => {
    return hasNotGroupedDoubles(numberArray) && doesNotDecrease(numberArray);
};
exports.isPassword2 = isPassword2;
const hasNotGroupedDoubles = (numberArray) => {
    let currentStreak = numberArray[0];
    for (let i = 0; i < numberArray.length - 1; i++) {
        if (currentStreak.length === 2 && numberArray[i] !== numberArray[i + 1]) {
            return true;
        }
        else if (numberArray[i] === numberArray[i + 1]) {
            currentStreak += numberArray[i];
        }
        else {
            currentStreak = numberArray[i];
        }
    }
    if (currentStreak[0] === numberArray[numberArray.length - 1]) {
        currentStreak += numberArray[numberArray.length - 1];
    }
    return currentStreak.length === 2;
};
const hasDoubles = (numberArray) => {
    for (let i = 0; i < numberArray.length - 1; i++) {
        if (numberArray[i] === numberArray[i + 1]) {
            return true;
        }
    }
    return false;
};
const doesNotDecrease = (numberArray) => {
    for (let i = 0; i < numberArray.length - 1; i++) {
        if (numberArray[i] > numberArray[i + 1]) {
            return false;
        }
    }
    return true;
};
