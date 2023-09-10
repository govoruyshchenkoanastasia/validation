"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titleConstraints = void 0;
const validators_1 = require("../../../common/validators");
exports.titleConstraints = {
    'title.studyingLevel': {
        presence: validators_1.defaultPresenceSet
    },
    'title.directionType': {
        presence: validators_1.defaultPresenceSet
    },
    title: {
        validateDirectionCode: true
    },
    'title.plans': {
        validateTitle: true
    },
    'title.opop': {
        validateTitle: true
    },
    'title.planNameSubjects': {
        validateSubject: true
    },
    'title.planNameSubjects.studyProgramName': {
        presence: validators_1.defaultPresenceSet
    },
    'title.programType': {
        presence: validators_1.defaultPresenceSet
    },
    'title.rpdYear': {
        presence: validators_1.defaultPresenceSet
    }
};
