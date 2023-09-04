import { titleConstraints } from '@/validation/rp/common/0/title'
import { approvalConstraints } from '@/validation/rp/common/0/approval'
import { mainStructureConstraints } from '@/validation/rp/common/1/mainStructure'
import { describeConstraints } from '@/validation/rp/rpgia/2/describe'
import { tasksConstraints } from '@/validation/rp/rpgia/4/tasks'
import { methodologicalMainTableConstraints } from '@/validation/rp/common/5/methodologicalMain'
import { methodologicalAdditionalTableConstraints } from '@/validation/rp/common/5/methodologicalAdditional'
import { infoMaterialsConstraints } from '@/validation/rp/common/5/infoMaterials'
import { controlMethodsConstraints } from '@/validation/rp/rpgia/7/controlMethods'
import { ratingCriteriaConstraints } from '@/validation/rp/rpgia/7/ratingCriteria'
import { themesConstraints } from '@/validation/rp/rpgia/7/themes'

// rpd
import { annotationConstraints } from '@/validation/rp/common/2/annotation'
import { mainBeforeNameSubjectConstraints } from '@/validation/rp/common/3/mainBeforeNameSubject'
import { mainAfterNameSubjectConstraints } from '@/validation/rp/common/3/mainAfterNameSubject'
import { nameBeforeSubjectTableConstraints } from '@/validation/rp/common/3/nameBeforeSubjectTable'
import { nameAfterSubjectTableConstraints } from '@/validation/rp/common/3/nameAfterSubjectTable'
import { targetConstraints } from '@/validation/rp/common/3/target'
import { caseConstraints } from '@/validation/rp/rpd/4/case'
import { courseDesignConstraints } from '@/validation/rp/rpd/4/courseDesign'
import { courseLinkConstraints } from '@/validation/rp/rpd/4/courseLink'
import { essayConstraints } from '@/validation/rp/rpd/4/essay'
import { idzConstraints } from '@/validation/rp/rpd/4/idz'
import { labsConstraints } from '@/validation/rp/rpd/4/labs'
import { organizationConstraints } from '@/validation/rp/rpd/4/organization'
import { pracsConstraints } from '@/validation/rp/rpd/4/pracs'
import { presentationConstraints } from '@/validation/rp/rpd/4/presentation'
import { sectionContentConstraints } from '@/validation/rp/rpd/4/sectionContent'
import { srsConstraints } from '@/validation/rp/rpd/4/srs'
import { controlGraphicListConstraints } from '@/validation/rp/rpd/6/controlGraphicList'
import { controlMethodsConstraints as controlMethodsConstraintsRPD } from '@/validation/rp/rpd/6/controlMethods'
import { criteriaConstraints } from '@/validation/rp/rpd/6/criteria'
import { examQuestionsTestConstraints } from '@/validation/rp/rpd/6/examQuestionsTest'
import { examQuestionsTicketsConstraints } from '@/validation/rp/rpd/6/examQuestionsTickets'
import { examsQuestionsConstraints } from '@/validation/rp/rpd/6/examsQuestions'
import { notRatingConstraints } from '@/validation/rp/rpd/6/notRating'
import { offsetQuestionsConstraints } from '@/validation/rp/rpd/6/offsetQuestions'
import { offsetQuestionsTestConstraints } from '@/validation/rp/rpd/6/offsetQuestionsTest'
import { offsetQuestionsTicketsConstraints } from '@/validation/rp/rpd/6/offsetQuestionsTickets'
import { ratingConstraints } from '@/validation/rp/rpd/6/rating'
import { testExampleConstraints } from '@/validation/rp/rpd/6/testExample'
import { infoAndMatBaseConstraints } from '@/validation/rp/rpd/7/infoAndMatBase'

//rpp
import { practiceConstraints } from '@/validation/rp/rpp/4/practiceContent'
import { idzListConstraints } from '@/validation/rp/rpp/7/idzList'
import { compFormationConstraints } from '@/validation/rp/rpp/9/compFormation'
import { controlMethodsConstraints as controlMethodsConstraintsRPP } from '@/validation/rp/rpp/9/controlMethods'
import { marksCriteriasConstraints } from '@/validation/rp/rpp/9/marksCriterias'
import { tipicalQuestionsConstraints } from '@/validation/rp/rpp/9/typicalQuestions'

// opop
import { approvalConstraints as approvalConstraintsOPOP } from '@/validation/opop/0/approval'
import { conditionsConstraints } from '@/validation/opop/0/conditions'
import { titleConstraints as titleConstraintsOPOP } from '@/validation/opop/0/title'
import { docsConstraints } from '@/validation/opop/1/docs'
import { generalConstraints } from '@/validation/opop/1/general'
import { professionalConstraints } from '@/validation/opop/2/professional'
import { programCharacteristicsConstraints } from '@/validation/opop/3/programCharacteristics'
import { structureConstraints } from '@/validation/opop/5/structure'
import { changesTableConstraints } from '@/validation/opop/7/changesTable'
import { professionalStandardTableConstraints } from '@/validation/opop/8/professionalStandardTable'
import { workFunctionTableConstraints } from '@/validation/opop/8/workFunctionTable'
import { createTreeConstraints } from '@/validation/common/treeValidation'
import { OPOPTreeValidationData } from '@/validation/common/validateAllSchemas'

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
