import { defaultPresenceSet } from '@/validation/common/validators'

export const approvalConstraints = {
  'approvalList.developer': {
    validatorPersonForSchema: true
  },
  // ? space for the array
  'approvalList.department': {
    presence: defaultPresenceSet
  },
  'approvalList.depDate': {
    presence: defaultPresenceSet
  },
  'approvalList.depProtocolNumber': {
    checkDepProtocolNumber: true
  },
  'approvalList.departmentHead': {
    validatorPersonForSchema: true
  },
  'approvalList.faculty': {
    presence: defaultPresenceSet
  },
  'approvalList.comDate': {
    presence: defaultPresenceSet
  },
  'approvalList.comProtocolNumber': {
    checkComProtocolNumber: true
  },
  'approvalList.comHead': {
    validatorPersonForSchema: true
  }
}
