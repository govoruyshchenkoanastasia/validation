import { GridApi } from 'ag-grid-community'
import _ from 'lodash'

export enum errorTypes {
  req = '^Это поле обязательно!',
  leastOneForm = '^Выберите хотя бы одну форму!',
  leastOneTheme = '^Введите хотя бы одну тему!',
  leastOneValue = '^Введите хотя бы одно значение!',
  leastOneWork = '^Добавьте хотя бы одну работу!',
  leastOneSubject = '^Добавьте хотя бы один предмет!',
  tooBrief = '^Введите более 100 символов!',
  needProtocolNumber = '^Введите номер протокола',
  wrongPersonFormat = '^Неправильный формат записи! Требуется: "должность, уч.степень (если есть), уч. звание (если есть) И.О. Фамилия"',
  fillTable = '^Заполните таблицу!',
  invalidValue = '^Некорректное значение!',
  chooseForm = '^Выберите форму!',
  enterInt = '^Введите целое число!',
  enterPos = '^Введите положительное число!',
  totalNotEqualContent = '^Итоговое значение не совпадает со значением из содержания разделов дисциплины!',
  lecsNotEqPlan = '^Итоговые часы для лекций не соответствуют плану!',
  elecsNotEqPlan = '^Итоговые часы для электронных лекций не соответствуют плану!',
  labsNotEqPlan = '^Итоговые часы для лабораторных занятий не соответствуют плану!',
  elabsNotEqPlan = '^Итоговые часы для электронных лабораторных занятий не соответствуют плану!',
  pracsNotEqPlan = '^Итоговые часы для практических занятий не соответствуют плану!',
  epracsNotEqPlan = '^Итоговые часы для электронных практических занятий не соответствуют плану!',
  contactNotEqPlan = '^Итоговые часы для иной контактной работы не соответствуют плану!',
  selfworkNotEqPlan = '^Итоговые часы для самостоятельной работы не соответствуют плану!'
}

export const words = {
  rpdPage31: {
    knowledge: [
      'знание',
      'знания',
      'знанию',
      'знанием',
      'знании',
      'знаний',
      'знаниям',
      'знаниями',
      'знаниях'
    ],
    skills: [
      'умение',
      'умения',
      'умению',
      'умением',
      'умении',
      'умений',
      'умениям',
      'умениями',
      'умениях'
    ],
    abilities: [
      'навык',
      'навыка',
      'навыку',
      'навыком',
      'навыке',
      'навыки',
      'навыков',
      'навыкам',
      'навыками',
      'навыках'
    ]
  }
}

export function checkWord(val: string, type: string) {
  for (const item of (words as any).rpdPage31[type]) {
    const re = new RegExp('(^|\\s)' + item + '([^а-яёА-ЯЁ0-9a-zA-Z]|$)', 'i')
    if (val.match(re)) {
      return true
    }
  }
  return false
}

export const Config = {
  urlsWithoutInterceptors: ['/logs/client'],
  systemTitle: {
    fullName: 'ИС "Индивидуальные образовательные траектории"',
    shortName: 'ИС "ИОТ"'
  },
  urlMask: /(((https?:\/\/)|(www\.))[^\s]+)/g,
  routing: {
    authPage: {
      path: '/auth',
      name: 'Авторизация в системе'
    },
    homePage: {
      path: '/about-project',
      name: 'О проекте'
    }
  },
  mobileWidth: 768,
  defaultWidth: 1000,
  latexDocs: `<a href="https://radioprog.ru/post/74">Краткая справка по синтаксису формул</a> (<a href="https://math.meta.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference">более обширная справка на английском</a>)`
}

export enum courseContentConfigType {
  generate = 'generate',
  courseFromLink = 'courseFromLink',
  themesFromLink = 'themesFromLink'
}

export class HelpersDiscContent {
  public static valueSetterAgReal(params: any) {
    const value = Number(params.newValue?.replace(',', '.'))
    if (_.isNumber(value) && value >= 0) {
      params.data[params.colDef.field] = Number(value.toFixed(2))
      return true
    }
    return false
  }
  public static getTotalLabs(model: any) {
    let res = 0
    model.discContent.forEach((dsc: any) => {
      res += Number(dsc.labs || 0) + Number(dsc.eLabs || 0)
    })
    return res
  }

  public static getTotalAssignedLabs(model: any) {
    let res = 0
    model.labsList.forEach((l: any) => {
      res += Number(l.labHours || 0)
    })
    return res
  }

  public static getTotalPracs(model: any) {
    let res = 0
    model.discContent.forEach((dsc: any) => {
      res += Number(dsc.pracs || 0) + Number(dsc.ePracs || 0)
    })
    return res
  }

  public static getTotalAssignedPracs(model: any) {
    let res = 0
    model.pracsList.forEach((l: any) => {
      res += Number(l.pracHours || 0)
    })
    return res
  }
  public static setSRSTotal(api: GridApi) {
    const totalRow = {
      srs: 'ИТОГО СРС',
      srsHours: 0
    }
    api.forEachNode((node: any) => {
      if (node.data.srsHours) {
        totalRow.srsHours += Number(node.data.srsHours)
      }
    })
    api.setPinnedBottomRowData([totalRow])
  }
}

export function formatInitials(user: User) {
  let res = user.name[0] + '.'
  if (user.midname) {
    res += user.midname[0] + '.'
  }
  res += ` ${user.surname}`
  return res
}

export function isNumeric(value: string) {
  return /^-{0,1}\d+$/.test(value)
}

export interface User {
  initials: string
  id: number
  surname: string
  name: string
  midname: string
  roles: string[]
  email: string
  personalNumber: number
  aisDepartments: any[]
  aisFaculties: any[]
  opopRights: string[]
  rpdRights: string[]
  hasDocTypesToView: string[]
  hasGroupsToApprove: boolean
  isGlobalApprover: boolean
  coordinatesFaculty: any[]
  userDepartments: any[]
  notificationTypes: { type: notificationTypes }[]
  educations: any[]
  depHeaded: any
  actualUser?: User
  academicDegree: { id: number; title: string; shortTitle: string }[]
  academicTitle: { id: number; title: string }[]
  hasStudentsToCurate: boolean
  curated: { educationId: number; education: { id: number; userId: number } }[]
}

export enum notificationTypes {
  awaitCoordinationDocument = 'awaitCoordinationDocument',
  awaitDepHeadCoordinationDocument = 'awaitDepHeadCoordinationDocument',
  awaitApprovalDocument = 'awaitApprovalDocument',
  changedDocumentRPDContent = 'changedDocumentRPDContent',
  changedDocumentOPOPContent = 'changedDocumentOPOPContent',
  changedDocumentRPDStatus = 'changedDocumentRPDStatus',
  changedDocumentOPOPStatus = 'changedDocumentOPOPStatus',
  changedDocumentRights = 'changedDocumentRights',
  changedGlobalRights = 'changedGlobalRights',
  changedRoles = 'changedRoles',
  changedStudentTrajectoryStatus = 'changedStudentTrajectoryStatus',
  awaitCoordinationStudentTrajectory = 'awaitCoordinationStudentTrajectory',
  moodleCourseDeleted = 'moodleCourseDeleted',
  moodleSectionCreated = 'moodleSectionCreated',
  moodleSectionDeleted = 'moodleSectionDeleted',
  moodleSectionUpdated = 'moodleSectionUpdated'
}
