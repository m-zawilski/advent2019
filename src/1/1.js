"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readFile_1 = __importDefault(require("../common/readFile"));
const util_1 = require("util");
const question1 = async () => {
    readFile_1.default(1).then(data => {
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
exports.question1 = question1;
const getFirstAnswer = (data) => {
    const fuels = getMassAray(data)
        .map(m => getFuel(m));
    ;
    const totalFuel = getTotalFuel(fuels);
    console.log(`1) Total fuel: ${totalFuel}`);
};
const getSecondAnswer = (data) => {
    const fuels = getMassAray(data)
        .map(m => getFuelRecursive(m));
    ;
    const totalFuel = getTotalFuel(fuels);
    console.log(`2) Total fuel: ${totalFuel}`);
};
const getTotalFuel = (fuels) => {
    return fuels.reduce((sum, f) => {
        return sum + f;
    }, 0);
};
const getMassAray = (data) => {
    return data.split('\n')
        .map(l => Number.parseInt(l));
};
const getFuel = (mass) => {
    return Math.floor(mass / 3) - 2;
};
exports.getFuel = getFuel;
const getFuelRecursive = (mass) => {
    const additionalFuel = getFuel(mass);
    if (additionalFuel <= 0) {
        return 0;
    }
    else {
        return additionalFuel + getFuelRecursive(additionalFuel);
    }
};
exports.getFuelRecursive = getFuelRecursive;
