"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RPPConstraints = exports.RPGIAConstraints = exports.RPDConstraints = exports.RPCommonConstraints = exports.OPOPConstraints = void 0;
const approval_1 = require("../opop/0/approval");
const conditions_1 = require("../opop/0/conditions");
const title_1 = require("../opop/0/title");
const docs_1 = require("../opop/1/docs");
const general_1 = require("../opop/1/general");
const professional_1 = require("../opop/2/professional");
const programCharacteristics_1 = require("../opop/3/programCharacteristics");
const structure_1 = require("../opop/5/structure");
const changesTable_1 = require("../opop/7/changesTable");
const professionalStandardTable_1 = require("../opop/8/professionalStandardTable");
const workFunctionTable_1 = require("../opop/8/workFunctionTable");
// common rp
const approval_2 = require("../rp/common/0/approval");
const title_2 = require("../rp/common/0/title");
const mainStructure_1 = require("../rp/common/1/mainStructure");
const annotation_1 = require("../rp/common/2/annotation");
const mainAfterNameSubject_1 = require("../rp/common/3/mainAfterNameSubject");
const mainBeforeNameSubject_1 = require("../rp/common/3/mainBeforeNameSubject");
const nameAfterSubjectTable_1 = require("../rp/common/3/nameAfterSubjectTable");
const nameBeforeSubjectTable_1 = require("../rp/common/3/nameBeforeSubjectTable");
const target_1 = require("../rp/common/3/target");
const infoMaterials_1 = require("../rp/common/5/infoMaterials");
const methodologicalAdditional_1 = require("../rp/common/5/methodologicalAdditional");
const methodologicalMain_1 = require("../rp/common/5/methodologicalMain");
// rpd
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
const controlMethods_1 = require("../rp/rpd/6/controlMethods");
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
// rpgia
const describe_1 = require("../rp/rpgia/2/describe");
const tasks_1 = require("../rp/rpgia/4/tasks");
const controlMethods_2 = require("../rp/rpgia/7/controlMethods");
const ratingCriteria_1 = require("../rp/rpgia/7/ratingCriteria");
const themes_1 = require("../rp/rpgia/7/themes");
// rpp
const occupation_1 = require("../rp/rpp/1/occupation");
const practiceContent_1 = require("../rp/rpp/4/practiceContent");
const idzList_1 = require("../rp/rpp/7/idzList");
const compFormation_1 = require("../rp/rpp/9/compFormation");
const controlMethods_3 = require("../rp/rpp/9/controlMethods");
const marksCriterias_1 = require("../rp/rpp/9/marksCriterias");
const typicalQuestions_1 = require("../rp/rpp/9/typicalQuestions");
exports.OPOPConstraints = [
    approval_1.approvalConstraints,
    conditions_1.conditionsConstraints,
    title_1.titleConstraints,
    docs_1.docsConstraints,
    general_1.generalConstraints,
    professional_1.professionalConstraints,
    programCharacteristics_1.programCharacteristicsConstraints,
    structure_1.structureConstraints,
    changesTable_1.changesTableConstraints,
    professionalStandardTable_1.professionalStandardTableConstraints,
    workFunctionTable_1.workFunctionTableConstraints
];
exports.RPCommonConstraints = [
    approval_2.approvalConstraints,
    title_2.titleConstraints,
    mainStructure_1.mainStructureConstraints,
    infoMaterials_1.infoMaterialsConstraints,
    methodologicalAdditional_1.methodologicalAdditionalTableConstraints,
    methodologicalMain_1.methodologicalMainTableConstraints
];
exports.RPDConstraints = [
    case_1.caseConstraints,
    courseDesign_1.courseDesignConstraints,
    courseLink_1.courseLinkConstraints,
    essay_1.essayConstraints,
    idz_1.idzConstraints,
    labs_1.labsConstraints,
    target_1.targetConstraints,
    mainAfterNameSubject_1.mainAfterNameSubjectConstraints,
    mainBeforeNameSubject_1.mainBeforeNameSubjectConstraints,
    nameAfterSubjectTable_1.nameAfterSubjectTableConstraints,
    nameBeforeSubjectTable_1.nameBeforeSubjectTableConstraints,
    annotation_1.annotationConstraints,
    organization_1.organizationConstraints,
    pracs_1.pracsConstraints,
    presentation_1.presentationConstraints,
    sectionContent_1.sectionContentConstraints,
    srs_1.srsConstraints,
    controlGraphicList_1.controlGraphicListConstraints,
    controlMethods_1.controlMethodsConstraints,
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
    infoAndMatBase_1.infoAndMatBaseConstraints
];
exports.RPGIAConstraints = [
    describe_1.describeConstraints,
    tasks_1.tasksConstraints,
    controlMethods_2.controlMethodsConstraints,
    ratingCriteria_1.ratingCriteriaConstraints,
    themes_1.themesConstraints
];
exports.RPPConstraints = [
    occupation_1.occupationConstraints,
    practiceContent_1.practiceConstraints,
    idzList_1.idzListConstraints,
    annotation_1.annotationConstraints,
    target_1.targetConstraints,
    mainAfterNameSubject_1.mainAfterNameSubjectConstraints,
    mainBeforeNameSubject_1.mainBeforeNameSubjectConstraints,
    nameAfterSubjectTable_1.nameAfterSubjectTableConstraints,
    nameBeforeSubjectTable_1.nameBeforeSubjectTableConstraints,
    compFormation_1.compFormationConstraints,
    controlMethods_3.controlMethodsConstraints,
    marksCriterias_1.marksCriteriasConstraints,
    typicalQuestions_1.tipicalQuestionsConstraints
];
