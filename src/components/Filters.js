import React, { Component } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {setFilter, onDelete} from '../AC';
import {NavLink, Route} from 'react-router-dom';
import {mapToArr} from '../helpers';

class Filters extends Component {
    static propTypes = {

    };

    render() {
        const {tasks} = this.props;
        const tasksLength = mapToArr(tasks.entities).length;
        let deleteTasks = null;

        if (tasks.completedCount.size) {
            deleteTasks = (
                <button onClick = {this.deleteChecked}>Clear completed</button>
            );
        }

        return (
            <React.Fragment>
                <span>
                    {tasksLength - tasks.completedCount.size} items left
                </span>
                <ul>
                    <li onClick = {this.setAll}>
                        <NavLink to = {``} activeStyle = {{color: 'red'}}>
                            All
                        </NavLink>
                    </li>
                    <li onClick = {this.setActive}>
                        <NavLink to = {`/active`} activeStyle = {{color: 'red'}}>
                            Active
                        </NavLink>
                    </li>
                    <li onClick = {this.setCompleted}>
                        <NavLink to = {`/completed`} activeStyle = {{color: 'red'}}>
                            Completed
                        </NavLink>
                    </li>
                </ul>
                {deleteTasks}
            </React.Fragment>
        );
    };

    setAll = (ev) => {
        ev.preventDefault();
        this.props.setFilter(`all`);
    };

    setActive = (ev) => {
        ev.preventDefault();
        this.props.setFilter(``);
    };

    setCompleted = (ev) => {
        ev.preventDefault();
        this.props.setFilter(`form-input__checked`);
    };

    deleteChecked = (ev) => {
        ev.preventDefault();
        const {tasks, onDelete} = this.props;

        tasks.completedCount.forEach((id) => onDelete(id));
    };

};

export default connect((state) => {
    return {
        tasks: state.tasks
    }
}, {setFilter, onDelete})(Filters);
