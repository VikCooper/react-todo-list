import React, { Component } from 'react';
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {editTask, checkTask, onDelete, endDelete} from '../../AC';
import { CSSTransitionGroup } from 'react-transition-group';
import {ENTER_KEY, ESCAPE_KEY} from '../../constants';
import './style.css';

class Task extends Component {
    static propTypes = {
        
    };

    state = {
        text: this.props.task.text,
        disabled: true,
        checked: this.props.task.isChecked
    };

    componentWillReceiveProps({task, completedCount, deleteChecked, onDelete, endDelete}) {
        if (task.isChecked) {
            this.setState({
                checked: task.isChecked,
            });
        }
    
        if (!task.isChecked) {
            this.setState({
                checked: task.isChecked,
            });
        }

        if (deleteChecked) {
            if (completedCount.indexOf(task.id) >= 0) {
                if (completedCount.size === 1) {
                    endDelete();
                }
                onDelete(task.id);
            }
        }
    };

    componentDidUpdate() {
        if (!this.state.disabled) {
            const node = this.refs.editField;
		    node.focus();
		    node.setSelectionRange(node.value.length, node.value.length);
        }
    };

    render() {
        const {task, allChecked} = this.props;
        return (
            <div>
                <input type = 'checkbox' onChange = {this.handleTaskChecked} checked = {this.state.checked}/>
                <label onDoubleClick = {this.enableChange}>
                    <input type = 'text'
                        value = {this.state.text}
                        disabled = {this.state.disabled}
                        onChange = {this.handleEdit}
                        onBlur = {this.handleSubmit}
                        onKeyDown = {this.handleKeyDown}
                        className = {this.state.checked}
                        ref = 'editField'
                    />
                </label>
                <button onClick = {this.handleDelete}>X</button>
            </div>
        );
    };

    handleTaskChecked = (ev) => {
        const {task, checkTask} = this.props;
        if (task.isChecked) {
            checkTask(task.id, ``);
        }
        if (!task.isChecked) {
            checkTask(task.id, `form-input__checked`);
        }
    };

    enableChange = (ev) => {
        ev.preventDefault();
        if (this.state.disabled) {
            this.setState({
                disabled: false,
                checked: ''
            });
        }
    };

    handleEdit = (ev) => {
        ev.preventDefault();

        this.setState({
            text: ev.target.value,
        });
    };

    handleSubmit = (ev) => {
        const val = this.state.text.trim();
        if (val) {
            this.props.editTask(this.props.task.id, val);
            this.setState({disabled: true});
        } else {
            this.handleDelete();
        }
    };

    handleDelete = (ev) => {
        if (ev) ev.preventDefault();
        const {task, editTask, onDelete} = this.props;
        editTask(task.id, null);
        onDelete(task.id);
    };

    handleKeyDown = (ev) => {
        if (ev.which === ESCAPE_KEY) {
            this.setState({
                text: this.props.task.text,
                disabled: true
            });
        } else if (ev.which === ENTER_KEY) {
            this.handleSubmit(ev);
        }
    };
};

export default connect((state) => {
    return {
        completedCount: state.tasks.completedCount,
        deleteChecked: state.tasks.deleteChecked
    }
}, {editTask, checkTask, onDelete, endDelete})(Task);
