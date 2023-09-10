"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.titleConstraints = void 0;
const validators_1 = require("../../common/validators");
exports.titleConstraints = {
    'general.directionType': {
        presence: validators_1.defaultPresenceSet
    },
    general: {
        validateTitleGeneral: true
    },
    'general.plans': {
        presence: validators_1.defaultPresenceSet
    },
    'general.programType': {
        presence: validators_1.defaultPresenceSet
    },
    'general.programName': {
        presence: validators_1.defaultPresenceSet
    },
    'general.studyingLevel': {
        presence: validators_1.defaultPresenceSet
    },
    'general.studentQualification': {
        presence: validators_1.defaultPresenceSet
    },
    'general.studyingForm': {
        presence: validators_1.defaultPresenceSet
    },
    'general.studyPeriod': {
        presence: validators_1.defaultPresenceSet
    },
    'general.department': {
        presence: validators_1.defaultPresenceSet
    },
    'general.year': {
        numericality: validators_1.validationYearSet
    }
};
