"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSchema = exports.validationYearSet = exports.defaultPresenceSet = exports.validateProfessional4 = exports.validateUniversalData = exports.validateObjects = exports.validateBases = exports.validateGeneralProfessionalData = exports.validateProfessional = exports.isOffsetWithMarkSelected = exports.isExamSelected = void 0;
const helpers_1 = require("../common/helpers");
const lodash_1 = require("lodash");
const validate_js_1 = require("validate.js");
const helpers_2 = require("../common/helpers");
const helpers_3 = require("../common/helpers");
const helpers_4 = require("../common/helpers");
const helpers_5 = require("../common/helpers");
const helpers_6 = require("../common/helpers");
// Функции вадидации для подключения (потом вынести в отдельный файл)
function createCheckWordInclusion(keyWord, translation) {
    return function (val) {
        return lodash_1.isEmpty(val)
            ? ['^Поле обязательное!']
            : !(0, helpers_1.checkWord)(val, keyWord)
                ? [`^Упомяните хотя бы по один раз слово "${translation}"`]
                : null;
    };
}
function createCheckProtocolNumber(type) {
    return function (value, options, key, attributes) {
        const errors = [];
        if (!attributes.approvalList[type]) {
            errors.push(helpers_3.errorTypes.needProtocolNumber);
        }
        if (errors.length > 0) {
            return errors;
        }
        return null;
    };
}
function validatePerson(name) {
    const split = name.split(',').length;
    return split !== 3 && split !== 2 && split !== 4
        ? [helpers_3.errorTypes.wrongPersonFormat]
        : [];
}
function validateYear(year) {
    if (lodash_1.isEmpty(year) || !year.match(/^([0-9]{4})([-//][0-9]{4})?$/)) {
        return [`^Введите год в виде "2021", "2021-2022", "2021/2022"`];
    }
    return [];
}
function validatePersonUser(name, user) {
    if (lodash_1.isEmpty(name) || lodash_1.isEmpty(user)) {
        return [];
    }
    const surname = user.surname;
    if (!name.includes(surname)) {
        return [
            `^В поле выбран пользователь ${(0, helpers_6.formatInitials)(user)}. Выберите нужного по кнопке справа поля или исправьте содержимое`
        ];
    }
    return [];
}
function validatorPersonForSchema(value) {
    if (lodash_1.isNil(value) || lodash_1.isEmpty(value)) {
        return [helpers_3.errorTypes.req];
    }
    const validationRes = validatePerson(value);
    if ((validationRes === null || validationRes === void 0 ? void 0 : validationRes.length) > 0) {
        return validationRes;
    }
    return null;
}
function createCheckTitleFields(field) {
    return function (value) {
        if (lodash_1.isNil(value === null || value === void 0 ? void 0 : value[field]) || (value === null || value === void 0 ? void 0 : value[field]) === '') {
            return [helpers_3.errorTypes.req];
        }
        return null;
    };
}
function createValidateNameSubjectTable(field, fieldTranslation) {
    return function (value, options, key, attributes) {
        var _a;
        if (((_a = attributes.generalProv) === null || _a === void 0 ? void 0 : _a[field]) &&
            attributes.generalProv[field] === fieldTranslation &&
            value &&
            value.length === 0) {
            return [helpers_3.errorTypes.leastOneSubject];
        }
        return null;
    };
}
function validateArrayLength(value, options) {
    if (value.length < options.minimum) {
        return [options.errorText];
    }
    return null;
}
function validateResourceTable(value) {
    value = value.map(v => {
        var _a, _b;
        const urls = (_a = v.nameAndDesc) === null || _a === void 0 ? void 0 : _a.match(/(((https?:\/\/)|(www\.))[^\s]+)/g);
        const url = lodash_1.last(urls);
        return {
            nameAndDesc: url
                ? (_b = v.nameAndDesc) === null || _b === void 0 ? void 0 : _b.replace(url, '').trim()
                : v.nameAndDesc,
            url
        };
    });
    const errors = [];
    if (lodash_1.isEmpty(value)) {
        errors.push(helpers_3.errorTypes.leastOneValue);
    }
    else {
        for (const item of value) {
            if (lodash_1.isEmpty(item) ||
                lodash_1.isUndefined(item.nameAndDesc) ||
                item.nameAndDesc === '') {
                errors.push('^Заполните столбец "Название ресурса"');
            }
            if (lodash_1.isUndefined(item.url)) {
                errors.push('^Заполните столбец "Электронный адрес"');
            }
            else if (item.url.match('deming.ru')) {
                errors.push('^Недопустимое значение электронного адреса: deming.ru');
            }
            else if (!item.url.match(helpers_2.Config.urlMask) ||
                item.url.trim().length !== item.url.match(helpers_2.Config.urlMask)[0].length) {
                errors.push('^Некорректное заполнения поля "Электронный адрес". Пример http://site.ru');
            }
        }
    }
    return errors.length > 0 ? errors : null;
}
function validateAdditionalTable(value) {
    const errors = [];
    if (lodash_1.isEmpty(value)) {
        errors.push(helpers_3.errorTypes.leastOneValue);
    }
    else {
        for (const item of value) {
            if (lodash_1.isEmpty(item) ||
                lodash_1.isUndefined(item.nameAndDesc) ||
                item.nameAndDesc === '') {
                errors.push('^Заполните столбец "Название, библиографическое описание"');
            }
            if (lodash_1.isEmpty(item) ||
                lodash_1.isUndefined(item.numberLibrary) ||
                item.numberLibrary === '') {
                errors.push('^Заполните столбец "К-во экз. в библ."');
            }
            if ((item === null || item === void 0 ? void 0 : item.numberLibrary) < 3) {
                errors.push('^Количество экземпляров должно быть больше 2 (для твердых копий)!');
            }
        }
    }
    return errors.length > 0 ? errors : null;
}
function validateImages(string) {
    if (!string) {
        return [];
    }
    const match = string.matchAll(/<img src="(?<url>[^>]+)"/gm);
    const errors = [];
    for (const m of match) {
        const src = m.groups.url;
        const isProd = process.env.NODE_ENV === 'production';
        if (!(src.includes('digital.etu.ru') ||
            (!isProd && src.includes('localhost')))) {
            errors.push(`^Изображение загружено неверно: <a href="${src}">${src}</a>. Пожалуйста, скачайте изображение на компьютер и вставьте его в документ с помощью кнопки "Загрузить изображение".`);
        }
    }
    return errors;
}
// from rpd
function createValidateRequiredDiscContentField(field) {
    return function (val, options, key, attributes) {
        var _a, _b;
        if (((_b = (_a = attributes === null || attributes === void 0 ? void 0 : attributes.discContent) === null || _a === void 0 ? void 0 : _a[field]) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            if (!val) {
                return [helpers_3.errorTypes.req];
            }
            else if (val && val.length < 100) {
                return [helpers_3.errorTypes.tooBrief];
            }
        }
        return null;
    };
}
function validateCourseDesign(val, options, key, attributes) {
    var _a, _b;
    if (((_b = (_a = attributes === null || attributes === void 0 ? void 0 : attributes.discContent) === null || _a === void 0 ? void 0 : _a.isCourse) === null || _b === void 0 ? void 0 : _b.length) > 0) {
        if (!val) {
            return [helpers_3.errorTypes.req];
        }
    }
    return null;
}
function createValidateTableLeastOne(field) {
    return function (val, options, key, attributes) {
        var _a, _b;
        if (((_b = (_a = attributes === null || attributes === void 0 ? void 0 : attributes.discContent) === null || _a === void 0 ? void 0 : _a[field]) === null || _b === void 0 ? void 0 : _b.length) > 0) {
            if ((val === null || val === void 0 ? void 0 : val.length) === 0 || !val) {
                return [helpers_3.errorTypes.leastOneTheme];
            }
        }
        return null;
    };
}
function validateCourseLink(val, options, key, attributes) {
    if (attributes.discContent.courseContentType &&
        attributes.discContent.courseContentType ===
            helpers_4.courseContentConfigType.courseFromLink) {
        if (!val) {
            return [helpers_3.errorTypes.req];
        }
    }
    return null;
}
function validateLabHours(val, options, key, attributes) {
    var _a;
    if (((_a = attributes === null || attributes === void 0 ? void 0 : attributes.discContent) === null || _a === void 0 ? void 0 : _a.areLabs.length) > 0) {
        const totalLabs = helpers_5.HelpersDiscContent.getTotalLabs(attributes.discContent);
        const totalAssignedLabs = helpers_5.HelpersDiscContent.getTotalAssignedLabs(attributes.discContent);
        if (totalLabs && totalLabs !== totalAssignedLabs) {
            return [`${helpers_3.errorTypes.totalNotEqualContent} (${totalLabs} ач)`];
        }
    }
    return null;
}
function validateLabList(val, options, key, attributes) {
    var _a, _b;
    const totalLabs = helpers_5.HelpersDiscContent.getTotalLabs(attributes.discContent);
    const totalAssignedLabs = helpers_5.HelpersDiscContent.getTotalAssignedLabs(attributes.discContent);
    if (((_b = (_a = attributes === null || attributes === void 0 ? void 0 : attributes.discContent) === null || _a === void 0 ? void 0 : _a.areLabs) === null || _b === void 0 ? void 0 : _b.length) > 0) {
        const errors = [];
        if (val && val.length === 0) {
            errors.push(helpers_3.errorTypes.leastOneWork);
        }
        if (totalLabs && totalLabs !== totalAssignedLabs) {
            errors.push(`${helpers_3.errorTypes.totalNotEqualContent} (${totalLabs} ач)`);
        }
        if (errors.length > 0) {
            return errors;
        }
    }
    return null;
}
function validateSRS(val, options, key, attributes) {
    if (attributes.discContent.discContent) {
        let totalSRS = 0;
        attributes.discContent.discContent.forEach((ds) => {
            if (ds.sr) {
                totalSRS += Number(ds.sr);
            }
        });
        let currentSRS = 0;
        attributes.discContent.organisation.srs.forEach((srs) => {
            if (srs.srsHours) {
                currentSRS += Number(srs.srsHours);
            }
        });
        if (totalSRS !== currentSRS) {
            return [`${helpers_3.errorTypes.totalNotEqualContent} (${totalSRS} ач)`];
        }
    }
    return null;
}
function validatePracs(val, options, key, attributes) {
    var _a, _b;
    if (((_b = (_a = attributes === null || attributes === void 0 ? void 0 : attributes.discContent) === null || _a === void 0 ? void 0 : _a.arePracs) === null || _b === void 0 ? void 0 : _b.length) > 0) {
        const totalPracs = helpers_5.HelpersDiscContent.getTotalPracs(attributes.discContent);
        const totalAssignedPracs = helpers_5.HelpersDiscContent.getTotalAssignedPracs(attributes.discContent);
        if (totalPracs && totalPracs !== totalAssignedPracs) {
            return [`${helpers_3.errorTypes.totalNotEqualContent} (${totalPracs} ач)`];
        }
    }
    return null;
}
function validatePracsList(val, options, key, attributes) {
    var _a, _b;
    const totalPracs = helpers_5.HelpersDiscContent.getTotalPracs(attributes.discContent);
    const totalAssignedPracs = helpers_5.HelpersDiscContent.getTotalAssignedPracs(attributes.discContent);
    if (((_b = (_a = attributes === null || attributes === void 0 ? void 0 : attributes.discContent) === null || _a === void 0 ? void 0 : _a.arePracs) === null || _b === void 0 ? void 0 : _b.length) > 0) {
        const errors = [];
        if (val && val.length === 0) {
            errors.push(helpers_3.errorTypes.leastOneWork);
        }
        if (totalPracs && totalPracs !== totalAssignedPracs) {
            errors.push(`${helpers_3.errorTypes.totalNotEqualContent} (${totalPracs} ач)`);
        }
        if (errors.length > 0) {
            return errors;
        }
    }
    return null;
}
function validateSectionContent(val, options, key, attributes) {
    const errors = [];
    const total = {
        lecs: 0,
        eLecs: 0,
        labs: 0,
        eLabs: 0,
        pracs: 0,
        ePracs: 0,
        icr: 0,
        sw: 0
    };
    if (attributes.discContent && attributes.discContent.discContent) {
        attributes.discContent.discContent.forEach((ds) => {
            if (ds.lecs) {
                total.lecs = Number(total.lecs) + Number(ds.lecs);
            }
            if (ds.eLecs) {
                total.eLecs = Number(total.eLecs) + Number(ds.eLecs);
            }
            if (ds.labs) {
                total.labs = Number(total.labs) + Number(ds.labs);
            }
            if (ds.eLabs) {
                total.eLabs = Number(total.eLabs) + Number(ds.eLabs);
            }
            if (ds.pracs) {
                total.pracs = Number(total.pracs) + Number(ds.pracs);
            }
            if (ds.ePracs) {
                total.ePracs = Number(total.ePracs) + Number(ds.ePracs);
            }
            if (ds.icr) {
                total.icr = Number(total.icr) + Number(ds.icr);
            }
            if (ds.sr) {
                total.sw = Number(total.sw) + Number(ds.sr);
            }
        });
    }
    if (attributes.occupationTypes) {
        if (lodash_1.isEmpty(attributes.discContent.discContent)) {
            errors.push(helpers_3.errorTypes.leastOneValue);
        }
        if (attributes.occupationTypes.hoursLec) {
            if (!total.lecs || total.lecs !== attributes.occupationTypes.hoursLec) {
                errors.push(`${helpers_3.errorTypes.lecsNotEqPlan} (${attributes.occupationTypes.hoursLec} ач)`);
            }
        }
        else if (Number(total.lecs) !== 0) {
            errors.push(`${helpers_3.errorTypes.lecsNotEqPlan} (${attributes.occupationTypes.hoursLec} ач)`);
        }
        if (attributes.occupationTypes.hoursLecRemote) {
            if (!total.eLecs ||
                total.eLecs !== attributes.occupationTypes.hoursLecRemote) {
                errors.push(`${helpers_3.errorTypes.elecsNotEqPlan} (${attributes.occupationTypes.hoursLecRemote} ач)`);
            }
        }
        else if (Number(total.eLecs) !== 0) {
            errors.push(`${helpers_3.errorTypes.elecsNotEqPlan} (${attributes.occupationTypes.hoursLecRemote} ач)`);
        }
        if (attributes.occupationTypes.hoursLab) {
            if (!total.labs || total.labs !== attributes.occupationTypes.hoursLab) {
                errors.push(`${helpers_3.errorTypes.labsNotEqPlan} (${attributes.occupationTypes.hoursLab} ач)`);
            }
        }
        else if (Number(total.labs) !== 0) {
            errors.push(`${helpers_3.errorTypes.labsNotEqPlan} (${attributes.occupationTypes.hoursLab} ач)`);
        }
        if (attributes.occupationTypes.hoursLabRemote) {
            if (!total.eLabs ||
                total.eLabs !== attributes.occupationTypes.hoursLabRemote) {
                errors.push(`${helpers_3.errorTypes.elabsNotEqPlan} (${attributes.occupationTypes.hoursLabRemote} ач)`);
            }
        }
        else if (Number(total.eLabs) !== 0) {
            errors.push(`${helpers_3.errorTypes.elabsNotEqPlan} (${attributes.occupationTypes.hoursLabRemote} ач)`);
        }
        if (attributes.occupationTypes.hoursPrac) {
            if (!total.pracs ||
                total.pracs !== attributes.occupationTypes.hoursPrac) {
                errors.push(`${helpers_3.errorTypes.pracsNotEqPlan} (${attributes.occupationTypes.hoursPrac} ач)`);
            }
        }
        else if (Number(total.pracs) !== 0) {
            errors.push(`${helpers_3.errorTypes.pracsNotEqPlan} (${attributes.occupationTypes.hoursPrac} ач)`);
        }
        if (attributes.occupationTypes.hoursPracRemote) {
            if (!total.ePracs ||
                total.ePracs !== attributes.occupationTypes.hoursPracRemote) {
                errors.push(`${helpers_3.errorTypes.epracsNotEqPlan} (${attributes.occupationTypes.hoursPracRemote} ач)`);
            }
        }
        else if (Number(total.ePracs) !== 0) {
            errors.push(`${helpers_3.errorTypes.epracsNotEqPlan} (${attributes.occupationTypes.hoursPracRemote} ач)`);
        }
        if (attributes.occupationTypes.otherContactWork) {
            if (!total.icr ||
                total.icr !== Number(attributes.occupationTypes.otherContactWork)) {
                errors.push(`${helpers_3.errorTypes.contactNotEqPlan} (${attributes.occupationTypes.otherContactWork} ач)`);
            }
        }
        else if (Number(total.icr) !== 0) {
            errors.push(`${helpers_3.errorTypes.contactNotEqPlan} (${attributes.occupationTypes.otherContactWork} ач)`);
        }
        if (attributes.occupationTypes.hoursSelfWork) {
            if (!total.sw || total.sw !== attributes.occupationTypes.hoursSelfWork) {
                errors.push(`${helpers_3.errorTypes.selfworkNotEqPlan} (${attributes.occupationTypes.hoursSelfWork} ач)`);
            }
        }
        else if (Number(total.sw) !== 0) {
            errors.push(`${helpers_3.errorTypes.selfworkNotEqPlan} (${attributes.occupationTypes.hoursSelfWork} ач)`);
        }
    }
    return errors.length > 0 ? errors : null;
}
// TODO try a little bit later
function validatorInfoAndMatBase(value, options, key, attributes) {
    // if ((!_.isArray(value) && !field) || _.isEmpty(value)) {
    //   return ['Это поле обязательно!']
    // }
    // const requiredCells = ['infoNum', 'infoType', 'infoAudit', 'infoRequir']
    // const wordsRequiringSoftware = ['ПК', 'ноутбук', 'компьютер', 'ЭВМ']
    // const wordsRequiringLecture = [
    //   'доска',
    //   'экран',
    //   'проектор',
    //   ...wordsRequiringSoftware
    // ]
    // const errors = []
    // const iterValue = field ? [value] : value
    // for (let i = 0; i < iterValue.length; i++) {
    //   const row = iterValue[i]
    //   const rowNumber = `№${row.infoNum ?? i + 1}${
    //     row.infoType ? ' "' + row.infoType + '"' : ''
    //   }`
    //   for (const cell of requiredCells) {
    //     if (_.isEmpty(row[cell]) && !_.isNumber(row[cell])) {
    //       errors.push([cell, `В строке ${rowNumber} не заполнен столбец`])
    //     }
    //   }
    //   const foundWordSoftware = wordsRequiringSoftware.find(w =>
    //     (row['infoRequir'] ?? '').includes(w)
    //   )
    //   if (foundWordSoftware && _.isEmpty(row['infoProg'])) {
    //     errors.push([
    //       'infoProg',
    //       `В строке ${rowNumber} необходимо описать "Требования к программному обеспечению", т.к. найдено ключевое слово "${foundWordSoftware}"`
    //     ])
    //   }
    //   if (!foundWordSoftware && !_.isEmpty(row['infoProg'])) {
    //     errors.push([
    //       'infoProg',
    //       `Столбец "Требования к программному обеспечению" строки ${rowNumber} должен быть пуст, т.к. не найдено ни одно из ключевых слов: "${wordsRequiringLecture.join(
    //         ', '
    //       )}"`
    //     ])
    //   }
    //   const foundWordLecture = wordsRequiringLecture.find(w =>
    //     (row['infoRequir'] ?? '').includes(w)
    //   )
    //   if (row['infoType'] === 'Лекция' && !foundWordLecture) {
    //     errors.push([
    //       'infoRequir',
    //       `В строке ${rowNumber} необходимо описать более подробно "Требования к помещению", т.к. не найдено ни одно из ключевых слов: "${wordsRequiringLecture.join(
    //         ', '
    //       )}"`
    //     ])
    //   }
    // }
    // return (field ? errors.filter(f => f[0] === field) : errors).map(f => f[1])
}
// TODO find documentSections Type
function isExamSelected(documentSections) {
    return ((documentSections.marks.type === 'рейтинговая система' &&
        documentSections.marks.rating.type.includes('экзамен')) ||
        (documentSections.marks.type === 'система без рейтинга' &&
            documentSections.marks.notRating.controls.includes('экзамен')));
}
exports.isExamSelected = isExamSelected;
function isOffsetWithMarkSelected(documentSections) {
    return ((documentSections.marks.type === 'рейтинговая система' &&
        documentSections.marks.rating.type.includes('дифф. зачет')) ||
        (documentSections.marks.type === 'система без рейтинга' &&
            documentSections.marks.notRating.controls.includes('зачет с оценкой')));
}
exports.isOffsetWithMarkSelected = isOffsetWithMarkSelected;
function validateExamQuestion(val, options, key, attributes) {
    if (isExamSelected(attributes)) {
        if (attributes.marks) {
            if (attributes.marks.rating.type.includes('экзамен') ||
                attributes.marks.notRating.controls.includes('экзамен')) {
                if ((attributes.marks.examQuestions.examForm === 'тестирование' &&
                    options.name === 'examTest' &&
                    !(val === null || val === void 0 ? void 0 : val.length)) ||
                    (attributes.marks.examQuestions.examForm === 'по билетам' &&
                        options.name === 'examTicket' &&
                        !(val === null || val === void 0 ? void 0 : val.length))) {
                    return [helpers_3.errorTypes.req];
                }
            }
        }
        else {
            if (attributes.rating.type.includes('экзамен') ||
                attributes.notRating.controls.includes('экзамен')) {
                if ((attributes.examQuestions.examForm === 'тестирование' &&
                    options.name === 'examTest' &&
                    !(val === null || val === void 0 ? void 0 : val.length)) ||
                    (attributes.examQuestions.examForm === 'по билетам' &&
                        options.name === 'examTicket' &&
                        !(val === null || val === void 0 ? void 0 : val.length))) {
                    return [helpers_3.errorTypes.req];
                }
            }
        }
    }
    return null;
}
function validateOffsetQuestion(val, options, key, attributes) {
    if (isOffsetWithMarkSelected(attributes)) {
        if (attributes.marks) {
            if (attributes.marks.rating.type.includes('дифф. зачет') ||
                attributes.marks.notRating.controls.includes('зачет с оценкой')) {
                if (attributes.marks.examQuestions &&
                    attributes.marks.examQuestions.offsetForm) {
                    if ((attributes.marks.examQuestions.offsetForm === 'тестирование' &&
                        options.name === 'offsetTest' &&
                        !(val === null || val === void 0 ? void 0 : val.length)) ||
                        (attributes.marks.examQuestions.offsetForm === 'по билетам' &&
                            options.name === 'offsetTicket' &&
                            !(val === null || val === void 0 ? void 0 : val.length))) {
                        return [helpers_3.errorTypes.req];
                    }
                }
            }
        }
        else {
            if (attributes.rating.type.includes('дифф. зачет') ||
                attributes.notRating.controls.includes('зачет с оценкой')) {
                if ((attributes.examQuestions.offsetForm === 'тестирование' &&
                    options.name === 'offsetTest' &&
                    !(val === null || val === void 0 ? void 0 : val.length)) ||
                    (attributes.examQuestions.offsetForm === 'по билетам' &&
                        options.name === 'offsetTicket' &&
                        !(val === null || val === void 0 ? void 0 : val.length))) {
                    return [helpers_3.errorTypes.req];
                }
            }
        }
    }
    return null;
}
function validateMarksRatingType(val, options, key, attributes) {
    if (attributes.marks) {
        if (attributes.marks.type && attributes.marks.type === options.markType) {
            if ((val && val.length === 0) || !val) {
                return [helpers_3.errorTypes[options.errorType]];
            }
        }
    }
    else {
        if (attributes.type && attributes.type === options.markType) {
            if ((val && val.length === 0) || !val) {
                return [helpers_3.errorTypes[options.errorType]];
            }
        }
    }
    return null;
}
function validateRatingExamMarks(val, options, key, attributes) {
    if (attributes.type &&
        attributes.type === 'рейтинговая система' &&
        (attributes.marks.rating.type.includes('экзамен') ||
            attributes.marks.rating.type.includes('дифф. зачет'))) {
        if (val && val.length === 0) {
            return [helpers_3.errorTypes.fillTable];
        }
    }
    return null;
}
function validateMarksNotRatingControls(val, options, key, attributes) {
    if (attributes.marks) {
        if (attributes.marks.type &&
            attributes.marks.type === 'система без рейтинга') {
            if (val && val.length === 0) {
                return [helpers_3.errorTypes.leastOneForm];
            }
        }
    }
    else {
        if (attributes.type && attributes.type === 'система без рейтинга') {
            if (val && val.length === 0) {
                return [helpers_3.errorTypes.leastOneForm];
            }
        }
    }
    return null;
}
function validateNotRatingExamMarks(val, options, key, attributes) {
    if (attributes.type &&
        attributes.type === 'система без рейтинга' &&
        attributes.notRating.controls.includes(options.controlType)) {
        if (val && val.length === 0) {
            return [helpers_3.errorTypes.fillTable];
        }
    }
    return null;
}
function validateNotRatingOffset(val, options, key, attributes) {
    if (attributes.marks) {
        if (attributes.marks.type &&
            attributes.marks.type === 'система без рейтинга' &&
            attributes.marks.notRating.controls.includes('зачет')) {
            if (!val) {
                return [helpers_3.errorTypes.req];
            }
        }
    }
    else {
        if (attributes.type &&
            attributes.type === 'система без рейтинга' &&
            attributes.notRating.controls.includes('зачет')) {
            if (!val) {
                return [helpers_3.errorTypes.req];
            }
        }
    }
    return null;
}
function validateExample(val, options, key, attributes) {
    if (attributes.marks) {
        if (attributes.marks.examQuestions.testForms &&
            attributes.marks.examQuestions.testForms.includes('контрольные (проверочные) работы')) {
            if (!val) {
                return [helpers_3.errorTypes.req];
            }
        }
    }
    else {
        if (attributes.examQuestions.testForms &&
            attributes.examQuestions.testForms.includes('контрольные (проверочные) работы')) {
            if (!val) {
                return [helpers_3.errorTypes.req];
            }
        }
    }
    return null;
}
function validateGIAMarksReviewer(val, options, key, attributes) {
    var _a;
    if (((_a = attributes.title) === null || _a === void 0 ? void 0 : _a.studyingLevel) === 'Магистратура' &&
        !attributes.giaMarks.isReviewer)
        return [
            '^Для магистров обязательно необходимо указать о наличии мнения рецензента для защиты ВКР'
        ];
    return null;
}
function validatePracticeContentStepsList(value) {
    let res = false;
    value.forEach((v) => {
        if (!res && (lodash_1.isEmpty(v.type) || lodash_1.isEmpty(v.controlForm))) {
            res = true;
        }
    });
    if (res) {
        return ['^Заполните пустые поля!'];
    }
    return null;
}
function validateCompFormation(value) {
    let res = false;
    value.forEach((v) => {
        if (!res && !(v.practiceLeader || v.leaderReview || v.report)) {
            res = true;
        }
    });
    if (res) {
        return ['^Заполните пустые строки!'];
    }
    return null;
}
function validateMarksCriterias(value) {
    let res = false;
    value.forEach((v) => {
        if (!res && lodash_1.isEmpty(v.description)) {
            res = true;
        }
    });
    if (res) {
        return ['^Заполните пустые строки!'];
    }
    return null;
}
function validateApprovalListPerson(value, options, key, attributes) {
    if (lodash_1.isNil(value) || lodash_1.isEmpty(value)) {
        return [helpers_3.errorTypes.req];
    }
    return [
        ...validatePerson(value),
        ...validatePersonUser(value, lodash_1.get(attributes, options.userRole))
    ];
}
function validateApprovalListDepHead(value, options, key, attributes) {
    var _a, _b, _c, _d, _e;
    const director = (_c = (_b = (_a = attributes.approvalList.director) === null || _a === void 0 ? void 0 : _a.match(/,[^,]*$/)) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : '';
    const valueName = (_e = (_d = value === null || value === void 0 ? void 0 : value.match(/,[^,]*$/)) === null || _d === void 0 ? void 0 : _d[0]) !== null && _e !== void 0 ? _e : '';
    if (director === valueName) {
        if (director !== '') {
            return [
                '^Если руководитель ОПОП зав. каф. или декан – то соответствующие строки исключаются!'
            ];
        }
        else {
            return [];
        }
    }
    else {
        return validatePersonUser(value, lodash_1.get(attributes, `approvalList[${options.userRole}]`));
    }
}
function validateApprovalListData(rows, options) {
    if (lodash_1.isEmpty(rows)) {
        return [helpers_3.errorTypes.req];
    }
    else {
        const errors = [];
        if (!options.field)
            return;
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            for (const column of options.field.columnDefs) {
                if (lodash_1.isEmpty(lodash_1.get(row, column.field))) {
                    // const found = this.columnDefs.find(
                    //   (c: any) => c.field === column.field
                    // )
                    const found = column;
                    errors.push(`^Строка ${i + 1}. Есть незаполненные поля${found ? ': ' + found.headerName : ''}`);
                }
            }
            const validationRes = [...validatePersonUser(row.leader, row.leaderUser)];
            if ((validationRes === null || validationRes === void 0 ? void 0 : validationRes.length) > 0) {
                errors.push(`^Строка ${i + 1}. Поле "Председатель". ${validationRes[0]}`);
            }
            const validationResYear = [...validateYear(row.year)];
            if ((validationResYear === null || validationResYear === void 0 ? void 0 : validationResYear.length) > 0) {
                errors.push(`^Строка ${i + 1}. Поле "Учебный год". ${validationResYear[0].slice(1)}`);
            }
        }
        return errors;
    }
    return [];
}
function validateConditions(value, options, key, attributes) {
    return attributes.general.needConditions
        ? lodash_1.isEmpty(value)
            ? [helpers_3.errorTypes.req]
            : []
        : [];
}
function validateProfesionalSpheres(value, options, key, attributes) {
    if (lodash_1.isEmpty(attributes.professional.spheres) &&
        lodash_1.isEmpty(attributes.professional.areas)) {
        return ['Необходимо ввести сферы или области профессиональной деятельности'];
    }
    return [];
}
function validateInteger(value, options) {
    if (lodash_1.isNil(value))
        return [helpers_3.errorTypes.req];
    if (options === null || options === void 0 ? void 0 : options.topConstraint) {
        if ((0, helpers_6.isNumeric)(value) &&
            parseInt(value) >= 0 &&
            parseInt(value) <= Number(options.topConstraint)) {
            return null;
        }
        else {
            return ['^Неправильное число'];
        }
    }
    if ((0, helpers_6.isNumeric)(value) && parseInt(value) >= 0) {
        return null;
    }
    return ['^Неправильное число'];
}
function validateEmptyField(value, options, key, attributes) {
    return lodash_1.isEmpty(attributes.supplement.professionalStandard)
        ? []
        : lodash_1.isEmpty(value)
            ? [helpers_3.errorTypes.req]
            : [];
}
function validateSupplementExp(value, options, key, attributes) {
    return attributes.supplement.needExperienceAnalysis
        ? lodash_1.isEmpty(value)
            ? [helpers_3.errorTypes.req]
            : []
        : [];
}
function validateSupplementProfStandard(value, options, key, attributes) {
    return lodash_1.isEmpty(attributes.supplement.professionalStandard)
        ? []
        : validateArrayLength(value, { minimum: 1 });
}
function validateExamForm(value, options, key, attributes) {
    return isExamSelected(attributes)
        ? lodash_1.isEmpty(value)
            ? [helpers_3.errorTypes.req]
            : []
        : [];
}
function validateOffsetQuestions(value, options, key, attributes) {
    return isOffsetWithMarkSelected(attributes)
        ? lodash_1.isEmpty(value)
            ? [helpers_3.errorTypes.req]
            : []
        : [];
}
// tree validation
function validateProfessional(value, options) {
    const possibleErrors = [
        '^Не выбрано ни одной области профессиональной деятельности',
        '^Есть задачи области без указания типов задач. Нажмите <em class="fas fa-chevron-circle-down"></em>, чтобы добавить строку на уровень ниже',
        '^Есть пустые типы задач',
        '^Есть пустые задачи'
    ].map(errorDescription => ({
        description: errorDescription,
        exist: false
    }));
    if (lodash_1.isEmpty(options.data)) {
        possibleErrors[0].exist = true;
    }
    for (const task of options.data) {
        if (lodash_1.isEmpty(task._children)) {
            possibleErrors[1].exist = true;
        }
        for (const base of (task === null || task === void 0 ? void 0 : task._children) || []) {
            if (lodash_1.isEmpty(base._children)) {
                possibleErrors[2].exist = true;
            }
            for (const subbase of (base === null || base === void 0 ? void 0 : base._children) || []) {
                if (lodash_1.isNil(subbase.value)) {
                    possibleErrors[3].exist = true;
                }
            }
        }
    }
    return possibleErrors
        .filter(error => error.exist)
        .map(error => error.description);
}
exports.validateProfessional = validateProfessional;
function validateGeneralProfessionalData(value, options) {
    const possibleErrors = [
        '^Это поле обязательно',
        '^Есть компетенции без кода. Нажмите на ячейку, чтобы добавить значение',
        '^Есть компетенции без индикаторов. Нажмите <em class="fas fa-chevron-circle-down"></em>, чтобы добавить строку на уровень ниже',
        '^Все индикаторы должны быть заполнены'
    ].map(errorDescription => ({
        description: errorDescription,
        exist: false
    }));
    if (lodash_1.isEmpty(options.data)) {
        possibleErrors[0].exist = true;
    }
    for (const datum of options.data) {
        if (lodash_1.isEmpty(datum.competence)) {
            possibleErrors[1].exist = true;
        }
        if (lodash_1.isEmpty(datum._children)) {
            possibleErrors[2].exist = true;
        }
        for (const indicator of (datum === null || datum === void 0 ? void 0 : datum._children) || []) {
            if (lodash_1.isEmpty(indicator.category)) {
                possibleErrors[3].exist = true;
            }
        }
    }
    return possibleErrors
        .filter(error => error.exist)
        .map(error => error.description);
}
exports.validateGeneralProfessionalData = validateGeneralProfessionalData;
function validateBases(value, options) {
    const possibleErrors = [
        '^Не выбрано ни одной задачи',
        '^Есть задачи без оснований. Нажмите <em class="fas fa-chevron-circle-down"></em>, чтобы добавить строку на уровень ниже',
        '^Есть пустые основания'
    ].map(errorDescription => ({
        description: errorDescription,
        exist: false
    }));
    if (lodash_1.isEmpty(options.data)) {
        possibleErrors[0].exist = true;
    }
    for (const task of options.data) {
        if (lodash_1.isEmpty(task._children)) {
            possibleErrors[1].exist = true;
        }
        for (const base of (task === null || task === void 0 ? void 0 : task._children) || []) {
            if (lodash_1.isNil(base.base)) {
                possibleErrors[2].exist = true;
            }
        }
    }
    return possibleErrors
        .filter(error => error.exist)
        .map(error => error.description);
}
exports.validateBases = validateBases;
function validateObjects(value, options) {
    const possibleErrors = [
        '^Не выбрано ни одной задачи',
        '^Есть задачи без объектов. Нажмите <em class="fas fa-chevron-circle-down"></em>, чтобы добавить строку на уровень ниже',
        '^Есть пустые объекты'
    ].map(errorDescription => ({
        description: errorDescription,
        exist: false
    }));
    if (lodash_1.isEmpty(options.data)) {
        possibleErrors[0].exist = true;
    }
    for (const task of options.data) {
        if (lodash_1.isEmpty(task._children)) {
            possibleErrors[1].exist = true;
        }
        for (const object of (task === null || task === void 0 ? void 0 : task._children) || []) {
            if (lodash_1.isEmpty(object.object) || lodash_1.isNil(object.object)) {
                possibleErrors[2].exist = true;
            }
        }
    }
    return possibleErrors
        .filter(error => error.exist)
        .map(error => error.description);
}
exports.validateObjects = validateObjects;
function validateUniversalData(value, options) {
    const possibleErrors = [
        '^Это поле обязательно',
        '^У каждой компетенции должен быть заполнены категория и код',
        '^Есть компетенции без индикаторов. Нажмите <em class="fas fa-chevron-circle-down"></em>, чтобы добавить строку на уровень ниже',
        '^Все индикаторы должны быть заполнены'
    ].map(errorDescription => ({
        description: errorDescription,
        exist: false
    }));
    if (lodash_1.isEmpty(options.data)) {
        possibleErrors[0].exist = true;
    }
    for (const datum of options.data) {
        if (lodash_1.isEmpty(datum.category) || lodash_1.isEmpty(datum.competence)) {
            possibleErrors[1].exist = true;
        }
        if (lodash_1.isEmpty(datum._children)) {
            possibleErrors[2].exist = true;
        }
        for (const indicator of (datum === null || datum === void 0 ? void 0 : datum._children) || []) {
            if (lodash_1.isEmpty(indicator.category)) {
                possibleErrors[3].exist = true;
            }
        }
    }
    return possibleErrors
        .filter(error => error.exist)
        .map(error => error.description);
}
exports.validateUniversalData = validateUniversalData;
function validateProfessional4(value, options) {
    const possibleErrors = [
        '^Не выбрано ни одной задачи',
        '^Есть задачи без компетенций. Нажмите <em class="fas fa-chevron-circle-down"></em>, чтобы добавить строку на уровень ниже',
        '^Есть незаполненные компетенции',
        '^Есть компетенции без индикаторов. Нажмите <em class="fas fa-chevron-circle-down"></em>, чтобы добавить строку на уровень ниже',
        '^Есть незаполненные индикаторы'
    ].map(errorDescription => ({
        description: errorDescription,
        exist: false
    }));
    if (lodash_1.isEmpty(options.data)) {
        possibleErrors[0].exist = true;
    }
    for (const task of options.data) {
        if (lodash_1.isEmpty(task._children)) {
            possibleErrors[1].exist = true;
        }
        for (const competence of (task === null || task === void 0 ? void 0 : task._children) || []) {
            if (lodash_1.isEmpty(competence.competence) || lodash_1.isNil(competence.competence)) {
                possibleErrors[2].exist = true;
            }
            if (lodash_1.isEmpty(competence._children)) {
                possibleErrors[3].exist = true;
            }
            for (const indicator of (competence === null || competence === void 0 ? void 0 : competence._children) || []) {
                if (lodash_1.isEmpty(indicator.competenceIndex) ||
                    lodash_1.isNil(indicator.competenceIndex)) {
                    possibleErrors[4].exist = true;
                }
            }
        }
    }
    return possibleErrors
        .filter(error => error.exist)
        .map(error => error.description);
}
exports.validateProfessional4 = validateProfessional4;
// Конец функций для подключения
exports.defaultPresenceSet = {
    allowEmpty: false,
    message: helpers_3.errorTypes.req
};
exports.validationYearSet = {
    onlyInteger: true,
    greaterThanOrEqualTo: 2000,
    lessThanOrEqualTo: 2100,
    notValid: '^Это поле обязательно!',
    notInteger: '^Значение должно быть целым числом',
    notGreaterThanOrEqualTo: '^Число слишком маленькое! Минимум: %{count}',
    notLessThanOrEqualTo: '^Число слишком большое! Максимум: %{count}'
};
const validateSchema = (model, constraints, field) => {
    const modelValidation = (0, validate_js_1.default)(model, constraints);
    return (modelValidation === null || modelValidation === void 0 ? void 0 : modelValidation[field.model]) ? modelValidation === null || modelValidation === void 0 ? void 0 : modelValidation[field.model] : null;
};
exports.validateSchema = validateSchema;
// Подключение валидаторов
validate_js_1.validators.checkWordInclusionKnowledge = createCheckWordInclusion('knowledge', 'знание');
validate_js_1.validators.checkWordInclusionSkills = createCheckWordInclusion('skills', 'умение');
validate_js_1.validators.checkWordInclusionAbilities = createCheckWordInclusion('abilities', 'навык');
validate_js_1.validators.checkDepProtocolNumber = createCheckProtocolNumber('depProtocolNumber');
validate_js_1.validators.checkComProtocolNumber = createCheckProtocolNumber('comProtocolNumber');
validate_js_1.validators.validatorPersonForSchema = validatorPersonForSchema;
validate_js_1.validators.validateDirectionCode = createCheckTitleFields('directionCode');
validate_js_1.validators.validateTitle = createCheckTitleFields('title');
validate_js_1.validators.validateSubject = createCheckTitleFields('subject');
validate_js_1.validators.validateNameBeforeSubjectTable = createValidateNameSubjectTable('learnSubject', 'Другое');
validate_js_1.validators.validateNameAfterSubjectTable = createValidateNameSubjectTable('futureSubject', 'Последующие дисциплины');
validate_js_1.validators.validateResourceTable = validateResourceTable;
validate_js_1.validators.validateAdditionalTable = validateAdditionalTable;
validate_js_1.validators.validateMainTable = validateAdditionalTable;
validate_js_1.validators.validateImages = validateImages;
validate_js_1.validators.validateCase = createValidateRequiredDiscContentField('isCase');
validate_js_1.validators.validateCourseDesign = validateCourseDesign;
validate_js_1.validators.validateCourseDesignThemes = createValidateTableLeastOne('isCourse');
validate_js_1.validators.validateCourseLink = validateCourseLink;
validate_js_1.validators.validateEssay = createValidateRequiredDiscContentField('isEssay');
validate_js_1.validators.validateEssayThemes = createValidateTableLeastOne('isEssay');
validate_js_1.validators.validateIDZ = createValidateRequiredDiscContentField('isIDZ');
validate_js_1.validators.validateLabHours = validateLabHours;
validate_js_1.validators.validateLabList = validateLabList;
validate_js_1.validators.validateSRS = validateSRS;
validate_js_1.validators.validatePracs = validatePracs;
validate_js_1.validators.validatePracsList = validatePracsList;
validate_js_1.validators.validatePresentation = createValidateRequiredDiscContentField('isPresentation');
validate_js_1.validators.validateSectionContent = validateSectionContent;
validate_js_1.validators.validatorInfoAndMatBase = validatorInfoAndMatBase;
validate_js_1.validators.validateExamQuestion = validateExamQuestion;
validate_js_1.validators.validateOffsetQuestion = validateOffsetQuestion;
validate_js_1.validators.validateMarksRatingType = validateMarksRatingType;
validate_js_1.validators.validateRatingExamMarks = validateRatingExamMarks;
validate_js_1.validators.validateMarksNotRatingControls = validateMarksNotRatingControls;
validate_js_1.validators.validateNotRatingExamMarks = validateNotRatingExamMarks;
validate_js_1.validators.validateNotRatingOffset = validateNotRatingOffset;
validate_js_1.validators.validateExample = validateExample;
validate_js_1.validators.validateGIAMarksReviewer = validateGIAMarksReviewer;
validate_js_1.validators.validatePracticeContentStepsList = validatePracticeContentStepsList;
validate_js_1.validators.validateCompFormation = validateCompFormation;
validate_js_1.validators.validateMarksCriterias = validateMarksCriterias;
// opop validation
validate_js_1.validators.validateApprovalListPerson = validateApprovalListPerson;
validate_js_1.validators.validateApprovalListDepHead = validateApprovalListDepHead;
validate_js_1.validators.validateApprovalListData = validateApprovalListData;
validate_js_1.validators.validateYear = validateYear;
validate_js_1.validators.validateConditions = validateConditions;
validate_js_1.validators.validateTitleGeneral = createCheckTitleFields('directionTitle');
validate_js_1.validators.validateProfesionalSpheres = validateProfesionalSpheres;
validate_js_1.validators.validateInteger = validateInteger;
validate_js_1.validators.validateEmptyField = validateEmptyField;
validate_js_1.validators.validateSupplementExp = validateSupplementExp;
validate_js_1.validators.validateProfessional = validateProfessional;
validate_js_1.validators.validateGeneralProfessionalData = validateGeneralProfessionalData;
validate_js_1.validators.validateBases = validateBases;
validate_js_1.validators.validateObjects = validateObjects;
validate_js_1.validators.validateUniversalData = validateUniversalData;
validate_js_1.validators.validateProfessional4 = validateProfessional4;
validate_js_1.validators.validateArrayLength = validateArrayLength;
validate_js_1.validators.validateSupplementProfStandard = validateSupplementProfStandard;
validate_js_1.validators.validateExamForm = validateExamForm;
validate_js_1.validators.validateOffsetQuestions = validateOffsetQuestions;
