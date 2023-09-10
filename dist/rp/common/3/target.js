"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.targetConstraints = void 0;
const validators_1 = require("../../../common/validators");
exports.targetConstraints = {
    'generalProv.educationGoals': {
        presence: validators_1.defaultPresenceSet
    },
    'generalProv.educationTasks': {
        presence: validators_1.defaultPresenceSet
    },
    'generalProv.educationKnowledge': {
        checkWordInclusionKnowledge: true
    },
    'generalProv.educationSkills': {
        checkWordInclusionSkills: true
    },
    'generalProv.educationAbilities': {
        checkWordInclusionAbilities: true
    }
};
