"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPOPTabConstraints = exports.RPPTabConstraints = exports.RPDTabsConstraints = exports.RPGIATabsConstraints = void 0;
const title_1 = require("../rp/common/0/title");
const approval_1 = require("../rp/common/0/approval");
const mainStructure_1 = require("../rp/common/1/mainStructure");
const describe_1 = require("../rp/rpgia/2/describe");
const tasks_1 = require("../rp/rpgia/4/tasks");
const methodologicalMain_1 = require("../rp/common/5/methodologicalMain");
const methodologicalAdditional_1 = require("../rp/common/5/methodologicalAdditional");
const infoMaterials_1 = require("../rp/common/5/infoMaterials");
const controlMethods_1 = require("../rp/rpgia/7/controlMethods");
const ratingCriteria_1 = require("../rp/rpgia/7/ratingCriteria");
const themes_1 = require("../rp/rpgia/7/themes");
// rpd
const annotation_1 = require("../rp/common/2/annotation");
const mainBeforeNameSubject_1 = require("../rp/common/3/mainBeforeNameSubject");
const mainAfterNameSubject_1 = require("../rp/common/3/mainAfterNameSubject");
const nameBeforeSubjectTable_1 = require("../rp/common/3/nameBeforeSubjectTable");
const nameAfterSubjectTable_1 = require("../rp/common/3/nameAfterSubjectTable");
const target_1 = require("../rp/common/3/target");
const case_1 = require("../rp/rpd/4/case");
const courseDesign_1 = require("../rp/rpd/4/courseDesign");
const courseLink_1 = require("../rp/rpd/4/courseLink");
const essay_1 = require("../rp/rpd/4/essay");
const idz_1 = require("../rp/rpd/4/idz");
const labs_1 = require("../rp/rpd/4/labs");
const organization_1 = require("../rp/rpd/4/organization");
const pracs_1 = require("../rp/rpd/4/pracs");
const presentation_1 = require("../rp/rpd/4/presentation");
const sectionContent_1 = require("../rp/rpd/4/sectionContent");
const srs_1 = require("../rp/rpd/4/srs");
const controlGraphicList_1 = require("../rp/rpd/6/controlGraphicList");
const controlMethods_2 = require("../rp/rpd/6/controlMethods");
const criteria_1 = require("../rp/rpd/6/criteria");
const examQuestionsTest_1 = require("../rp/rpd/6/examQuestionsTest");
const examQuestionsTickets_1 = require("../rp/rpd/6/examQuestionsTickets");
const examsQuestions_1 = require("../rp/rpd/6/examsQuestions");
const notRating_1 = require("../rp/rpd/6/notRating");
const offsetQuestions_1 = require("../rp/rpd/6/offsetQuestions");
const offsetQuestionsTest_1 = require("../rp/rpd/6/offsetQuestionsTest");
const offsetQuestionsTickets_1 = require("../rp/rpd/6/offsetQuestionsTickets");
const rating_1 = require("../rp/rpd/6/rating");
const testExample_1 = require("../rp/rpd/6/testExample");
const infoAndMatBase_1 = require("../rp/rpd/7/infoAndMatBase");
//rpp
const practiceContent_1 = require("../rp/rpp/4/practiceContent");
const idzList_1 = require("../rp/rpp/7/idzList");
const compFormation_1 = require("../rp/rpp/9/compFormation");
const controlMethods_3 = require("../rp/rpp/9/controlMethods");
const marksCriterias_1 = require("../rp/rpp/9/marksCriterias");
const typicalQuestions_1 = require("../rp/rpp/9/typicalQuestions");
// opop
const approval_2 = require("../opop/0/approval");
const conditions_1 = require("../opop/0/conditions");
const title_2 = require("../opop/0/title");
const docs_1 = require("../opop/1/docs");
const general_1 = require("../opop/1/general");
const professional_1 = require("../opop/2/professional");
const programCharacteristics_1 = require("../opop/3/programCharacteristics");
const structure_1 = require("../opop/5/structure");
const changesTable_1 = require("../opop/7/changesTable");
const professionalStandardTable_1 = require("../opop/8/professionalStandardTable");
const workFunctionTable_1 = require("../opop/8/workFunctionTable");
const treeValidation_1 = require("../common/treeValidation");
const validateAllSchemas_1 = require("../common/validateAllSchemas");
exports.RPGIATabsConstraints = {
    0: [title_1.titleConstraints, approval_1.approvalConstraints],
    1: [mainStructure_1.mainStructureConstraints],
    2: [describe_1.describeConstraints],
    4: [tasks_1.tasksConstraints],
    5: [
        methodologicalMain_1.methodologicalMainTableConstraints,
        methodologicalAdditional_1.methodologicalAdditionalTableConstraints,
        infoMaterials_1.infoMaterialsConstraints
    ],
    7: [controlMethods_1.controlMethodsConstraints, ratingCriteria_1.ratingCriteriaConstraints, themes_1.themesConstraints]
};
exports.RPDTabsConstraints = {
    0: [title_1.titleConstraints, approval_1.approvalConstraints],
    1: [mainStructure_1.mainStructureConstraints],
    2: [annotation_1.annotationConstraints],
    3: [
        mainAfterNameSubject_1.mainAfterNameSubjectConstraints,
        mainBeforeNameSubject_1.mainBeforeNameSubjectConstraints,
        nameAfterSubjectTable_1.nameAfterSubjectTableConstraints,
        nameBeforeSubjectTable_1.nameBeforeSubjectTableConstraints,
        target_1.targetConstraints
    ],
    4: [
        case_1.caseConstraints,
        courseDesign_1.courseDesignConstraints,
        courseLink_1.courseLinkConstraints,
        essay_1.essayConstraints,
        idz_1.idzConstraints,
        labs_1.labsConstraints,
        organization_1.organizationConstraints,
        pracs_1.pracsConstraints,
        presentation_1.presentationConstraints,
        sectionContent_1.sectionContentConstraints,
        srs_1.srsConstraints
    ],
    5: [
        methodologicalMain_1.methodologicalMainTableConstraints,
        methodologicalAdditional_1.methodologicalAdditionalTableConstraints,
        infoMaterials_1.infoMaterialsConstraints
    ],
    6: [
        controlMethods_2.controlMethodsConstraints,
        criteria_1.criteriaConstraints,
        examQuestionsTest_1.examQuestionsTestConstraints,
        examQuestionsTickets_1.examQuestionsTicketsConstraints,
        examsQuestions_1.examsQuestionsConstraints,
        notRating_1.notRatingConstraints,
        offsetQuestions_1.offsetQuestionsConstraints,
        offsetQuestionsTest_1.offsetQuestionsTestConstraints,
        offsetQuestionsTickets_1.offsetQuestionsTicketsConstraints,
        rating_1.ratingConstraints,
        testExample_1.testExampleConstraints,
        controlGraphicList_1.controlGraphicListConstraints
    ],
    7: [infoAndMatBase_1.infoAndMatBaseConstraints]
};
exports.RPPTabConstraints = {
    0: [title_1.titleConstraints, approval_1.approvalConstraints],
    1: [mainStructure_1.mainStructureConstraints],
    2: [annotation_1.annotationConstraints],
    3: [
        mainAfterNameSubject_1.mainAfterNameSubjectConstraints,
        mainBeforeNameSubject_1.mainBeforeNameSubjectConstraints,
        nameAfterSubjectTable_1.nameAfterSubjectTableConstraints,
        nameBeforeSubjectTable_1.nameBeforeSubjectTableConstraints,
        target_1.targetConstraints
    ],
    4: [practiceContent_1.practiceConstraints],
    5: [
        methodologicalMain_1.methodologicalMainTableConstraints,
        methodologicalAdditional_1.methodologicalAdditionalTableConstraints,
        infoMaterials_1.infoMaterialsConstraints
    ],
    7: [idzList_1.idzListConstraints],
    9: [
        compFormation_1.compFormationConstraints,
        controlMethods_3.controlMethodsConstraints,
        marksCriterias_1.marksCriteriasConstraints,
        typicalQuestions_1.tipicalQuestionsConstraints
    ]
};
function OPOPTabConstraints(data) {
    return {
        0: [approval_2.approvalConstraints, conditions_1.conditionsConstraints, title_2.titleConstraints],
        1: [docs_1.docsConstraints, general_1.generalConstraints],
        2: [
            professional_1.professionalConstraints,
            (0, treeValidation_1.createTreeConstraints)(data, validateAllSchemas_1.OPOPTreeValidationData.validateProfessional.field, validateAllSchemas_1.OPOPTreeValidationData.validateProfessional.validatorName)
        ],
        3: [programCharacteristics_1.programCharacteristicsConstraints],
        4: [
            (0, treeValidation_1.createTreeConstraints)(data, validateAllSchemas_1.OPOPTreeValidationData.validateGeneralProfessionalData.field, validateAllSchemas_1.OPOPTreeValidationData.validateGeneralProfessionalData.validatorName),
            (0, treeValidation_1.createTreeConstraints)(data, validateAllSchemas_1.OPOPTreeValidationData.validateBases.field, validateAllSchemas_1.OPOPTreeValidationData.validateBases.validatorName),
            (0, treeValidation_1.createTreeConstraints)(data, validateAllSchemas_1.OPOPTreeValidationData.validateProfessional4.field, validateAllSchemas_1.OPOPTreeValidationData.validateProfessional4.validatorName),
            (0, treeValidation_1.createTreeConstraints)(data, validateAllSchemas_1.OPOPTreeValidationData.validateObjects.field, validateAllSchemas_1.OPOPTreeValidationData.validateObjects.validatorName),
            (0, treeValidation_1.createTreeConstraints)(data, validateAllSchemas_1.OPOPTreeValidationData.validateUniversalData.field, validateAllSchemas_1.OPOPTreeValidationData.validateUniversalData.validatorName)
        ],
        5: [structure_1.structureConstraints],
        7: [changesTable_1.changesTableConstraints],
        8: [professionalStandardTable_1.professionalStandardTableConstraints, workFunctionTable_1.workFunctionTableConstraints]
    };
}
exports.OPOPTabConstraints = OPOPTabConstraints;
