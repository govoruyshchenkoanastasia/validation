import { defaultPresenceSet } from '@/validation/common/validators'

export const criteriaConstraints = {
  'title.planNameSubjects.subject': {
    presence: defaultPresenceSet
  },
  'marks.type': {
    presence: defaultPresenceSet
  }
}
