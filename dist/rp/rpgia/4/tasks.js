"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksConstraints = void 0;
exports.tasksConstraints = {
    'tasks.taskList': {
        validateArrayLength: {
            minimum: 1,
            errorText: '^Выберите минимум 1 пункт!'
        }
    }
};
