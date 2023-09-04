import { defaultPresenceSet } from '@/validation/common/validators'

export const professionalConstraints = {
  'professional.areas': {
    validateProfesionalSpheres: true
  },
  'professional.tasks': {
    validateArrayLength: {
      minimum: 1,
      errorText: '^Выберите хотя бы одно значение'
    }
  },
  'professional.spheres': {
    validateProfesionalSpheres: true
  },
  'professional.objects': {
    presence: defaultPresenceSet
  }
}
