"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.describeConstraints = void 0;
const validators_1 = require("../../../common/validators");
exports.describeConstraints = {
    'annotaDisc.discAnnotRu': {
        presence: validators_1.defaultPresenceSet
    },
    'annotaDisc.discAnnotEn': {
        presence: validators_1.defaultPresenceSet
    }
};
