"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.approvalItemConstraints = void 0;
const validators_1 = require("../../common/validators");
exports.approvalItemConstraints = {
    faculty: {
        presence: validators_1.defaultPresenceSet
    },
    year: {
        validateYear: true
    },
    protocolNumber: {
        presence: validators_1.defaultPresenceSet
    },
    date: {
        presence: validators_1.defaultPresenceSet
    },
    leader: {
        validateApprovalListPerson: {
            userRole: 'leaderUser'
        }
    }
};
