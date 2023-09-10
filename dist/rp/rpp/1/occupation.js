"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.occupationConstraints = void 0;
const validators_1 = require("../../../common/validators");
exports.occupationConstraints = {
    'general.practiceType': {
        presence: validators_1.defaultPresenceSet
    },
    'general.practiceApproach': {
        presence: validators_1.defaultPresenceSet
    },
    'general.practiceForm': {
        presence: validators_1.defaultPresenceSet
    }
};
