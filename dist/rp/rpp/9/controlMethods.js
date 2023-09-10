"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controlMethodsConstraints = void 0;
const validators_1 = require("../../../common/validators");
exports.controlMethodsConstraints = {
    'practiceMarks.controlMethod': {
        presence: validators_1.defaultPresenceSet,
        validateImages: true
    }
};
