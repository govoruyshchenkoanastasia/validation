import { validate } from 'validate.js'
import {
  OPOPConstraints,
  RPCommonConstraints,
  RPDConstraints,
  RPGIAConstraints,
  RPPConstraints
} from '@/validation/common/importConstraints'
import _ from 'lodash'
import { createTreeConstraints } from '@/validation/common/treeValidation'

export enum DocType {
  OPOP = 'OPOP',
  RPD = 'RPD',
  RPGIA = 'RPGIA',
  RPP = 'RPP'
}

export const docType = {
  [DocType.OPOP]: OPOPConstraints,
  [DocType.RPD]: [...RPCommonConstraints, ...RPDConstraints],
  [DocType.RPGIA]: [...RPCommonConstraints, ...RPGIAConstraints],
  [DocType.RPP]: [...RPCommonConstraints, ...RPPConstraints]
}

export enum OPOPTreeValidators {
  validateProfessional = 'validateProfessional',
  validateGeneralProfessionalData = 'validateGeneralProfessionalData',
  validateBases = 'validateBases',
  validateObjects = 'validateObjects',
  validateUniversalData = 'validateUniversalData',
  validateProfessional4 = 'validateProfessional4'
}

export const OPOPTreeValidationData: {
  [k in OPOPTreeValidators]: {
    field: string
    validatorName: string
    tabIndex: number
  }
} = {
  [OPOPTreeValidators.validateProfessional]: {
    field: 'professional.taskRows',
    validatorName: 'validateProfessional',
    tabIndex: 2
  },
  [OPOPTreeValidators.validateGeneralProfessionalData]: {
    field: 'programResults.generalProfessionalData',
    validatorName: 'validateGeneralProfessionalData',
    tabIndex: 4
  },
  [OPOPTreeValidators.validateBases]: {
    field: 'programResults.professionalData.bases',
    validatorName: 'validateBases',
    tabIndex: 4
  },
  [OPOPTreeValidators.validateObjects]: {
    field: 'programResults.professionalData.objects',
    validatorName: 'validateObjects',
    tabIndex: 4
  },
  [OPOPTreeValidators.validateUniversalData]: {
    field: 'programResults.universalData',
    validatorName: 'validateUniversalData',
    tabIndex: 4
  },
  [OPOPTreeValidators.validateProfessional4]: {
    field: 'programResults.professionalData.competences',
    validatorName: 'validateProfessional4',
    tabIndex: 4
  }
}

export function validateOnAllConstraints(
  model: any,
  type: keyof typeof docType
) {
  let validationResult: { [k: string]: [] }[] = []
  const constraints: any = [...docType[type]]

  if (type === DocType.OPOP) {
    const OPOPTreeConstraints = Object.values(OPOPTreeValidationData).map(c =>
      createTreeConstraints(model, c.field, c.validatorName)
    )
    constraints.push(...OPOPTreeConstraints)
  }

  constraints.forEach((c: any) => {
    validationResult.push(validate(model, c))
  })

  validationResult = _.compact(validationResult)
    .map(r => Object.values(r))
    .flat(2)

  return validationResult.length
}
