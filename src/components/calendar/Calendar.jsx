import React, { Component } from 'react';

import Modal from '../modal/Modal';
import Navigation from './../navigation/Navigation';
import Week from '../week/Week';
import Sidebar from '../sidebar/Sidebar';

import events, { getEventsList, createEvent, deleteEvent } from '../../gateway/events.js';
import { getDateTime, formatEventDate } from '../../utils/dateUtils.js';
import './calendar.scss';
import PropTypes from 'prop-types';
import EventContext from '../../providers.js';
import { eventExists } from '../../utils/validators.js';

class Calendar extends Component {

    state = {
        events
    };

    componentDidMount() {
       this.fetchEvents();
    }

    fetchEvents = () => {
        getEventsList().then(eventsList => {
            this.setState({
                events: eventsList
            });
        });
    }

    onEventCreate = event => {
        const { title, description, dateFrom, dateTo } = formatEventDate(event);
        const newEvent = {
            title, 
            description, 
            dateFrom, 
            dateTo
        };

        if (!eventExists(newEvent)) {
            createEvent(newEvent).then(() => this.fetchEvents());
        }
    }

    render() {
        const { weekDates, closeEventWindow, isModalOpen, weekStartDate } = this.props;

        const events = {
            eventsList: this.state.events,
            getEventsList: getEventsList,
            deleteEvent: deleteEvent,
            rerender: this.fetchEvents
        };

        return (
            <section className="calendar">
                {isModalOpen 
                    ? <Modal 
                        onEventCreate={this.onEventCreate}
                        closeEventWindow={closeEventWindow}
                    />
                    : null
                }
                <Navigation weekDates={weekDates} />
                <div className="calendar__body">
                    <div className="calendar__week-container">
                        <Sidebar />
                        <EventContext.Provider value={events}>
                            <Week
                                weekDates={weekDates}
                                events={this.state.events}
                            />
                        </EventContext.Provider>
                    </div>
                </div>
            </section>
        )
    }
}

export default Calendar;

Calendar.propTypes = {
    weekDates: PropTypes.array,
    isModalOpen: PropTypes.bool
};

Calendar.defaultProps = {
    weekDates: [],
    isModalOpen: false
};