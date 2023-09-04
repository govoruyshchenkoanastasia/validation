import { defaultPresenceSet } from '@/validation/common/validators'

export const organizationConstraints = {
  'discContent.organisation.description': {
    presence: defaultPresenceSet,
    validateImages: true
  }
}
