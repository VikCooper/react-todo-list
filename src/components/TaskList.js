import React, { Component } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {mapToArr} from '../helpers';
import Task from './Task'

class TaskList extends Component {
    static propTypes = {

    };

    render() {
        const {tasks, filter} = this.props;
        const taskElements = tasks.map(task => {
          if (filter === task.isChecked || filter === `all`) {
            return (
                <li key={task.id}>
                    <Task task={task} />
                </li>
            );
          } else return null;
        });

        return (
            <ul>
                {taskElements}
            </ul>
        );
    };

};

export default connect((state) => {
    return {
        tasks: mapToArr(state.tasks.entities),
        filter: state.tasks.filter
    }
})(TaskList)