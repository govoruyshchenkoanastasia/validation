"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.organizationConstraints = void 0;
const validators_1 = require("../../../common/validators");
exports.organizationConstraints = {
    'discContent.organisation.description': {
        presence: validators_1.defaultPresenceSet,
        validateImages: true
    }
};
