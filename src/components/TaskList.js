import React, { Component } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {mapToArr} from '../helpers';
import Task from './Task'

class TaskList extends Component {
    static propTypes = {

    };

    render() {
        const tasks = mapToArr(this.props.tasks.entities);
        const taskElements = tasks.map(task =>
            <li key= {task.id}>
                <Task task = {task} />
            </li>
        );

        return (
            <ul>
                {taskElements}
            </ul>
        );
    };

};

export default connect((state) => {
    return {
        tasks: state.tasks
    }
})(TaskList)