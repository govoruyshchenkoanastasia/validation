import { checkWord } from '../common/helpers'
import _ from 'lodash'
import validate from 'validate.js'
import { Config } from '../common/helpers'
import { errorTypes } from '../common/helpers'
import { courseContentConfigType } from '../common/helpers'
import { HelpersDiscContent } from '../common/helpers'
import { formatInitials, isNumeric } from '../common/helpers'

// Функции вадидации для подключения (потом вынести в отдельный файл)
function createCheckWordInclusion(keyWord: string, translation: string) {
  return function(val: string) {
    return _.isEmpty(val)
      ? ['^Поле обязательное!']
      : !checkWord(val, keyWord)
      ? [`^Упомяните хотя бы по один раз слово "${translation}"`]
      : null
  }
}

function createCheckProtocolNumber(type: string) {
  return function(value: any, options: any, key: any, attributes: any) {
    const errors: string[] = []
    if (!attributes.approvalList[type]) {
      errors.push(errorTypes.needProtocolNumber)
    }
    if (errors.length > 0) {
      return errors
    }
    return null
  }
}

function validatePerson(name: string) {
  const split = name.split(',').length
  return split !== 3 && split !== 2 && split !== 4
    ? [errorTypes.wrongPersonFormat]
    : []
}

function validateYear(year: any) {
  if (_.isEmpty(year) || !year.match(/^([0-9]{4})([-//][0-9]{4})?$/)) {
    return [`^Введите год в виде "2021", "2021-2022", "2021/2022"`]
  }
  return []
}

function validatePersonUser(name: string, user: any) {
  if (_.isEmpty(name) || _.isEmpty(user)) {
    return []
  }
  const surname = user.surname
  if (!name.includes(surname)) {
    return [
      `^В поле выбран пользователь ${formatInitials(
        user
      )}. Выберите нужного по кнопке справа поля или исправьте содержимое`
    ]
  }
  return []
}

function validatorPersonForSchema(value: any) {
  if (_.isNil(value) || _.isEmpty(value)) {
    return [errorTypes.req]
  }
  const validationRes = validatePerson(value)
  if (validationRes?.length > 0) {
    return validationRes
  }

  return null
}

function createCheckTitleFields(field: string) {
  return function(value: any) {
    if (_.isNil(value?.[field]) || value?.[field] === '') {
      return [errorTypes.req]
    }
    return null
  }
}

function createValidateNameSubjectTable(
  field: string,
  fieldTranslation: string
) {
  return function(value: any, options: any, key: any, attributes: any) {
    if (
      attributes.generalProv?.[field] &&
      attributes.generalProv[field] === fieldTranslation &&
      value &&
      value.length === 0
    ) {
      return [errorTypes.leastOneSubject]
    }
    return null
  }
}

function validateArrayLength(value: any, options: any) {
  if (value.length < options.minimum) {
    return [options.errorText]
  }
  return null
}

function validateResourceTable(value: any) {
  const errors: string[] = []
  if (_.isEmpty(value)) {
    errors.push(errorTypes.leastOneValue)
  } else {
    for (const item of value) {
      if (
        _.isEmpty(item) ||
        _.isUndefined(item.nameAndDesc) ||
        item.nameAndDesc === ''
      ) {
        errors.push('^Заполните столбец "Название ресурса"')
      }
      if (_.isUndefined(item.url)) {
        errors.push('^Заполните столбец "Электронный адрес"')
      } else if (item.url.match('deming.ru')) {
        errors.push('^Недопустимое значение электронного адреса: deming.ru')
      } else if (
        !item.url.match(Config.urlMask) ||
        item.url.trim().length !== item.url.match(Config.urlMask)[0].length
      ) {
        errors.push(
          '^Некорректное заполнения поля "Электронный адрес". Пример http://site.ru'
        )
      }
    }
  }
  return errors.length > 0 ? errors : null
}

function validateAdditionalTable(value: any) {
  const errors: any = []
  if (_.isEmpty(value)) {
    errors.push(errorTypes.leastOneValue)
  } else {
    for (const item of value) {
      if (
        _.isEmpty(item) ||
        _.isUndefined(item.nameAndDesc) ||
        item.nameAndDesc === ''
      ) {
        errors.push('^Заполните столбец "Название, библиографическое описание"')
      }
      if (
        _.isEmpty(item) ||
        _.isUndefined(item.numberLibrary) ||
        item.numberLibrary === ''
      ) {
        errors.push('^Заполните столбец "К-во экз. в библ."')
      }
      if (item?.numberLibrary < 3) {
        errors.push(
          '^Количество экземпляров должно быть больше 2 (для твердых копий)!'
        )
      }
    }
  }
  return errors.length > 0 ? errors : null
}

function validateImages(string?: string) {
  if (!string) {
    return []
  }
  const match = string.matchAll(/<img src="(?<url>[^>]+)"/gm)
  const errors: string[] = []
  for (const m of match) {
    const src = m.groups!.url
    const isProd = process.env.NODE_ENV === 'production'
    if (
      !(
        src.includes('digital.etu.ru') ||
        (!isProd && src.includes('localhost'))
      )
    ) {
      errors.push(
        `^Изображение загружено неверно: <a href="${src}">${src}</a>. Пожалуйста, скачайте изображение на компьютер и вставьте его в документ с помощью кнопки "Загрузить изображение".`
      )
    }
  }
  return errors
}

// from rpd
function createValidateRequiredDiscContentField(field: string) {
  return function(val: any, options: any, key: any, attributes: any) {
    if (attributes?.discContent?.[field]?.length > 0) {
      if (!val) {
        return [errorTypes.req]
      } else if (val && val.length < 100) {
        return [errorTypes.tooBrief]
      }
    }
    return null
  }
}

function validateCourseDesign(
  val: any,
  options: any,
  key: any,
  attributes: any
) {
  if (attributes?.discContent?.isCourse?.length > 0) {
    if (!val) {
      return [errorTypes.req]
    }
  }
  return null
}

function createValidateTableLeastOne(field: string) {
  return function(val: any, options: any, key: any, attributes: any) {
    if (attributes?.discContent?.[field]?.length > 0) {
      if (val?.length === 0 || !val) {
        return [errorTypes.leastOneTheme]
      }
    }
    return null
  }
}

function validateCourseLink(val: any, options: any, key: any, attributes: any) {
  if (
    attributes.discContent.courseContentType &&
    attributes.discContent.courseContentType ===
      courseContentConfigType.courseFromLink
  ) {
    if (!val) {
      return [errorTypes.req]
    }
  }
  return null
}

function validateLabHours(val: any, options: any, key: any, attributes: any) {
  if (attributes?.discContent?.areLabs.length > 0) {
    const totalLabs = HelpersDiscContent.getTotalLabs(attributes.discContent)
    const totalAssignedLabs = HelpersDiscContent.getTotalAssignedLabs(
      attributes.discContent
    )
    if (totalLabs && totalLabs !== totalAssignedLabs) {
      return [`${errorTypes.totalNotEqualContent} (${totalLabs} ач)`]
    }
  }
  return null
}

function validateLabList(val: any, options: any, key: any, attributes: any) {
  const totalLabs = HelpersDiscContent.getTotalLabs(attributes.discContent)
  const totalAssignedLabs = HelpersDiscContent.getTotalAssignedLabs(
    attributes.discContent
  )
  if (attributes?.discContent?.areLabs?.length > 0) {
    const errors: string[] = []
    if (val && val.length === 0) {
      errors.push(errorTypes.leastOneWork)
    }
    if (totalLabs && totalLabs !== totalAssignedLabs) {
      errors.push(`${errorTypes.totalNotEqualContent} (${totalLabs} ач)`)
    }
    if (errors.length > 0) {
      return errors
    }
  }
  return null
}

function validateSRS(val: any, options: any, key: any, attributes: any) {
  if (attributes.discContent.discContent) {
    let totalSRS = 0
    attributes.discContent.discContent.forEach((ds: any) => {
      if (ds.sr) {
        totalSRS += Number(ds.sr)
      }
    })
    let currentSRS = 0
    attributes.discContent.organisation.srs.forEach((srs: any) => {
      if (srs.srsHours) {
        currentSRS += Number(srs.srsHours)
      }
    })
    if (totalSRS !== currentSRS) {
      return [`${errorTypes.totalNotEqualContent} (${totalSRS} ач)`]
    }
  }
  return null
}

function validatePracs(val: any, options: any, key: any, attributes: any) {
  if (attributes?.discContent?.arePracs?.length > 0) {
    const totalPracs = HelpersDiscContent.getTotalPracs(attributes.discContent)
    const totalAssignedPracs = HelpersDiscContent.getTotalAssignedPracs(
      attributes.discContent
    )
    if (totalPracs && totalPracs !== totalAssignedPracs) {
      return [`${errorTypes.totalNotEqualContent} (${totalPracs} ач)`]
    }
  }
  return null
}

function validatePracsList(val: any, options: any, key: any, attributes: any) {
  const totalPracs = HelpersDiscContent.getTotalPracs(attributes.discContent)
  const totalAssignedPracs = HelpersDiscContent.getTotalAssignedPracs(
    attributes.discContent
  )
  if (attributes?.discContent?.arePracs?.length > 0) {
    const errors: string[] = []
    if (val && val.length === 0) {
      errors.push(errorTypes.leastOneWork)
    }
    if (totalPracs && totalPracs !== totalAssignedPracs) {
      errors.push(`${errorTypes.totalNotEqualContent} (${totalPracs} ач)`)
    }
    if (errors.length > 0) {
      return errors
    }
  }
  return null
}

function validateSectionContent(
  val: any,
  options: any,
  key: any,
  attributes: any
) {
  const errors: string[] = []
  const total = {
    lecs: 0,
    eLecs: 0,
    labs: 0,
    eLabs: 0,
    pracs: 0,
    ePracs: 0,
    icr: 0,
    sw: 0
  }
  if (attributes.discContent && attributes.discContent.discContent) {
    attributes.discContent.discContent.forEach((ds: any) => {
      if (ds.lecs) {
        total.lecs = Number(total.lecs) + Number(ds.lecs)
      }
      if (ds.eLecs) {
        total.eLecs = Number(total.eLecs) + Number(ds.eLecs)
      }
      if (ds.labs) {
        total.labs = Number(total.labs) + Number(ds.labs)
      }
      if (ds.eLabs) {
        total.eLabs = Number(total.eLabs) + Number(ds.eLabs)
      }
      if (ds.pracs) {
        total.pracs = Number(total.pracs) + Number(ds.pracs)
      }
      if (ds.ePracs) {
        total.ePracs = Number(total.ePracs) + Number(ds.ePracs)
      }
      if (ds.icr) {
        total.icr = Number(total.icr) + Number(ds.icr)
      }
      if (ds.sr) {
        total.sw = Number(total.sw) + Number(ds.sr)
      }
    })
  }
  if (attributes.occupationTypes) {
    if (_.isEmpty(attributes.discContent.discContent)) {
      errors.push(errorTypes.leastOneValue)
    }
    if (attributes.occupationTypes.hoursLec) {
      if (!total.lecs || total.lecs !== attributes.occupationTypes.hoursLec) {
        errors.push(
          `${errorTypes.lecsNotEqPlan} (${attributes.occupationTypes.hoursLec} ач)`
        )
      }
    } else if (Number(total.lecs) !== 0) {
      errors.push(
        `${errorTypes.lecsNotEqPlan} (${attributes.occupationTypes.hoursLec} ач)`
      )
    }
    if (attributes.occupationTypes.hoursLecRemote) {
      if (
        !total.eLecs ||
        total.eLecs !== attributes.occupationTypes.hoursLecRemote
      ) {
        errors.push(
          `${errorTypes.elecsNotEqPlan} (${attributes.occupationTypes.hoursLecRemote} ач)`
        )
      }
    } else if (Number(total.eLecs) !== 0) {
      errors.push(
        `${errorTypes.elecsNotEqPlan} (${attributes.occupationTypes.hoursLecRemote} ач)`
      )
    }
    if (attributes.occupationTypes.hoursLab) {
      if (!total.labs || total.labs !== attributes.occupationTypes.hoursLab) {
        errors.push(
          `${errorTypes.labsNotEqPlan} (${attributes.occupationTypes.hoursLab} ач)`
        )
      }
    } else if (Number(total.labs) !== 0) {
      errors.push(
        `${errorTypes.labsNotEqPlan} (${attributes.occupationTypes.hoursLab} ач)`
      )
    }
    if (attributes.occupationTypes.hoursLabRemote) {
      if (
        !total.eLabs ||
        total.eLabs !== attributes.occupationTypes.hoursLabRemote
      ) {
        errors.push(
          `${errorTypes.elabsNotEqPlan} (${attributes.occupationTypes.hoursLabRemote} ач)`
        )
      }
    } else if (Number(total.eLabs) !== 0) {
      errors.push(
        `${errorTypes.elabsNotEqPlan} (${attributes.occupationTypes.hoursLabRemote} ач)`
      )
    }
    if (attributes.occupationTypes.hoursPrac) {
      if (
        !total.pracs ||
        total.pracs !== attributes.occupationTypes.hoursPrac
      ) {
        errors.push(
          `${errorTypes.pracsNotEqPlan} (${attributes.occupationTypes.hoursPrac} ач)`
        )
      }
    } else if (Number(total.pracs) !== 0) {
      errors.push(
        `${errorTypes.pracsNotEqPlan} (${attributes.occupationTypes.hoursPrac} ач)`
      )
    }
    if (attributes.occupationTypes.hoursPracRemote) {
      if (
        !total.ePracs ||
        total.ePracs !== attributes.occupationTypes.hoursPracRemote
      ) {
        errors.push(
          `${errorTypes.epracsNotEqPlan} (${attributes.occupationTypes.hoursPracRemote} ач)`
        )
      }
    } else if (Number(total.ePracs) !== 0) {
      errors.push(
        `${errorTypes.epracsNotEqPlan} (${attributes.occupationTypes.hoursPracRemote} ач)`
      )
    }
    if (attributes.occupationTypes.otherContactWork) {
      if (
        !total.icr ||
        total.icr !== Number(attributes.occupationTypes.otherContactWork)
      ) {
        errors.push(
          `${errorTypes.contactNotEqPlan} (${attributes.occupationTypes.otherContactWork} ач)`
        )
      }
    } else if (Number(total.icr) !== 0) {
      errors.push(
        `${errorTypes.contactNotEqPlan} (${attributes.occupationTypes.otherContactWork} ач)`
      )
    }
    if (attributes.occupationTypes.hoursSelfWork) {
      if (!total.sw || total.sw !== attributes.occupationTypes.hoursSelfWork) {
        errors.push(
          `${errorTypes.selfworkNotEqPlan} (${attributes.occupationTypes.hoursSelfWork} ач)`
        )
      }
    } else if (Number(total.sw) !== 0) {
      errors.push(
        `${errorTypes.selfworkNotEqPlan} (${attributes.occupationTypes.hoursSelfWork} ач)`
      )
    }
  }
  return errors.length > 0 ? errors : null
}

// TODO try a little bit later
function validatorInfoAndMatBase(
  value: any,
  options: any,
  key: any,
  attributes: any
) {
  // if ((!_.isArray(value) && !field) || _.isEmpty(value)) {
  //   return ['Это поле обязательно!']
  // }
  // const requiredCells = ['infoNum', 'infoType', 'infoAudit', 'infoRequir']
  // const wordsRequiringSoftware = ['ПК', 'ноутбук', 'компьютер', 'ЭВМ']
  // const wordsRequiringLecture = [
  //   'доска',
  //   'экран',
  //   'проектор',
  //   ...wordsRequiringSoftware
  // ]

  // const errors = []
  // const iterValue = field ? [value] : value
  // for (let i = 0; i < iterValue.length; i++) {
  //   const row = iterValue[i]

  //   const rowNumber = `№${row.infoNum ?? i + 1}${
  //     row.infoType ? ' "' + row.infoType + '"' : ''
  //   }`

  //   for (const cell of requiredCells) {
  //     if (_.isEmpty(row[cell]) && !_.isNumber(row[cell])) {
  //       errors.push([cell, `В строке ${rowNumber} не заполнен столбец`])
  //     }
  //   }

  //   const foundWordSoftware = wordsRequiringSoftware.find(w =>
  //     (row['infoRequir'] ?? '').includes(w)
  //   )

  //   if (foundWordSoftware && _.isEmpty(row['infoProg'])) {
  //     errors.push([
  //       'infoProg',
  //       `В строке ${rowNumber} необходимо описать "Требования к программному обеспечению", т.к. найдено ключевое слово "${foundWordSoftware}"`
  //     ])
  //   }

  //   if (!foundWordSoftware && !_.isEmpty(row['infoProg'])) {
  //     errors.push([
  //       'infoProg',
  //       `Столбец "Требования к программному обеспечению" строки ${rowNumber} должен быть пуст, т.к. не найдено ни одно из ключевых слов: "${wordsRequiringLecture.join(
  //         ', '
  //       )}"`
  //     ])
  //   }

  //   const foundWordLecture = wordsRequiringLecture.find(w =>
  //     (row['infoRequir'] ?? '').includes(w)
  //   )

  //   if (row['infoType'] === 'Лекция' && !foundWordLecture) {
  //     errors.push([
  //       'infoRequir',
  //       `В строке ${rowNumber} необходимо описать более подробно "Требования к помещению", т.к. не найдено ни одно из ключевых слов: "${wordsRequiringLecture.join(
  //         ', '
  //       )}"`
  //     ])
  //   }
  // }

  // return (field ? errors.filter(f => f[0] === field) : errors).map(f => f[1])
}
// TODO find documentSections Type
export function isExamSelected(documentSections: any): boolean {
  return (
    (documentSections.marks.type === 'рейтинговая система' &&
      documentSections.marks.rating.type.includes('экзамен')) ||
    (documentSections.marks.type === 'система без рейтинга' &&
      documentSections.marks.notRating.controls.includes('экзамен'))
  )
}

export function isOffsetWithMarkSelected(documentSections: any): boolean {
  return (
    (documentSections.marks.type === 'рейтинговая система' &&
      documentSections.marks.rating.type.includes('дифф. зачет')) ||
    (documentSections.marks.type === 'система без рейтинга' &&
      documentSections.marks.notRating.controls.includes('зачет с оценкой'))
  )
}

function validateExamQuestion(
  val: any,
  options: any,
  key: any,
  attributes: any
) {
  if (isExamSelected(attributes)) {
    if (attributes.marks) {
      if (
        attributes.marks.rating.type.includes('экзамен') ||
        attributes.marks.notRating.controls.includes('экзамен')
      ) {
        if (
          (attributes.marks.examQuestions.examForm === 'тестирование' &&
            options.name === 'examTest' &&
            !val?.length) ||
          (attributes.marks.examQuestions.examForm === 'по билетам' &&
            options.name === 'examTicket' &&
            !val?.length)
        ) {
          return [errorTypes.req]
        }
      }
    } else {
      if (
        attributes.rating.type.includes('экзамен') ||
        attributes.notRating.controls.includes('экзамен')
      ) {
        if (
          (attributes.examQuestions.examForm === 'тестирование' &&
            options.name === 'examTest' &&
            !val?.length) ||
          (attributes.examQuestions.examForm === 'по билетам' &&
            options.name === 'examTicket' &&
            !val?.length)
        ) {
          return [errorTypes.req]
        }
      }
    }
  }
  return null
}

function validateOffsetQuestion(
  val: any,
  options: any,
  key: any,
  attributes: any
) {
  if (isOffsetWithMarkSelected(attributes)) {
    if (attributes.marks) {
      if (
        attributes.marks.rating.type.includes('дифф. зачет') ||
        attributes.marks.notRating.controls.includes('зачет с оценкой')
      ) {
        if (
          attributes.marks.examQuestions &&
          attributes.marks.examQuestions.offsetForm
        ) {
          if (
            (attributes.marks.examQuestions.offsetForm === 'тестирование' &&
              options.name === 'offsetTest' &&
              !val?.length) ||
            (attributes.marks.examQuestions.offsetForm === 'по билетам' &&
              options.name === 'offsetTicket' &&
              !val?.length)
          ) {
            return [errorTypes.req]
          }
        }
      }
    } else {
      if (
        attributes.rating.type.includes('дифф. зачет') ||
        attributes.notRating.controls.includes('зачет с оценкой')
      ) {
        if (
          (attributes.examQuestions.offsetForm === 'тестирование' &&
            options.name === 'offsetTest' &&
            !val?.length) ||
          (attributes.examQuestions.offsetForm === 'по билетам' &&
            options.name === 'offsetTicket' &&
            !val?.length)
        ) {
          return [errorTypes.req]
        }
      }
    }
  }
  return null
}

function validateMarksRatingType(
  val: any,
  options: any,
  key: any,
  attributes: any
) {
  if (attributes.marks) {
    if (attributes.marks.type && attributes.marks.type === options.markType) {
      if ((val && val.length === 0) || !val) {
        return [errorTypes[options.errorType as keyof typeof errorTypes]]
      }
    }
  } else {
    if (attributes.type && attributes.type === options.markType) {
      if ((val && val.length === 0) || !val) {
        return [errorTypes[options.errorType as keyof typeof errorTypes]]
      }
    }
  }
  return null
}

function validateRatingExamMarks(
  val: any,
  options: any,
  key: any,
  attributes: any
) {
  if (
    attributes.type &&
    attributes.type === 'рейтинговая система' &&
    (attributes.marks.rating.type.includes('экзамен') ||
      attributes.marks.rating.type.includes('дифф. зачет'))
  ) {
    if (val && val.length === 0) {
      return [errorTypes.fillTable]
    }
  }
  return null
}

function validateMarksNotRatingControls(
  val: any,
  options: any,
  key: any,
  attributes: any
) {
  if (attributes.marks) {
    if (
      attributes.marks.type &&
      attributes.marks.type === 'система без рейтинга'
    ) {
      if (val && val.length === 0) {
        return [errorTypes.leastOneForm]
      }
    }
  } else {
    if (attributes.type && attributes.type === 'система без рейтинга') {
      if (val && val.length === 0) {
        return [errorTypes.leastOneForm]
      }
    }
  }
  return null
}

function validateNotRatingExamMarks(
  val: any,
  options: any,
  key: any,
  attributes: any
) {
  if (
    attributes.type &&
    attributes.type === 'система без рейтинга' &&
    attributes.notRating.controls.includes(options.controlType)
  ) {
    if (val && val.length === 0) {
      return [errorTypes.fillTable]
    }
  }
  return null
}

function validateNotRatingOffset(
  val: any,
  options: any,
  key: any,
  attributes: any
) {
  if (attributes.marks) {
    if (
      attributes.marks.type &&
      attributes.marks.type === 'система без рейтинга' &&
      attributes.marks.notRating.controls.includes('зачет')
    ) {
      if (!val) {
        return [errorTypes.req]
      }
    }
  } else {
    if (
      attributes.type &&
      attributes.type === 'система без рейтинга' &&
      attributes.notRating.controls.includes('зачет')
    ) {
      if (!val) {
        return [errorTypes.req]
      }
    }
  }
  return null
}

function validateExample(val: any, options: any, key: any, attributes: any) {
  if (attributes.marks) {
    if (
      attributes.marks.examQuestions.testForms &&
      attributes.marks.examQuestions.testForms.includes(
        'контрольные (проверочные) работы'
      )
    ) {
      if (!val) {
        return [errorTypes.req]
      }
    }
  } else {
    if (
      attributes.examQuestions.testForms &&
      attributes.examQuestions.testForms.includes(
        'контрольные (проверочные) работы'
      )
    ) {
      if (!val) {
        return [errorTypes.req]
      }
    }
  }
  return null
}

function validateGIAMarksReviewer(
  val: any,
  options: any,
  key: any,
  attributes: any
) {
  if (
    attributes.title?.studyingLevel === 'Магистратура' &&
    !attributes.giaMarks.isReviewer
  )
    return [
      '^Для магистров обязательно необходимо указать о наличии мнения рецензента для защиты ВКР'
    ]
  return null
}

function validatePracticeContentStepsList(value: any) {
  let res = false
  value.forEach((v: any) => {
    if (!res && (_.isEmpty(v.type) || _.isEmpty(v.controlForm))) {
      res = true
    }
  })
  if (res) {
    return ['^Заполните пустые поля!']
  }
  return null
}

function validateCompFormation(value: any) {
  let res = false
  value.forEach((v: any) => {
    if (!res && !(v.practiceLeader || v.leaderReview || v.report)) {
      res = true
    }
  })
  if (res) {
    return ['^Заполните пустые строки!']
  }
  return null
}

function validateMarksCriterias(value: any) {
  let res = false
  value.forEach((v: any) => {
    if (!res && _.isEmpty(v.description)) {
      res = true
    }
  })
  if (res) {
    return ['^Заполните пустые строки!']
  }
  return null
}

function validateApprovalListPerson(
  value: any,
  options: any,
  key: any,
  attributes: any
) {
  if (_.isNil(value) || _.isEmpty(value)) {
    return [errorTypes.req]
  }

  return [
    ...validatePerson(value),
    ...validatePersonUser(value, _.get(attributes, options.userRole))
  ]
}

function validateApprovalListDepHead(
  value: any,
  options: any,
  key: any,
  attributes: any
) {
  const director = attributes.approvalList.director?.match(/,[^,]*$/)?.[0] ?? ''
  const valueName = value?.match(/,[^,]*$/)?.[0] ?? ''
  if (director === valueName) {
    if (director !== '') {
      return [
        '^Если руководитель ОПОП зав. каф. или декан – то соответствующие строки исключаются!'
      ]
    } else {
      return []
    }
  } else {
    return validatePersonUser(
      value,
      _.get(attributes, `approvalList[${options.userRole}]`)
    )
  }
}

function validateApprovalListData(rows: any, options: any) {
  if (_.isEmpty(rows)) {
    return [errorTypes.req]
  } else {
    const errors: string[] = []
    if (!options.field) return
    for (let i = 0; i < rows.length; i++) {
      const row = rows[i]
      for (const column of options.field.columnDefs) {
        if (_.isEmpty(_.get(row, column.field))) {
          // const found = this.columnDefs.find(
          //   (c: any) => c.field === column.field
          // )
          const found = column
          errors.push(
            `^Строка ${i + 1}. Есть незаполненные поля${
              found ? ': ' + found.headerName : ''
            }`
          )
        }
      }
      const validationRes = [...validatePersonUser(row.leader, row.leaderUser)]
      if (validationRes?.length > 0) {
        errors.push(
          `^Строка ${i + 1}. Поле "Председатель". ${validationRes[0]}`
        )
      }
      const validationResYear = [...validateYear(row.year)]
      if (validationResYear?.length > 0) {
        errors.push(
          `^Строка ${i + 1}. Поле "Учебный год". ${validationResYear[0].slice(
            1
          )}`
        )
      }
    }
    return errors
  }
  return []
}

function validateConditions(
  value: any,
  options: any,
  key: any,
  attributes: any
) {
  return attributes.general.needConditions
    ? _.isEmpty(value)
      ? [errorTypes.req]
      : []
    : []
}

function validateProfesionalSpheres(
  value: any,
  options: any,
  key: any,
  attributes: any
) {
  if (
    _.isEmpty(attributes.professional.spheres) &&
    _.isEmpty(attributes.professional.areas)
  ) {
    return ['Необходимо ввести сферы или области профессиональной деятельности']
  }
  return []
}

function validateInteger(value: any, options: any) {
  if (_.isNil(value)) return [errorTypes.req]
  if (options?.topConstraint) {
    if (
      isNumeric(value) &&
      parseInt(value) >= 0 &&
      parseInt(value) <= Number(options.topConstraint)
    ) {
      return null
    } else {
      return ['^Неправильное число']
    }
  }
  if (isNumeric(value) && parseInt(value) >= 0) {
    return null
  }
  return ['^Неправильное число']
}

function validateEmptyField(
  value: any,
  options: any,
  key: any,
  attributes: any
) {
  return _.isEmpty(attributes.supplement.professionalStandard)
    ? []
    : _.isEmpty(value)
    ? [errorTypes.req]
    : []
}

function validateSupplementExp(
  value: any,
  options: any,
  key: any,
  attributes: any
) {
  return attributes.supplement.needExperienceAnalysis
    ? _.isEmpty(value)
      ? [errorTypes.req]
      : []
    : []
}

function validateSupplementProfStandard(
  value: any,
  options: any,
  key: any,
  attributes: any
) {
  return _.isEmpty(attributes.supplement.professionalStandard)
    ? []
    : validateArrayLength(value, { minimum: 1 })
}

function validateExamForm(value: any, options: any, key: any, attributes: any) {
  return isExamSelected(attributes)
    ? _.isEmpty(value)
      ? [errorTypes.req]
      : []
    : []
}

function validateOffsetQuestions(
  value: any,
  options: any,
  key: any,
  attributes: any
) {
  return isOffsetWithMarkSelected(attributes)
    ? _.isEmpty(value)
      ? [errorTypes.req]
      : []
    : []
}

// tree validation
export function validateProfessional(value: any, options: any) {
  const possibleErrors = [
    '^Не выбрано ни одной области профессиональной деятельности',
    '^Есть задачи области без указания типов задач. Нажмите <em class="fas fa-chevron-circle-down"></em>, чтобы добавить строку на уровень ниже',
    '^Есть пустые типы задач',
    '^Есть пустые задачи'
  ].map(errorDescription => ({
    description: errorDescription,
    exist: false
  }))

  if (_.isEmpty(options.data)) {
    possibleErrors[0].exist = true
  }

  for (const task of options.data) {
    if (_.isEmpty(task._children)) {
      possibleErrors[1].exist = true
    }
    for (const base of task?._children || []) {
      if (_.isEmpty(base._children)) {
        possibleErrors[2].exist = true
      }

      for (const subbase of base?._children || []) {
        if (_.isNil(subbase.value)) {
          possibleErrors[3].exist = true
        }
      }
    }
  }
  return possibleErrors
    .filter(error => error.exist)
    .map(error => error.description)
}

export function validateGeneralProfessionalData(value: any, options: any) {
  const possibleErrors = [
    '^Это поле обязательно',
    '^Есть компетенции без кода. Нажмите на ячейку, чтобы добавить значение',
    '^Есть компетенции без индикаторов. Нажмите <em class="fas fa-chevron-circle-down"></em>, чтобы добавить строку на уровень ниже',
    '^Все индикаторы должны быть заполнены'
  ].map(errorDescription => ({
    description: errorDescription,
    exist: false
  }))
  if (_.isEmpty(options.data)) {
    possibleErrors[0].exist = true
  }
  for (const datum of options.data) {
    if (_.isEmpty(datum.competence)) {
      possibleErrors[1].exist = true
    }
    if (_.isEmpty(datum._children)) {
      possibleErrors[2].exist = true
    }
    for (const indicator of datum?._children || []) {
      if (_.isEmpty(indicator.category)) {
        possibleErrors[3].exist = true
      }
    }
  }
  return possibleErrors
    .filter(error => error.exist)
    .map(error => error.description)
}

export function validateBases(value: any, options: any) {
  const possibleErrors = [
    '^Не выбрано ни одной задачи',
    '^Есть задачи без оснований. Нажмите <em class="fas fa-chevron-circle-down"></em>, чтобы добавить строку на уровень ниже',
    '^Есть пустые основания'
  ].map(errorDescription => ({
    description: errorDescription,
    exist: false
  }))

  if (_.isEmpty(options.data)) {
    possibleErrors[0].exist = true
  }
  for (const task of options.data) {
    if (_.isEmpty(task._children)) {
      possibleErrors[1].exist = true
    }
    for (const base of task?._children || []) {
      if (_.isNil(base.base)) {
        possibleErrors[2].exist = true
      }
    }
  }
  return possibleErrors
    .filter(error => error.exist)
    .map(error => error.description)
}

export function validateObjects(value: any, options: any) {
  const possibleErrors = [
    '^Не выбрано ни одной задачи',
    '^Есть задачи без объектов. Нажмите <em class="fas fa-chevron-circle-down"></em>, чтобы добавить строку на уровень ниже',
    '^Есть пустые объекты'
  ].map(errorDescription => ({
    description: errorDescription,
    exist: false
  }))

  if (_.isEmpty(options.data)) {
    possibleErrors[0].exist = true
  }
  for (const task of options.data) {
    if (_.isEmpty(task._children)) {
      possibleErrors[1].exist = true
    }
    for (const object of task?._children || []) {
      if (_.isEmpty(object.object) || _.isNil(object.object)) {
        possibleErrors[2].exist = true
      }
    }
  }
  return possibleErrors
    .filter(error => error.exist)
    .map(error => error.description)
}

export function validateUniversalData(value: any, options: any) {
  const possibleErrors = [
    '^Это поле обязательно',
    '^У каждой компетенции должен быть заполнены категория и код',
    '^Есть компетенции без индикаторов. Нажмите <em class="fas fa-chevron-circle-down"></em>, чтобы добавить строку на уровень ниже',
    '^Все индикаторы должны быть заполнены'
  ].map(errorDescription => ({
    description: errorDescription,
    exist: false
  }))
  if (_.isEmpty(options.data)) {
    possibleErrors[0].exist = true
  }
  for (const datum of options.data) {
    if (_.isEmpty(datum.category) || _.isEmpty(datum.competence)) {
      possibleErrors[1].exist = true
    }
    if (_.isEmpty(datum._children)) {
      possibleErrors[2].exist = true
    }
    for (const indicator of datum?._children || []) {
      if (_.isEmpty(indicator.category)) {
        possibleErrors[3].exist = true
      }
    }
  }
  return possibleErrors
    .filter(error => error.exist)
    .map(error => error.description)
}

export function validateProfessional4(value: any, options: any) {
  const possibleErrors = [
    '^Не выбрано ни одной задачи',
    '^Есть задачи без компетенций. Нажмите <em class="fas fa-chevron-circle-down"></em>, чтобы добавить строку на уровень ниже',
    '^Есть незаполненные компетенции',
    '^Есть компетенции без индикаторов. Нажмите <em class="fas fa-chevron-circle-down"></em>, чтобы добавить строку на уровень ниже',
    '^Есть незаполненные индикаторы'
  ].map(errorDescription => ({
    description: errorDescription,
    exist: false
  }))

  if (_.isEmpty(options.data)) {
    possibleErrors[0].exist = true
  }
  for (const task of options.data) {
    if (_.isEmpty(task._children)) {
      possibleErrors[1].exist = true
    }
    for (const competence of task?._children || []) {
      if (_.isEmpty(competence.competence) || _.isNil(competence.competence)) {
        possibleErrors[2].exist = true
      }
      if (_.isEmpty(competence._children)) {
        possibleErrors[3].exist = true
      }
      for (const indicator of competence?._children || []) {
        if (
          _.isEmpty(indicator.competenceIndex) ||
          _.isNil(indicator.competenceIndex)
        ) {
          possibleErrors[4].exist = true
        }
      }
    }
  }
  return possibleErrors
    .filter(error => error.exist)
    .map(error => error.description)
}

// Конец функций для подключения

export const defaultPresenceSet = {
  allowEmpty: false,
  message: errorTypes.req
}

export const validationYearSet = {
  onlyInteger: true,
  greaterThanOrEqualTo: 2000,
  lessThanOrEqualTo: 2100,
  notValid: '^Это поле обязательно!',
  notInteger: '^Значение должно быть целым числом',
  notGreaterThanOrEqualTo: '^Число слишком маленькое! Минимум: %{count}',
  notLessThanOrEqualTo: '^Число слишком большое! Максимум: %{count}'
}

export const validateSchema = (model: any, constraints: any, field: any) => {
  const modelValidation = validate(model, constraints)
  return modelValidation?.[field.model] ? modelValidation?.[field.model] : null
}

// Подключение валидаторов
validate.validators.checkWordInclusionKnowledge = createCheckWordInclusion(
  'knowledge',
  'знание'
)

validate.validators.checkWordInclusionSkills = createCheckWordInclusion(
  'skills',
  'умение'
)

validate.validators.checkWordInclusionAbilities = createCheckWordInclusion(
  'abilities',
  'навык'
)

validate.validators.checkDepProtocolNumber = createCheckProtocolNumber(
  'depProtocolNumber'
)

validate.validators.checkComProtocolNumber = createCheckProtocolNumber(
  'comProtocolNumber'
)

validate.validators.validatorPersonForSchema = validatorPersonForSchema

validate.validators.validateDirectionCode = createCheckTitleFields(
  'directionCode'
)
validate.validators.validateTitle = createCheckTitleFields('title')
validate.validators.validateSubject = createCheckTitleFields('subject')

validate.validators.validateNameBeforeSubjectTable = createValidateNameSubjectTable(
  'learnSubject',
  'Другое'
)
validate.validators.validateNameAfterSubjectTable = createValidateNameSubjectTable(
  'futureSubject',
  'Последующие дисциплины'
)

validate.validators.validateResourceTable = validateResourceTable
validate.validators.validateAdditionalTable = validateAdditionalTable
validate.validators.validateMainTable = validateAdditionalTable

validate.validators.validateImages = validateImages
validate.validators.validateCase = createValidateRequiredDiscContentField(
  'isCase'
)

validate.validators.validateCourseDesign = validateCourseDesign
validate.validators.validateCourseDesignThemes = createValidateTableLeastOne(
  'isCourse'
)

validate.validators.validateCourseLink = validateCourseLink
validate.validators.validateEssay = createValidateRequiredDiscContentField(
  'isEssay'
)
validate.validators.validateEssayThemes = createValidateTableLeastOne('isEssay')

validate.validators.validateIDZ = createValidateRequiredDiscContentField(
  'isIDZ'
)

validate.validators.validateLabHours = validateLabHours
validate.validators.validateLabList = validateLabList
validate.validators.validateSRS = validateSRS

validate.validators.validatePracs = validatePracs
validate.validators.validatePracsList = validatePracsList

validate.validators.validatePresentation = createValidateRequiredDiscContentField(
  'isPresentation'
)

validate.validators.validateSectionContent = validateSectionContent

validate.validators.validatorInfoAndMatBase = validatorInfoAndMatBase

validate.validators.validateExamQuestion = validateExamQuestion
validate.validators.validateOffsetQuestion = validateOffsetQuestion

validate.validators.validateMarksRatingType = validateMarksRatingType
validate.validators.validateRatingExamMarks = validateRatingExamMarks

validate.validators.validateMarksNotRatingControls = validateMarksNotRatingControls
validate.validators.validateNotRatingExamMarks = validateNotRatingExamMarks
validate.validators.validateNotRatingOffset = validateNotRatingOffset

validate.validators.validateExample = validateExample

validate.validators.validateGIAMarksReviewer = validateGIAMarksReviewer

validate.validators.validatePracticeContentStepsList = validatePracticeContentStepsList

validate.validators.validateCompFormation = validateCompFormation

validate.validators.validateMarksCriterias = validateMarksCriterias

// opop validation

validate.validators.validateApprovalListPerson = validateApprovalListPerson
validate.validators.validateApprovalListDepHead = validateApprovalListDepHead
validate.validators.validateApprovalListData = validateApprovalListData

validate.validators.validateYear = validateYear
validate.validators.validateConditions = validateConditions

validate.validators.validateTitleGeneral = createCheckTitleFields(
  'directionTitle'
)
validate.validators.validateProfesionalSpheres = validateProfesionalSpheres

validate.validators.validateInteger = validateInteger
validate.validators.validateEmptyField = validateEmptyField

validate.validators.validateSupplementExp = validateSupplementExp

validate.validators.validateProfessional = validateProfessional
validate.validators.validateGeneralProfessionalData = validateGeneralProfessionalData
validate.validators.validateBases = validateBases
validate.validators.validateObjects = validateObjects
validate.validators.validateUniversalData = validateUniversalData
validate.validators.validateProfessional4 = validateProfessional4

validate.validators.validateArrayLength = validateArrayLength

validate.validators.validateSupplementProfStandard = validateSupplementProfStandard
validate.validators.validateExamForm = validateExamForm
validate.validators.validateOffsetQuestions = validateOffsetQuestions
