"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainStructureConstraints = void 0;
const validators_1 = require("../../../common/validators");
exports.mainStructureConstraints = {
    'discStructure.provFaculty': {
        presence: validators_1.defaultPresenceSet
    },
    'discStructure.provDepartment': {
        presence: validators_1.defaultPresenceSet
    },
    'occupationTypes.laborZET': {
        presence: validators_1.defaultPresenceSet
    }
};
