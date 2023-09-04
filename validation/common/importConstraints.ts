import { approvalConstraints } from '@/validation/opop/0/approval'
import { conditionsConstraints } from '@/validation/opop/0/conditions'
import { titleConstraints } from '@/validation/opop/0/title'
import { docsConstraints } from '@/validation/opop/1/docs'
import { generalConstraints } from '@/validation/opop/1/general'
import { professionalConstraints } from '@/validation/opop/2/professional'
import { programCharacteristicsConstraints } from '@/validation/opop/3/programCharacteristics'
import { structureConstraints } from '@/validation/opop/5/structure'
import { changesTableConstraints } from '@/validation/opop/7/changesTable'
import { professionalStandardTableConstraints } from '@/validation/opop/8/professionalStandardTable'
import { workFunctionTableConstraints } from '@/validation/opop/8/workFunctionTable'

// common rp
import { approvalConstraints as approvalConstraintsRP } from '@/validation/rp/common/0/approval'
import { titleConstraints as titleConstraintsRP } from '@/validation/rp/common/0/title'
import { mainStructureConstraints } from '@/validation/rp/common/1/mainStructure'
import { annotationConstraints } from '@/validation/rp/common/2/annotation'
import { mainAfterNameSubjectConstraints } from '@/validation/rp/common/3/mainAfterNameSubject'
import { mainBeforeNameSubjectConstraints } from '@/validation/rp/common/3/mainBeforeNameSubject'
import { nameAfterSubjectTableConstraints } from '@/validation/rp/common/3/nameAfterSubjectTable'
import { nameBeforeSubjectTableConstraints } from '@/validation/rp/common/3/nameBeforeSubjectTable'
import { targetConstraints } from '@/validation/rp/common/3/target'
import { infoMaterialsConstraints } from '@/validation/rp/common/5/infoMaterials'
import { methodologicalAdditionalTableConstraints } from '@/validation/rp/common/5/methodologicalAdditional'
import { methodologicalMainTableConstraints } from '@/validation/rp/common/5/methodologicalMain'

// rpd
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
import { controlMethodsConstraints } from '@/validation/rp/rpd/6/controlMethods'
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

// rpgia
import { describeConstraints } from '@/validation/rp/rpgia/2/describe'
import { tasksConstraints } from '@/validation/rp/rpgia/4/tasks'
import { controlMethodsConstraints as controlMethodsConstraintsGIA } from '@/validation/rp/rpgia/7/controlMethods'
import { ratingCriteriaConstraints } from '@/validation/rp/rpgia/7/ratingCriteria'
import { themesConstraints } from '@/validation/rp/rpgia/7/themes'

// rpp
import { occupationConstraints } from '@/validation/rp/rpp/1/occupation'
import { practiceConstraints } from '@/validation/rp/rpp/4/practiceContent'
import { idzListConstraints } from '@/validation/rp/rpp/7/idzList'
import { compFormationConstraints } from '@/validation/rp/rpp/9/compFormation'
import { controlMethodsConstraints as controlMethodsConstraintsRPP } from '@/validation/rp/rpp/9/controlMethods'
import { marksCriteriasConstraints } from '@/validation/rp/rpp/9/marksCriterias'
import { tipicalQuestionsConstraints } from '@/validation/rp/rpp/9/typicalQuestions'

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
