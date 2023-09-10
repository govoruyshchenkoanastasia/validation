"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationTypes = exports.isNumeric = exports.formatInitials = exports.HelpersDiscContent = exports.courseContentConfigType = exports.Config = exports.checkWord = exports.words = exports.errorTypes = void 0;
const lodash_1 = require("lodash");
var errorTypes;
(function (errorTypes) {
    errorTypes["req"] = "^\u042D\u0442\u043E \u043F\u043E\u043B\u0435 \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E!";
    errorTypes["leastOneForm"] = "^\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u043D\u0443 \u0444\u043E\u0440\u043C\u0443!";
    errorTypes["leastOneTheme"] = "^\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u043D\u0443 \u0442\u0435\u043C\u0443!";
    errorTypes["leastOneValue"] = "^\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u043D\u043E \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435!";
    errorTypes["leastOneWork"] = "^\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u043D\u0443 \u0440\u0430\u0431\u043E\u0442\u0443!";
    errorTypes["leastOneSubject"] = "^\u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0445\u043E\u0442\u044F \u0431\u044B \u043E\u0434\u0438\u043D \u043F\u0440\u0435\u0434\u043C\u0435\u0442!";
    errorTypes["tooBrief"] = "^\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0431\u043E\u043B\u0435\u0435 100 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432!";
    errorTypes["needProtocolNumber"] = "^\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u043C\u0435\u0440 \u043F\u0440\u043E\u0442\u043E\u043A\u043E\u043B\u0430";
    errorTypes["wrongPersonFormat"] = "^\u041D\u0435\u043F\u0440\u0430\u0432\u0438\u043B\u044C\u043D\u044B\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0437\u0430\u043F\u0438\u0441\u0438! \u0422\u0440\u0435\u0431\u0443\u0435\u0442\u0441\u044F: \"\u0434\u043E\u043B\u0436\u043D\u043E\u0441\u0442\u044C, \u0443\u0447.\u0441\u0442\u0435\u043F\u0435\u043D\u044C (\u0435\u0441\u043B\u0438 \u0435\u0441\u0442\u044C), \u0443\u0447. \u0437\u0432\u0430\u043D\u0438\u0435 (\u0435\u0441\u043B\u0438 \u0435\u0441\u0442\u044C) \u0418.\u041E. \u0424\u0430\u043C\u0438\u043B\u0438\u044F\"";
    errorTypes["fillTable"] = "^\u0417\u0430\u043F\u043E\u043B\u043D\u0438\u0442\u0435 \u0442\u0430\u0431\u043B\u0438\u0446\u0443!";
    errorTypes["invalidValue"] = "^\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435!";
    errorTypes["chooseForm"] = "^\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u043E\u0440\u043C\u0443!";
    errorTypes["enterInt"] = "^\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0446\u0435\u043B\u043E\u0435 \u0447\u0438\u0441\u043B\u043E!";
    errorTypes["enterPos"] = "^\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043F\u043E\u043B\u043E\u0436\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u0447\u0438\u0441\u043B\u043E!";
    errorTypes["totalNotEqualContent"] = "^\u0418\u0442\u043E\u0433\u043E\u0432\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 \u043D\u0435 \u0441\u043E\u0432\u043F\u0430\u0434\u0430\u0435\u0442 \u0441\u043E \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435\u043C \u0438\u0437 \u0441\u043E\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u044F \u0440\u0430\u0437\u0434\u0435\u043B\u043E\u0432 \u0434\u0438\u0441\u0446\u0438\u043F\u043B\u0438\u043D\u044B!";
    errorTypes["lecsNotEqPlan"] = "^\u0418\u0442\u043E\u0433\u043E\u0432\u044B\u0435 \u0447\u0430\u0441\u044B \u0434\u043B\u044F \u043B\u0435\u043A\u0446\u0438\u0439 \u043D\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0442 \u043F\u043B\u0430\u043D\u0443!";
    errorTypes["elecsNotEqPlan"] = "^\u0418\u0442\u043E\u0433\u043E\u0432\u044B\u0435 \u0447\u0430\u0441\u044B \u0434\u043B\u044F \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u044B\u0445 \u043B\u0435\u043A\u0446\u0438\u0439 \u043D\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0442 \u043F\u043B\u0430\u043D\u0443!";
    errorTypes["labsNotEqPlan"] = "^\u0418\u0442\u043E\u0433\u043E\u0432\u044B\u0435 \u0447\u0430\u0441\u044B \u0434\u043B\u044F \u043B\u0430\u0431\u043E\u0440\u0430\u0442\u043E\u0440\u043D\u044B\u0445 \u0437\u0430\u043D\u044F\u0442\u0438\u0439 \u043D\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0442 \u043F\u043B\u0430\u043D\u0443!";
    errorTypes["elabsNotEqPlan"] = "^\u0418\u0442\u043E\u0433\u043E\u0432\u044B\u0435 \u0447\u0430\u0441\u044B \u0434\u043B\u044F \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u044B\u0445 \u043B\u0430\u0431\u043E\u0440\u0430\u0442\u043E\u0440\u043D\u044B\u0445 \u0437\u0430\u043D\u044F\u0442\u0438\u0439 \u043D\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0442 \u043F\u043B\u0430\u043D\u0443!";
    errorTypes["pracsNotEqPlan"] = "^\u0418\u0442\u043E\u0433\u043E\u0432\u044B\u0435 \u0447\u0430\u0441\u044B \u0434\u043B\u044F \u043F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u0437\u0430\u043D\u044F\u0442\u0438\u0439 \u043D\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0442 \u043F\u043B\u0430\u043D\u0443!";
    errorTypes["epracsNotEqPlan"] = "^\u0418\u0442\u043E\u0433\u043E\u0432\u044B\u0435 \u0447\u0430\u0441\u044B \u0434\u043B\u044F \u044D\u043B\u0435\u043A\u0442\u0440\u043E\u043D\u043D\u044B\u0445 \u043F\u0440\u0430\u043A\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0445 \u0437\u0430\u043D\u044F\u0442\u0438\u0439 \u043D\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0442 \u043F\u043B\u0430\u043D\u0443!";
    errorTypes["contactNotEqPlan"] = "^\u0418\u0442\u043E\u0433\u043E\u0432\u044B\u0435 \u0447\u0430\u0441\u044B \u0434\u043B\u044F \u0438\u043D\u043E\u0439 \u043A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u043E\u0439 \u0440\u0430\u0431\u043E\u0442\u044B \u043D\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0442 \u043F\u043B\u0430\u043D\u0443!";
    errorTypes["selfworkNotEqPlan"] = "^\u0418\u0442\u043E\u0433\u043E\u0432\u044B\u0435 \u0447\u0430\u0441\u044B \u0434\u043B\u044F \u0441\u0430\u043C\u043E\u0441\u0442\u043E\u044F\u0442\u0435\u043B\u044C\u043D\u043E\u0439 \u0440\u0430\u0431\u043E\u0442\u044B \u043D\u0435 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0442 \u043F\u043B\u0430\u043D\u0443!";
})(errorTypes = exports.errorTypes || (exports.errorTypes = {}));
exports.words = {
    rpdPage31: {
        knowledge: [
            'знание',
            'знания',
            'знанию',
            'знанием',
            'знании',
            'знаний',
            'знаниям',
            'знаниями',
            'знаниях'
        ],
        skills: [
            'умение',
            'умения',
            'умению',
            'умением',
            'умении',
            'умений',
            'умениям',
            'умениями',
            'умениях'
        ],
        abilities: [
            'навык',
            'навыка',
            'навыку',
            'навыком',
            'навыке',
            'навыки',
            'навыков',
            'навыкам',
            'навыками',
            'навыках'
        ]
    }
};
function checkWord(val, type) {
    for (const item of exports.words.rpdPage31[type]) {
        const re = new RegExp('(^|\\s)' + item + '([^а-яёА-ЯЁ0-9a-zA-Z]|$)', 'i');
        if (val.match(re)) {
            return true;
        }
    }
    return false;
}
exports.checkWord = checkWord;
exports.Config = {
    urlsWithoutInterceptors: ['/logs/client'],
    systemTitle: {
        fullName: 'ИС "Индивидуальные образовательные траектории"',
        shortName: 'ИС "ИОТ"'
    },
    urlMask: /(((https?:\/\/)|(www\.))[^\s]+)/g,
    routing: {
        authPage: {
            path: '/auth',
            name: 'Авторизация в системе'
        },
        homePage: {
            path: '/about-project',
            name: 'О проекте'
        }
    },
    mobileWidth: 768,
    defaultWidth: 1000,
    latexDocs: `<a href="https://radioprog.ru/post/74">Краткая справка по синтаксису формул</a> (<a href="https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference">более обширная справка на английском</a>)`
};
var courseContentConfigType;
(function (courseContentConfigType) {
    courseContentConfigType["generate"] = "generate";
    courseContentConfigType["courseFromLink"] = "courseFromLink";
    courseContentConfigType["themesFromLink"] = "themesFromLink";
})(courseContentConfigType = exports.courseContentConfigType || (exports.courseContentConfigType = {}));
class HelpersDiscContent {
    static valueSetterAgReal(params) {
        var _a;
        const value = Number((_a = params.newValue) === null || _a === void 0 ? void 0 : _a.replace(',', '.'));
        if (lodash_1.isNumber(value) && value >= 0) {
            params.data[params.colDef.field] = Number(value.toFixed(2));
            return true;
        }
        return false;
    }
    static getTotalLabs(model) {
        let res = 0;
        model.discContent.forEach((dsc) => {
            res += Number(dsc.labs || 0) + Number(dsc.eLabs || 0);
        });
        return res;
    }
    static getTotalAssignedLabs(model) {
        let res = 0;
        model.labsList.forEach((l) => {
            res += Number(l.labHours || 0);
        });
        return res;
    }
    static getTotalPracs(model) {
        let res = 0;
        model.discContent.forEach((dsc) => {
            res += Number(dsc.pracs || 0) + Number(dsc.ePracs || 0);
        });
        return res;
    }
    static getTotalAssignedPracs(model) {
        let res = 0;
        model.pracsList.forEach((l) => {
            res += Number(l.pracHours || 0);
        });
        return res;
    }
    static setSRSTotal(api) {
        const totalRow = {
            srs: 'ИТОГО СРС',
            srsHours: 0
        };
        api.forEachNode((node) => {
            if (node.data.srsHours) {
                totalRow.srsHours += Number(node.data.srsHours);
            }
        });
        api.setPinnedBottomRowData([totalRow]);
    }
}
exports.HelpersDiscContent = HelpersDiscContent;
function formatInitials(user) {
    let res = user.name[0] + '.';
    if (user.midname) {
        res += user.midname[0] + '.';
    }
    res += ` ${user.surname}`;
    return res;
}
exports.formatInitials = formatInitials;
function isNumeric(value) {
    return /^-{0,1}\d+$/.test(value);
}
exports.isNumeric = isNumeric;
var notificationTypes;
(function (notificationTypes) {
    notificationTypes["awaitCoordinationDocument"] = "awaitCoordinationDocument";
    notificationTypes["awaitDepHeadCoordinationDocument"] = "awaitDepHeadCoordinationDocument";
    notificationTypes["awaitApprovalDocument"] = "awaitApprovalDocument";
    notificationTypes["changedDocumentRPDContent"] = "changedDocumentRPDContent";
    notificationTypes["changedDocumentOPOPContent"] = "changedDocumentOPOPContent";
    notificationTypes["changedDocumentRPDStatus"] = "changedDocumentRPDStatus";
    notificationTypes["changedDocumentOPOPStatus"] = "changedDocumentOPOPStatus";
    notificationTypes["changedDocumentRights"] = "changedDocumentRights";
    notificationTypes["changedGlobalRights"] = "changedGlobalRights";
    notificationTypes["changedRoles"] = "changedRoles";
    notificationTypes["changedStudentTrajectoryStatus"] = "changedStudentTrajectoryStatus";
    notificationTypes["awaitCoordinationStudentTrajectory"] = "awaitCoordinationStudentTrajectory";
    notificationTypes["moodleCourseDeleted"] = "moodleCourseDeleted";
    notificationTypes["moodleSectionCreated"] = "moodleSectionCreated";
    notificationTypes["moodleSectionDeleted"] = "moodleSectionDeleted";
    notificationTypes["moodleSectionUpdated"] = "moodleSectionUpdated";
})(notificationTypes = exports.notificationTypes || (exports.notificationTypes = {}));
