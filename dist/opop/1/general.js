"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generalConstraints = void 0;
const validators_1 = require("../../common/validators");
exports.generalConstraints = {
    'general.directionType': {
        presence: validators_1.defaultPresenceSet
    },
    'general.directionCode': {
        presence: validators_1.defaultPresenceSet
    },
    'general.directionTitle': {
        presence: validators_1.defaultPresenceSet
    },
    'general.programName': {
        presence: validators_1.defaultPresenceSet
    },
    'general.programType': {
        presence: validators_1.defaultPresenceSet
    },
    'general.studyingLevel': {
        presence: validators_1.defaultPresenceSet
    }
};
