import {ADD_TASK, EDIT_TASK, DELETE_TASK, CHECK_TASK, CHECK_ALL_TASK,
    SET_FILTER} from '../constants';
import {OrderedMap, Record, List} from 'immutable';
import { checkAllCheckboxes, resetAllCheckboxes } from '../helpers';

const TaskRecord = Record({
    id: null,
    text: null,
    isChecked: ''
});

const ReducerState = Record({
    entities: new OrderedMap({}),
    filter: 'all',
    completedCount: new List([])
});

const defaultState = new ReducerState();

export default (tasksState = defaultState, action) => {
    const {type, payload, randomId} = action;
    let newState = null;

    switch (type) {
        case ADD_TASK:
            return tasksState.setIn(['entities', randomId], new TaskRecord({...payload.task, id: randomId}));

        case EDIT_TASK:
            return tasksState.setIn(['entities', payload.id, 'text'], payload.newText);

        case DELETE_TASK:
            newState = tasksState.deleteIn(['entities', payload.id]);
            if (tasksState.completedCount.indexOf(payload.id) >= 0) {
                newState = newState.deleteIn(['completedCount', newState.completedCount.indexOf(payload.id)]);
            }
            return newState;

        case CHECK_TASK:
            newState = tasksState.setIn(['entities', payload.id, 'isChecked'], payload.newCheck);
            if (payload.newCheck) {
                newState = newState.update('completedCount', completedCount => completedCount.push(payload.id));
            } else {
                newState = newState.update('completedCount', completedCount => completedCount.splice(completedCount.indexOf(payload.id), 1));
            }
            return newState;

        case CHECK_ALL_TASK:
            if (tasksState.completedCount.size < tasksState.entities.size) {
                newState = checkAllCheckboxes(tasksState);
            } else {
                newState = resetAllCheckboxes(tasksState);
            }
            return newState;

        case SET_FILTER:
            return tasksState.set('filter', payload.filter);
    };

    return tasksState;
};
