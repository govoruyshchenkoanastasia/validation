"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTree = exports.createTreeConstraints = void 0;
const validate_js_1 = require("validate.js");
function createTreeConstraints(documentSections, field, validatorName) {
    return {
        [field]: {
            [validatorName]: {
                data: field.split('.').reduce((acc, cur) => {
                    return acc[`${cur}`];
                }, documentSections),
                field
            }
        }
    };
}
exports.createTreeConstraints = createTreeConstraints;
function validateTree(documentSections, field, validatorName) {
    var _a, _b;
    const tmpModel = {
        [field]: field
            .split('.')
            .reduce((acc, cur) => acc[`${cur}`], documentSections)
    };
    return ((_b = (_a = (0, validate_js_1.validate)(tmpModel, createTreeConstraints(documentSections, field, validatorName))) === null || _a === void 0 ? void 0 : _a[field]) !== null && _b !== void 0 ? _b : []);
}
exports.validateTree = validateTree;
