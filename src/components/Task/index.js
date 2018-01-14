import React, { Component } from 'react';
import {findDOMNode} from 'react-dom'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {editTask, checkTask} from '../../AC';
import { CSSTransitionGroup } from 'react-transition-group';
import {ENTER_KEY, ESCAPE_KEY} from '../../constants';
import './style.css';

class Task extends Component {
    static propTypes = {

    };

    state = {
        text: this.props.task.text,
        checkedStyle: '',
        disabled: true
    };

    componentWillReceiveProps({task}) {
        if (task.isChecked) {
            this.setState({checkedStyle: 'form-input__checked'});
        }

        if (!task.isChecked) {
            this.setState({checkedStyle: ''});
        }
    }

    componentDidUpdate() {
        if (!this.state.disabled) {
            const node = this.refs.editField;
		    node.focus();
		    node.setSelectionRange(node.value.length, node.value.length);
        }
    }

    render() {
        const {task} = this.props;
        return (
            <div>
                <input type = 'checkbox' onChange = {this.handleTaskChecked} />
                <label onDoubleClick = {this.enableChange}>
                    <input type = 'text'
                        value = {this.state.text}
                        disabled = {this.state.disabled}
                        onChange = {this.handleEdit}
                        onBlur = {this.handleSubmit}
                        onKeyDown = {this.handleKeyDown}
                        className = {this.state.checkedStyle}
                        ref = 'editField'
                    />
                </label>
            </div>
        );
    };

    handleTaskChecked = (ev) => {
        const {task, checkTask} = this.props;
        checkTask(task.id, !task.isChecked);
    };

    enableChange = (ev) => {
        ev.preventDefault();
        if (this.state.disabled) {
            this.setState({
                disabled: false
            });
        }
    }

    handleEdit = (ev) => {
        ev.preventDefault();

        this.setState({
            text: ev.target.value,
        });
    };

    handleSubmit = (ev) => {
        const val = this.state.text.trim();
        if (val) {
            console.log(val);
            this.props.editTask(this.props.task.id, val);
            this.setState({disabled: true});
        } else {
            // this.props.onDestroy();
        }
    }

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

export default connect(null, {editTask, checkTask})(Task);