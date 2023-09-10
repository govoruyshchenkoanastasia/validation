"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingConstraints = void 0;
exports.ratingConstraints = {
    'marks.rating.type': {
        validateMarksRatingType: {
            errorType: 'leastOneForm',
            markType: 'рейтинговая система'
        }
    },
    'marks.rating.examMarks': {
        validateRatingExamMarks: true
    },
    'marks.rating.examDesc': {
        validateMarksRatingType: {
            errorType: 'req',
            markType: 'рейтинговая система'
        }
    }
};
