import {
  defaultPresenceSet,
  validationYearSet
} from '../../common/validators'

export const titleConstraints = {
  'general.directionType': {
    presence: defaultPresenceSet
  },
  general: {
    validateTitleGeneral: true
  },
  'general.plans': {
    presence: defaultPresenceSet
  },
  'general.programType': {
    presence: defaultPresenceSet
  },
  'general.programName': {
    presence: defaultPresenceSet
  },
  'general.studyingLevel': {
    presence: defaultPresenceSet
  },
  'general.studentQualification': {
    presence: defaultPresenceSet
  },
  'general.studyingForm': {
    presence: defaultPresenceSet
  },
  'general.studyPeriod': {
    presence: defaultPresenceSet
  },
  'general.department': {
    presence: defaultPresenceSet
  },
  'general.year': {
    numericality: validationYearSet
  }
}
