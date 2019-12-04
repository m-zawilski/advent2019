"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1_1 = require("./1");
describe('First Task tests', () => {
    test('Returns correct fuel numbers as on website. ', () => {
        expect(_1_1.getFuel(12)).toBe(2);
        expect(_1_1.getFuel(14)).toBe(2);
        expect(_1_1.getFuel(1969)).toBe(654);
        expect(_1_1.getFuel(100756)).toBe(33583);
    });
});
describe('Second Task tests', () => {
    test('Returns correct fuel numbers as on website. ', () => {
        expect(_1_1.getFuelRecursive(12)).toBe(2);
        expect(_1_1.getFuelRecursive(14)).toBe(2);
        expect(_1_1.getFuelRecursive(1969)).toBe(966);
        expect(_1_1.getFuelRecursive(100756)).toBe(50346);
    });
});
