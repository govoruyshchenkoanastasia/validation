"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.professionalConstraints = void 0;
const validators_1 = require("../../common/validators");
exports.professionalConstraints = {
    'professional.areas': {
        validateProfesionalSpheres: true
    },
    'professional.tasks': {
        validateArrayLength: {
            minimum: 1,
            errorText: '^Выберите хотя бы одно значение'
        }
    },
    'professional.spheres': {
        validateProfesionalSpheres: true
    },
    'professional.objects': {
        presence: validators_1.defaultPresenceSet
    }
};
