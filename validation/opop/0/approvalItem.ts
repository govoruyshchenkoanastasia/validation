import { defaultPresenceSet } from '../../common/validators'

export const approvalItemConstraints = {
  faculty: {
    presence: defaultPresenceSet
  },
  year: {
    validateYear: true
  },
  protocolNumber: {
    presence: defaultPresenceSet
  },
  date: {
    presence: defaultPresenceSet
  },
  leader: {
    validateApprovalListPerson: {
      userRole: 'leaderUser'
    }
  }
}
