import { defaultPresenceSet } from '@/validation/common/validators'

export const annotationConstraints = {
  'title.planNameSubjects': {
    presence: defaultPresenceSet
  },
  'annotaDisc.discAnnotRu': {
    presence: defaultPresenceSet
  },
  'annotaDisc.disAnnotNameEn': {
    presence: defaultPresenceSet
  },
  'annotaDisc.discAnnotEn': {
    presence: defaultPresenceSet
  }
}
