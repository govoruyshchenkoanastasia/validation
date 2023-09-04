import { defaultPresenceSet } from '@/validation/common/validators'

export const titleConstraints = {
  'title.studyingLevel': {
    presence: defaultPresenceSet
  },
  'title.directionType': {
    presence: defaultPresenceSet
  },
  title: {
    validateDirectionCode: true
  },
  'title.plans': {
    validateTitle: true
  },
  'title.opop': {
    validateTitle: true
  },
  'title.planNameSubjects': {
    validateSubject: true
  },
  'title.planNameSubjects.studyProgramName': {
    presence: defaultPresenceSet
  },
  'title.programType': {
    presence: defaultPresenceSet
  },
  'title.rpdYear': {
    presence: defaultPresenceSet
  }
}
