import { defaultPresenceSet } from '@/validation/common/validators'

export const mainStructureConstraints = {
  'discStructure.provFaculty': {
    presence: defaultPresenceSet
  },
  'discStructure.provDepartment': {
    presence: defaultPresenceSet
  },
  'occupationTypes.laborZET': {
    presence: defaultPresenceSet
  }
}
