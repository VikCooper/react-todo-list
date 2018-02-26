import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import tasks from './tasks';

export default combineReducers({
    router: routerReducer,
    tasks
});
