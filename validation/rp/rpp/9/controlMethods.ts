import { defaultPresenceSet } from '@/validation/common/validators'

export const controlMethodsConstraints = {
  'practiceMarks.controlMethod': {
    presence: defaultPresenceSet,
    validateImages: true
  }
}
