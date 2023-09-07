import { defaultPresenceSet } from '../../../common/validators'

export const approvalConstraints = {
  'approvalList.developer': {
    validatorPersonForSchema: true
  },
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
