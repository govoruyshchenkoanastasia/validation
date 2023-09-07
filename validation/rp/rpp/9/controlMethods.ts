import { defaultPresenceSet } from '../../../common/validators'

export const controlMethodsConstraints = {
  'practiceMarks.controlMethod': {
    presence: defaultPresenceSet,
    validateImages: true
  }
}
