import {OrderedMap, Map, List} from 'immutable';

export function arrToMap(arr, DataRecord = Map) {
    return arr.reduce((acc, item) =>
        acc.set(item.id, new DataRecord(item))
    , new OrderedMap({}))
};

export function mapToArr(obj) {
    return obj.valueSeq().toArray()
};

export function checkAllCheckboxes(state) {
    const newCompleted = [];

    let newState = state.update('entities', entities => 
        entities.map(entity => {
            if (entity.isChecked !== 'form-input__checked') {
                newCompleted.push(entity.id);
                return entity.set('isChecked', 'form-input__checked');
            } else return entity;
        }));

    return newState.update('completedCount', completedCount => completedCount.concat(newCompleted));
};

export function resetAllCheckboxes(state) {
   let newState = state.update('entities', entities => 
        entities.map(entity => entity.set('isChecked', '')));

    return newState.set('completedCount', new List([]));
};
