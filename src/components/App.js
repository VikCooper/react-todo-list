import React, { Component } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import Filters from './Filters';
import {Switch, Route} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import history from '../history';

class App extends Component {
    render() {
        return (
            <ConnectedRouter history = {history}>
                <div>
                    <h1>todos</h1>
                    <TaskForm />
                    <Route path = "" component = {TaskList}/>
                    <Filters />
                </div>
            </ConnectedRouter>
        );
    };
};

export default App;
