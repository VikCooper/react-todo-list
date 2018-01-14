import {ADD_TASK, EDIT_TASK, CHECK_TASK, CHECK_ALL_TASK} from '../constants';

export function addTask(task) {
    return {
        type: ADD_TASK,
        payload: { task },
        generateId: true
    };
};

export function editTask(id, newText) {
    return {
        type: EDIT_TASK,
        payload: { id, newText }
    };
};

export function checkTask(id, newCheck) {
    return {
        type: CHECK_TASK,
        payload: { id, newCheck }
    };
};

export function checkAllTask() {
    return {
        type: CHECK_ALL_TASK,
    };
};