import {createStore, applyMiddleware} from 'redux';
import reducer from '../reducer';
import logger from '../middlewares/logger';
import randomId from '../middlewares/randomId';
import {routerMiddleware} from 'react-router-redux';
import history from 'history';

const enhancer = applyMiddleware(routerMiddleware(history), randomId, logger);

const store = createStore(reducer, {}, enhancer);

export default store;
