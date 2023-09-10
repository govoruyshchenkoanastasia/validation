"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateOnAllConstraints = exports.OPOPTreeValidationData = exports.OPOPTreeValidators = exports.docType = exports.DocType = void 0;
const validate_js_1 = require("validate.js");
const importConstraints_1 = require("../common/importConstraints");
const lodash_1 = require("lodash");
const treeValidation_1 = require("../common/treeValidation");
var DocType;
(function (DocType) {
    DocType["OPOP"] = "OPOP";
    DocType["RPD"] = "RPD";
    DocType["RPGIA"] = "RPGIA";
    DocType["RPP"] = "RPP";
})(DocType = exports.DocType || (exports.DocType = {}));
exports.docType = {
    [DocType.OPOP]: importConstraints_1.OPOPConstraints,
    [DocType.RPD]: [...importConstraints_1.RPCommonConstraints, ...importConstraints_1.RPDConstraints],
    [DocType.RPGIA]: [...importConstraints_1.RPCommonConstraints, ...importConstraints_1.RPGIAConstraints],
    [DocType.RPP]: [...importConstraints_1.RPCommonConstraints, ...importConstraints_1.RPPConstraints]
};
var OPOPTreeValidators;
(function (OPOPTreeValidators) {
    OPOPTreeValidators["validateProfessional"] = "validateProfessional";
    OPOPTreeValidators["validateGeneralProfessionalData"] = "validateGeneralProfessionalData";
    OPOPTreeValidators["validateBases"] = "validateBases";
    OPOPTreeValidators["validateObjects"] = "validateObjects";
    OPOPTreeValidators["validateUniversalData"] = "validateUniversalData";
    OPOPTreeValidators["validateProfessional4"] = "validateProfessional4";
})(OPOPTreeValidators = exports.OPOPTreeValidators || (exports.OPOPTreeValidators = {}));
exports.OPOPTreeValidationData = {
    [OPOPTreeValidators.validateProfessional]: {
        field: 'professional.taskRows',
        validatorName: 'validateProfessional',
        tabIndex: 2
    },
    [OPOPTreeValidators.validateGeneralProfessionalData]: {
        field: 'programResults.generalProfessionalData',
        validatorName: 'validateGeneralProfessionalData',
        tabIndex: 4
    },
    [OPOPTreeValidators.validateBases]: {
        field: 'programResults.professionalData.bases',
        validatorName: 'validateBases',
        tabIndex: 4
    },
    [OPOPTreeValidators.validateObjects]: {
        field: 'programResults.professionalData.objects',
        validatorName: 'validateObjects',
        tabIndex: 4
    },
    [OPOPTreeValidators.validateUniversalData]: {
        field: 'programResults.universalData',
        validatorName: 'validateUniversalData',
        tabIndex: 4
    },
    [OPOPTreeValidators.validateProfessional4]: {
        field: 'programResults.professionalData.competences',
        validatorName: 'validateProfessional4',
        tabIndex: 4
    }
};
function validateOnAllConstraints(model, type) {
    let validationResult = [];
    const constraints = [...exports.docType[type]];
    if (type === DocType.OPOP) {
        const OPOPTreeConstraints = Object.values(exports.OPOPTreeValidationData).map(c => (0, treeValidation_1.createTreeConstraints)(model, c.field, c.validatorName));
        constraints.push(...OPOPTreeConstraints);
    }
    constraints.forEach((c) => {
        validationResult.push((0, validate_js_1.validate)(model, c));
    });
    validationResult = lodash_1.compact(validationResult)
        .map(r => Object.values(r))
        .flat(2);
    return validationResult.length;
}
exports.validateOnAllConstraints = validateOnAllConstraints;
