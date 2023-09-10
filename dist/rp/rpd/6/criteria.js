"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.criteriaConstraints = void 0;
const validators_1 = require("../../../common/validators");
exports.criteriaConstraints = {
    'title.planNameSubjects.subject': {
        presence: validators_1.defaultPresenceSet
    },
    'marks.type': {
        presence: validators_1.defaultPresenceSet
    }
};
