"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.annotationConstraints = void 0;
const validators_1 = require("../../../common/validators");
exports.annotationConstraints = {
    'title.planNameSubjects': {
        presence: validators_1.defaultPresenceSet
    },
    'annotaDisc.discAnnotRu': {
        presence: validators_1.defaultPresenceSet
    },
    'annotaDisc.disAnnotNameEn': {
        presence: validators_1.defaultPresenceSet
    },
    'annotaDisc.discAnnotEn': {
        presence: validators_1.defaultPresenceSet
    }
};
