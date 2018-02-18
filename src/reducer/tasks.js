import {ADD_TASK, EDIT_TASK, DELETE_TASK, CHECK_TASK, CHECK_ALL_TASK} from '../constants';
import {OrderedMap, Record} from 'immutable';
import { checkAllCheckboxes, resetAllCheckboxes } from '../helpers';

const TaskRecord = Record({
    id: null,
    text: null,
    isChecked: false
});

const ReducerState = Record({
    entities: new OrderedMap({})
});

const defaultState = new ReducerState();

export default (tasksState = defaultState, action) => {
    const {type, payload, randomId} = action;

    switch (type) {
        case ADD_TASK:
            return tasksState.setIn(['entities', randomId], new TaskRecord({...payload.task, id: randomId}));

        case EDIT_TASK:
            return tasksState.setIn(['entities', payload.id, 'text'], payload.newText);

        case DELETE_TASK:
            return tasksState.delete('entities', payload.id);

        case CHECK_TASK:
            return tasksState.setIn(['entities', payload.id, 'isChecked'], payload.newCheck);

        case CHECK_ALL_TASK:
            let newState = checkAllCheckboxes(tasksState);
            // if all checkboxes already been checked then reset all
            if (newState.equals(tasksState)) {
                newState = resetAllCheckboxes(newState);
            }
            return newState;
    };

    return tasksState;
};