import { approvalConstraints } from '../opop/0/approval'
import { conditionsConstraints } from '../opop/0/conditions'
import { titleConstraints } from '../opop/0/title'
import { docsConstraints } from '../opop/1/docs'
import { generalConstraints } from '../opop/1/general'
import { professionalConstraints } from '../opop/2/professional'
import { programCharacteristicsConstraints } from '../opop/3/programCharacteristics'
import { structureConstraints } from '../opop/5/structure'
import { changesTableConstraints } from '../opop/7/changesTable'
import { professionalStandardTableConstraints } from '../opop/8/professionalStandardTable'
import { workFunctionTableConstraints } from '../opop/8/workFunctionTable'

// common rp
import { approvalConstraints as approvalConstraintsRP } from '../rp/common/0/approval'
import { titleConstraints as titleConstraintsRP } from '../rp/common/0/title'
import { mainStructureConstraints } from '../rp/common/1/mainStructure'
import { annotationConstraints } from '../rp/common/2/annotation'
import { mainAfterNameSubjectConstraints } from '../rp/common/3/mainAfterNameSubject'
import { mainBeforeNameSubjectConstraints } from '../rp/common/3/mainBeforeNameSubject'
import { nameAfterSubjectTableConstraints } from '../rp/common/3/nameAfterSubjectTable'
import { nameBeforeSubjectTableConstraints } from '../rp/common/3/nameBeforeSubjectTable'
import { targetConstraints } from '../rp/common/3/target'
import { infoMaterialsConstraints } from '../rp/common/5/infoMaterials'
import { methodologicalAdditionalTableConstraints } from '../rp/common/5/methodologicalAdditional'
import { methodologicalMainTableConstraints } from '../rp/common/5/methodologicalMain'

// rpd
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
import { controlMethodsConstraints } from '../rp/rpd/6/controlMethods'
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

// rpgia
import { describeConstraints } from '../rp/rpgia/2/describe'
import { tasksConstraints } from '../rp/rpgia/4/tasks'
import { controlMethodsConstraints as controlMethodsConstraintsGIA } from '../rp/rpgia/7/controlMethods'
import { ratingCriteriaConstraints } from '../rp/rpgia/7/ratingCriteria'
import { themesConstraints } from '../rp/rpgia/7/themes'

// rpp
import { occupationConstraints } from '../rp/rpp/1/occupation'
import { practiceConstraints } from '../rp/rpp/4/practiceContent'
import { idzListConstraints } from '../rp/rpp/7/idzList'
import { compFormationConstraints } from '../rp/rpp/9/compFormation'
import { controlMethodsConstraints as controlMethodsConstraintsRPP } from '../rp/rpp/9/controlMethods'
import { marksCriteriasConstraints } from '../rp/rpp/9/marksCriterias'
import { tipicalQuestionsConstraints } from '../rp/rpp/9/typicalQuestions'

export const OPOPConstraints = [
  approvalConstraints,
  conditionsConstraints,
  titleConstraints,
  docsConstraints,
  generalConstraints,
  professionalConstraints,
  programCharacteristicsConstraints,
  structureConstraints,
  changesTableConstraints,
  professionalStandardTableConstraints,
  workFunctionTableConstraints
]

export const RPCommonConstraints = [
  approvalConstraintsRP,
  titleConstraintsRP,
  mainStructureConstraints,
  infoMaterialsConstraints,
  methodologicalAdditionalTableConstraints,
  methodologicalMainTableConstraints
]

export const RPDConstraints = [
  caseConstraints,
  courseDesignConstraints,
  courseLinkConstraints,
  essayConstraints,
  idzConstraints,
  labsConstraints,
  targetConstraints,
  mainAfterNameSubjectConstraints,
  mainBeforeNameSubjectConstraints,
  nameAfterSubjectTableConstraints,
  nameBeforeSubjectTableConstraints,
  annotationConstraints,
  organizationConstraints,
  pracsConstraints,
  presentationConstraints,
  sectionContentConstraints,
  srsConstraints,
  controlGraphicListConstraints,
  controlMethodsConstraints,
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
  infoAndMatBaseConstraints
]

export const RPGIAConstraints = [
  describeConstraints,
  tasksConstraints,
  controlMethodsConstraintsGIA,
  ratingCriteriaConstraints,
  themesConstraints
]

export const RPPConstraints = [
  occupationConstraints,
  practiceConstraints,
  idzListConstraints,
  annotationConstraints,
  targetConstraints,
  mainAfterNameSubjectConstraints,
  mainBeforeNameSubjectConstraints,
  nameAfterSubjectTableConstraints,
  nameBeforeSubjectTableConstraints,
  compFormationConstraints,
  controlMethodsConstraintsRPP,
  marksCriteriasConstraints,
  tipicalQuestionsConstraints
]
