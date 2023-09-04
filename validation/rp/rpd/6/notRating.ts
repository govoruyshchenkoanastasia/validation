export const notRatingConstraints = {
  'marks.notRating.controls': {
    validateMarksNotRatingControls: true
  },
  'marks.notRating.examMarks': {
    validateNotRatingExamMarks: {
      controlType: 'экзамен'
    },
    length: {
      minimum: 4,
      tooShort: '^Необходимо 4 критерия оценивания экзамена'
    }
  },
  'marks.notRating.offset': {
    validateNotRatingOffset: true
  },
  'marks.notRating.markedOffsetMarks': {
    validateNotRatingExamMarks: {
      controlType: 'зачет с оценкой'
    },
    length: {
      minimum: 4,
      tooShort: '^Необходимо 4 критерия оценивания зачета с оценкой'
    }
  },
  'marks.notRating.examDesc': {
    validateMarksRatingType: {
      errorType: 'req',
      markType: 'система без рейтинга'
    }
  }
}
