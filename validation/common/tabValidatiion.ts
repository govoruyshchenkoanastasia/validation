import { titleConstraints } from '../rp/common/0/title'
import { approvalConstraints } from '../rp/common/0/approval'
import { mainStructureConstraints } from '../rp/common/1/mainStructure'
import { describeConstraints } from '../rp/rpgia/2/describe'
import { tasksConstraints } from '../rp/rpgia/4/tasks'
import { methodologicalMainTableConstraints } from '../rp/common/5/methodologicalMain'
import { methodologicalAdditionalTableConstraints } from '../rp/common/5/methodologicalAdditional'
import { infoMaterialsConstraints } from '../rp/common/5/infoMaterials'
import { controlMethodsConstraints } from '../rp/rpgia/7/controlMethods'
import { ratingCriteriaConstraints } from '../rp/rpgia/7/ratingCriteria'
import { themesConstraints } from '../rp/rpgia/7/themes'

// rpd
import { annotationConstraints } from '../rp/common/2/annotation'
import { mainBeforeNameSubjectConstraints } from '../rp/common/3/mainBeforeNameSubject'
import { mainAfterNameSubjectConstraints } from '../rp/common/3/mainAfterNameSubject'
import { nameBeforeSubjectTableConstraints } from '../rp/common/3/nameBeforeSubjectTable'
import { nameAfterSubjectTableConstraints } from '../rp/common/3/nameAfterSubjectTable'
import { targetConstraints } from '../rp/common/3/target'
import { caseConstraints } from '../rp/rpd/4/case'
import { courseDesignConstraints } from '../rp/rpd/4/courseDesign'
import { courseLinkConstraints } from '../rp/rpd/4/courseLink'
import { essayConstraints } from '../rp/rpd/4/essay'
import { idzConstraints } from '../rp/rpd/4/idz'
import { labsConstraints } from '../rp/rpd/4/labs'
import { organizationConstraints } from '../rp/rpd/4/organization'
import { pracsConstraints } from '../rp/rpd/4/pracs'
import { presentationConstraints } from '../rp/rpd/4/presentation'
import { sectionContentConstraints } from '../rp/rpd/4/sectionContent'
import { srsConstraints } from '../rp/rpd/4/srs'
import { controlGraphicListConstraints } from '../rp/rpd/6/controlGraphicList'
import { controlMethodsConstraints as controlMethodsConstraintsRPD } from '../rp/rpd/6/controlMethods'
import { criteriaConstraints } from '../rp/rpd/6/criteria'
import { examQuestionsTestConstraints } from '../rp/rpd/6/examQuestionsTest'
import { examQuestionsTicketsConstraints } from '../rp/rpd/6/examQuestionsTickets'
import { examsQuestionsConstraints } from '../rp/rpd/6/examsQuestions'
import { notRatingConstraints } from '../rp/rpd/6/notRating'
import { offsetQuestionsConstraints } from '../rp/rpd/6/offsetQuestions'
import { offsetQuestionsTestConstraints } from '../rp/rpd/6/offsetQuestionsTest'
import { offsetQuestionsTicketsConstraints } from '../rp/rpd/6/offsetQuestionsTickets'
import { ratingConstraints } from '../rp/rpd/6/rating'
import { testExampleConstraints } from '../rp/rpd/6/testExample'
import { infoAndMatBaseConstraints } from '../rp/rpd/7/infoAndMatBase'

//rpp
import { practiceConstraints } from '../rp/rpp/4/practiceContent'
import { idzListConstraints } from '../rp/rpp/7/idzList'
import { compFormationConstraints } from '../rp/rpp/9/compFormation'
import { controlMethodsConstraints as controlMethodsConstraintsRPP } from '../rp/rpp/9/controlMethods'
import { marksCriteriasConstraints } from '../rp/rpp/9/marksCriterias'
import { tipicalQuestionsConstraints } from '../rp/rpp/9/typicalQuestions'

// opop
import { approvalConstraints as approvalConstraintsOPOP } from '../opop/0/approval'
import { conditionsConstraints } from '../opop/0/conditions'
import { titleConstraints as titleConstraintsOPOP } from '../opop/0/title'
import { docsConstraints } from '../opop/1/docs'
import { generalConstraints } from '../opop/1/general'
import { professionalConstraints } from '../opop/2/professional'
import { programCharacteristicsConstraints } from '../opop/3/programCharacteristics'
import { structureConstraints } from '../opop/5/structure'
import { changesTableConstraints } from '../opop/7/changesTable'
import { professionalStandardTableConstraints } from '../opop/8/professionalStandardTable'
import { workFunctionTableConstraints } from '../opop/8/workFunctionTable'
import { createTreeConstraints } from '../common/treeValidation'
import { OPOPTreeValidationData } from '../common/validateAllSchemas'

export interface ConstraintsInterface {
  [k: string]: any
}

export interface TabConstraintsInterface {
  [k: number]: ConstraintsInterface[]
}

export const RPGIATabsConstraints: TabConstraintsInterface = {
  0: [titleConstraints, approvalConstraints],
  1: [mainStructureConstraints],
  2: [describeConstraints],
  4: [tasksConstraints],
  5: [
    methodologicalMainTableConstraints,
    methodologicalAdditionalTableConstraints,
    infoMaterialsConstraints
  ],
  7: [controlMethodsConstraints, ratingCriteriaConstraints, themesConstraints]
}

export const RPDTabsConstraints: TabConstraintsInterface = {
  0: [titleConstraints, approvalConstraints],
  1: [mainStructureConstraints],
  2: [annotationConstraints],
  3: [
    mainAfterNameSubjectConstraints,
    mainBeforeNameSubjectConstraints,
    nameAfterSubjectTableConstraints,
    nameBeforeSubjectTableConstraints,
    targetConstraints
  ],
  4: [
    caseConstraints,
    courseDesignConstraints,
    courseLinkConstraints,
    essayConstraints,
    idzConstraints,
    labsConstraints,
    organizationConstraints,
    pracsConstraints,
    presentationConstraints,
    sectionContentConstraints,
    srsConstraints
  ],
  5: [
    methodologicalMainTableConstraints,
    methodologicalAdditionalTableConstraints,
    infoMaterialsConstraints
  ],
  6: [
    controlMethodsConstraintsRPD,
    criteriaConstraints,
    examQuestionsTestConstraints,
    examQuestionsTicketsConstraints,
    examsQuestionsConstraints,
    notRatingConstraints,
    offsetQuestionsConstraints,
    offsetQuestionsTestConstraints,
    offsetQuestionsTicketsConstraints,
    ratingConstraints,
    testExampleConstraints,
    controlGraphicListConstraints
  ],
  7: [infoAndMatBaseConstraints]
}

export const RPPTabConstraints: TabConstraintsInterface = {
  0: [titleConstraints, approvalConstraints],
  1: [mainStructureConstraints],
  2: [annotationConstraints],
  3: [
    mainAfterNameSubjectConstraints,
    mainBeforeNameSubjectConstraints,
    nameAfterSubjectTableConstraints,
    nameBeforeSubjectTableConstraints,
    targetConstraints
  ],
  4: [practiceConstraints],
  5: [
    methodologicalMainTableConstraints,
    methodologicalAdditionalTableConstraints,
    infoMaterialsConstraints
  ],
  7: [idzListConstraints],
  9: [
    compFormationConstraints,
    controlMethodsConstraintsRPP,
    marksCriteriasConstraints,
    tipicalQuestionsConstraints
  ]
}

export function OPOPTabConstraints(data: any): TabConstraintsInterface {
  return {
    0: [approvalConstraintsOPOP, conditionsConstraints, titleConstraintsOPOP],
    1: [docsConstraints, generalConstraints],
    2: [
      professionalConstraints,
      createTreeConstraints(
        data,
        OPOPTreeValidationData.validateProfessional.field,
        OPOPTreeValidationData.validateProfessional.validatorName
      )
    ],
    3: [programCharacteristicsConstraints],
    4: [
      createTreeConstraints(
        data,
        OPOPTreeValidationData.validateGeneralProfessionalData.field,
        OPOPTreeValidationData.validateGeneralProfessionalData.validatorName
      ),
      createTreeConstraints(
        data,
        OPOPTreeValidationData.validateBases.field,
        OPOPTreeValidationData.validateBases.validatorName
      ),
      createTreeConstraints(
        data,
        OPOPTreeValidationData.validateProfessional4.field,
        OPOPTreeValidationData.validateProfessional4.validatorName
      ),
      createTreeConstraints(
        data,
        OPOPTreeValidationData.validateObjects.field,
        OPOPTreeValidationData.validateObjects.validatorName
      ),
      createTreeConstraints(
        data,
        OPOPTreeValidationData.validateUniversalData.field,
        OPOPTreeValidationData.validateUniversalData.validatorName
      )
    ],
    5: [structureConstraints],
    7: [changesTableConstraints],
    8: [professionalStandardTableConstraints, workFunctionTableConstraints]
  }
}
