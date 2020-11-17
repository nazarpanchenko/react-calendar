import React, { useState, useContext } from 'react';
import './eventDeletePopup.scss';
import PropTypes from 'prop-types';
import { getEventsList, deleteEvent } from '../../gateway/events.js';
import { canDeleteEvent } from '../../utils/validators';
import EventContext from '../../EventContext.js';

const EventDeletePopup = ({ eventId }) => {
    const [id, setId] = useState(eventId);
    const events = useContext(EventContext);

    const { eventsList, fetchEvents } = events;
    const event = eventsList.filter(event => event.id === eventId)[0];

    const onDelete = () => {
        setId(event.id);
            
        if (canDeleteEvent(event)) {
            deleteEvent(id).then(() => getEventsList())
                .then(eventsList => fetchEvents());
        } else {
            alert('Sorry, cannot cancel this event. It will start in 15 minutes');
        }
    };

    return (
        <div className="popup">
            <button type="button"
                className="popup__delete-btn"
                onClick={() => onDelete()}>

                <i className="fa fa-trash" aria-hidden="true"></i>
                Delete
            </button>
        </div>
    );
}

export default EventDeletePopup;

PropTypes.defaultTypes = {
    eventId: PropTypes.string
};