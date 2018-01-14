import React, { Component } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';

class App extends Component {
    render() {
        return (
            <div>
                <h1>todos</h1>
                <TaskForm />
                <TaskList />
            </div>
        );
    };
};

export default App;