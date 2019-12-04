"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readFile_1 = __importDefault(require("../common/readFile"));
const util_1 = require("util");
const question3 = async () => {
    readFile_1.default(3).then(data => {
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
exports.question3 = question3;
const getFirstAnswer = (data) => {
    const [firstCableString, secondCableString] = data.split('\n');
    const firstCable = getCable(firstCableString.split(','));
    const secondCable = getCable(secondCableString.split(','));
    const intersections = findIntersections(firstCable, secondCable);
    console.log(`1) Result is: ${findShortestDistance(intersections)}`);
};
const getSecondAnswer = (data) => {
    const [firstCableString, secondCableString] = data.split('\n');
    const firstCable = getCable(firstCableString.split(','));
    const secondCable = getCable(secondCableString.split(','));
    const intersections = findIntersections(firstCable, secondCable);
    console.log(`2) Result is: ${findMinCableLength(firstCable, secondCable, intersections)}`);
};
const findMinCableLength = (firstCable, secondCable, intersections) => {
    const distances = intersections.map((intersection) => {
        return getLength(firstCable, secondCable, intersection);
    });
    return distances.reduce((min, distance) => {
        return distance < min ? distance : min;
    }, Infinity);
};
exports.findMinCableLength = findMinCableLength;
const getLength = (cable1, cable2, intersection) => {
    let length = 0;
    const { firstCableLineNumber, secondCableLineNumber } = intersection.intersectionMetadata;
    for (let i = 0; i < firstCableLineNumber; i++) {
        length += Math.abs(cable1.lines[i].end - cable1.lines[i].start);
    }
    for (let i = 0; i < secondCableLineNumber; i++) {
        length += Math.abs(cable2.lines[i].end - cable2.lines[i].start);
    }
    if (cable1.lines[firstCableLineNumber].horizontal) {
        length += Math.abs(cable1.lines[firstCableLineNumber].start - intersection.x);
    }
    else {
        length += Math.abs(cable1.lines[firstCableLineNumber].start - intersection.y);
    }
    if (cable2.lines[firstCableLineNumber].horizontal) {
        length += Math.abs(cable2.lines[secondCableLineNumber].start - intersection.x);
    }
    else {
        length += Math.abs(cable2.lines[secondCableLineNumber].start - intersection.y);
    }
    return length;
};
const getCable = (data) => {
    let lines = [];
    let line = {
        position: 0,
        start: 0,
        end: 0,
        horizontal: false
    };
    for (let i = 0; i < data.length; i++) {
        line = getLine(data[i], line.end, line.position);
        lines.push(line);
    }
    return { lines };
};
exports.getCable = getCable;
const getLine = (data, previousEnd = 0, previousPosition = 0) => {
    const direction = data.substring(0, 1);
    const translation = Number.parseInt(data.substring(1));
    switch (direction) {
        case 'U':
            return {
                position: previousEnd,
                start: previousPosition,
                end: previousPosition + translation,
                horizontal: false
            };
        case 'R':
            return {
                position: previousEnd,
                start: previousPosition,
                end: previousPosition + translation,
                horizontal: true
            };
        case 'D':
            return {
                position: previousEnd,
                start: previousPosition,
                end: previousPosition - translation,
                horizontal: false
            };
        case 'L':
            return {
                position: previousEnd,
                start: previousPosition,
                end: previousPosition - translation,
                horizontal: true
            };
        default:
            throw 'Wrong direction letter ' + direction;
    }
};
exports.getLine = getLine;
const findShortestDistance = (points) => {
    return points.reduce((min, p) => {
        const distance = Math.abs(p.x) + Math.abs(p.y);
        return distance < min ? distance : min;
    }, Infinity);
};
exports.findShortestDistance = findShortestDistance;
const findIntersections = (firstCable, secondCable) => {
    let intersections = [];
    firstCable.lines.map((line1, i) => {
        secondCable.lines.map((line2, j) => {
            if (line1.horizontal && !line2.horizontal && intersects(line1, line2)) {
                intersections.push({
                    x: line2.position,
                    y: line1.position,
                    intersectionMetadata: {
                        firstCableLineNumber: i,
                        secondCableLineNumber: j
                    }
                });
            }
            else if (!line1.horizontal && line2.horizontal && intersects(line1, line2)) {
                intersections.push({
                    x: line1.position,
                    y: line2.position,
                    intersectionMetadata: {
                        firstCableLineNumber: i,
                        secondCableLineNumber: j
                    }
                });
            }
        });
    });
    return intersections.filter(p => p.x !== 0 && p.y !== 0);
};
exports.findIntersections = findIntersections;
const intersects = (vLine, hLine) => {
    const vAbsoluteStart = Math.min(vLine.start, vLine.end);
    const vAbsoluteEnd = Math.max(vLine.start, vLine.end);
    const hAbsoluteStart = Math.min(hLine.start, hLine.end);
    const hAbsoluteEnd = Math.max(hLine.start, hLine.end);
    if (hLine.position <= vAbsoluteEnd && hLine.position >= vAbsoluteStart
        && vLine.position <= hAbsoluteEnd && vLine.position >= hAbsoluteStart) {
        return true;
    }
    return false;
};
