"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.docsConstraints = void 0;
const validators_1 = require("../../common/validators");
exports.docsConstraints = {
    'general.orderDate': {
        presence: validators_1.defaultPresenceSet
    },
    'general.orderNumber': {
        presence: validators_1.defaultPresenceSet
    }
};
