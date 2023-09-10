"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.structureConstraints = void 0;
exports.structureConstraints = {
    'structure.mainProcent': {
        validateInteger: {
            topConstraint: 100
        }
    },
    'structure.block1': {
        validateInteger: true
    },
    'structure.block2': {
        validateInteger: true
    },
    'structure.block3': {
        validateInteger: true
    },
    'structure.all': {
        validateInteger: true
    }
};
