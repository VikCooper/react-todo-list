import React, { Component } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {addTask, checkAllTask} from '../AC';
import {ENTER_KEY} from '../constants';

class TaskForm extends Component {
    state = {
        text: ``
    };

    render() {
        return (
            <div>
                <button onClick = {this.handleCheckAll}>V</button>
                <input type = 'text' placeholder = 'What needs to be done?' value = {this.state.text}
                onChange = {this.handleTaskChange} onKeyDown = {this.handleAddTask} />
            </div>
        );
    };


    handleTaskChange = (ev) => {
        this.setState({
            text: ev.target.value
        });
    };

    handleAddTask = (ev) => {
        if (ev.which === ENTER_KEY) {
            ev.preventDefault();
            this.props.addTask(this.state);
            this.setState({
                text: ``
            });
        }
    };

    handleCheckAll = (ev) => {
        ev.preventDefault();
        this.props.checkAllTask();
    }

};

export default connect(null, {addTask, checkAllTask})(TaskForm);