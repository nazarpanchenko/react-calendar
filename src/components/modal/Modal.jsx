import React, { Component } from 'react';

import './modal.scss';
import PropTypes from 'prop-types';

import { isTitleValid, isDateValid } from '../../utils/validators.js';
import { dates } from '../../utils/dateUtils.js'; 

class Modal extends Component {
    state = {
        event: {
            title: '',
            description : '',
            date: null,
            startTime: null,
            endTime: null
        },
        canSubmit: false
    };

    componentWillUnmount() {
        this.clearForm();
    }

    clearForm = () => {
        this.setState({
            event: {},
            canSubmit: false
        });
    }

    checkValidity = event => {
        const { title, date, startTime, endTime } = event;
        // this.setState({
        //     canSubmit: isTitleValid(title) && isDateValid(date, startTime, endTime)
        // });
        this.setState({
            canSubmit: isTitleValid(title)
        });
    }

    onTextChange = event => {
        const { name, value } = event.target;
        const newEvent = {
            ...this.state.event,
            [name] : value
        };

        this.setState({
            event: {
                ...this.state.event,
                [name] : value
            }
        });
        this.checkValidity(newEvent);
    }
    
    onDateChange = event => {
        const { name, value } = event.target;
        const newEvent = {
            ...this.state.event,
            [name] : value
        };

        this.setState({
            event: {
                ...this.state.event,
                [name] : value
            }
        });
        this.checkValidity(newEvent);
    }

    handleEventCreate = event => {
        event.preventDefault();
        this.props.onEventCreate(this.state.event);
        this.clearForm();
    }

    render() {
        const { canSubmit } = this.state;
        const { closeEventWindow } = this.props;

        return (
            <div className="modal overlay">
                <div className="modal__content">
                    <div className="create-event">
                        <button 
                            className="create-event__close-btn" 
                            onClick={() => closeEventWindow()}>
                            +
                        </button>
                        <form className="event-form">
                            <input type="text"
                                name="title"
                                placeholder="Title"
                                className="event-form__field"
                                onChange={this.onTextChange}
                            />
                            <div className="event-form__time">
                                <input type="date"
                                    defaultValue={dates.d}
                                    name="date"
                                    className="event-form__field"
                                    onChange={this.onDateChange}
                                />
                                <input type="time"
                                    defaultValue={`${dates.h}:${dates.m}`}
                                    name="startTime"
                                    className="event-form__field"
                                    onChange={this.onDateChange}
                                />
                                <span>-</span>
                                <input type="time"
                                    defaultValue={`${dates.h}:${dates.m}`}
                                    name="endTime"
                                    className="event-form__field"
                                    onChange={this.onDateChange}
                                />
                            </div>
                            <textarea name="description"
                                placeholder="Description"
                                className="event-form__field"
                                onChange={this.onTextChange}>
                            </textarea>
                            <button type="submit"
                                className="event-form__submit-btn" 
                                onClick={this.handleEventCreate}
                                disabled={!canSubmit}>
                                Create
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Modal;

Modal.propTypes = {
    closeEventWindow: PropTypes.func,
    onEventCreate: PropTypes.func
};
