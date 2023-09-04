import { validate } from 'validate.js'

export function createTreeConstraints(
  documentSections: any,
  field: string,
  validatorName: string
) {
  return {
    [field]: {
      [validatorName]: {
        data: field.split('.').reduce((acc, cur) => {
          return acc[`${cur}`]
        }, documentSections),
        field
      }
    }
  }
}

export function validateTree(
  documentSections: any,
  field: string,
  validatorName: string
) {
  const tmpModel = {
    [field]: field
      .split('.')
      .reduce((acc, cur) => acc[`${cur}`], documentSections)
  }
  return (
    validate(
      tmpModel,
      createTreeConstraints(documentSections, field, validatorName)
    )?.[field] ?? []
  )
}
