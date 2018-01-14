import {OrderedMap, Map} from 'immutable'

export function arrToMap(arr, DataRecord = Map) {
    return arr.reduce((acc, item) =>
        acc.set(item.id, new DataRecord(item))
    , new OrderedMap({}))
}

export function mapToArr(obj) {
    return obj.valueSeq().toArray()
}

export function checkAllCheckboxes(state) {
    let newState = state;
    for (let id of state.entities) {
        newState = newState.setIn(['entities', id[0], 'isChecked'], true);
    }
    return newState;
}

export function resetAllCheckboxes(state) {
    let newState = state;
    for (let id of state.entities) {
        newState = newState.setIn(['entities', id[0], 'isChecked'], false);
    }
    return newState;
}