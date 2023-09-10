"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approvalConstraints = void 0;
const validators_1 = require("../../../common/validators");
exports.approvalConstraints = {
    'approvalList.developer': {
        validatorPersonForSchema: true
    },
    'approvalList.department': {
        presence: validators_1.defaultPresenceSet
    },
    'approvalList.depDate': {
        presence: validators_1.defaultPresenceSet
    },
    'approvalList.depProtocolNumber': {
        checkDepProtocolNumber: true
    },
    'approvalList.departmentHead': {
        validatorPersonForSchema: true
    },
    'approvalList.faculty': {
        presence: validators_1.defaultPresenceSet
    },
    'approvalList.comDate': {
        presence: validators_1.defaultPresenceSet
    },
    'approvalList.comProtocolNumber': {
        checkComProtocolNumber: true
    },
    'approvalList.comHead': {
        validatorPersonForSchema: true
    }
};
