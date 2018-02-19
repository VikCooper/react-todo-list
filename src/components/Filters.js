import React, { Component } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {setFilter, deleteChecked} from '../AC';
import {NavLink, Route} from 'react-router-dom';
import {mapToArr} from '../helpers';

class Filters extends Component {
    static propTypes = {

    };

    render() {
        const {tasks} = this.props;
        const tasksLength = mapToArr(tasks.entities).length;

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
                <button onClick = {this.props.deleteChecked}>Clear completed</button>
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

};

export default connect((state) => {
    return {
        tasks: state.tasks
    }
}, {setFilter, deleteChecked})(Filters);
