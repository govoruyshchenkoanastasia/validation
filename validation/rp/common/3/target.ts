import { defaultPresenceSet } from '../../../common/validators'

export const targetConstraints = {
  'generalProv.educationGoals': {
    presence: defaultPresenceSet
  },
  'generalProv.educationTasks': {
    presence: defaultPresenceSet
  },
  'generalProv.educationKnowledge': {
    checkWordInclusionKnowledge: true
  },
  'generalProv.educationSkills': {
    checkWordInclusionSkills: true
  },
  'generalProv.educationAbilities': {
    checkWordInclusionAbilities: true
  }
}
