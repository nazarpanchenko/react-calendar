import React from 'react';
import Hour from '../hour/Hour';

import PropTypes from 'prop-types';

const Day = ({ dataDay, dayEvents }) => {
    const hours = Array(24).fill().map((val, index) => index);

    return (
        <div className="calendar__day" data-day={dataDay}>
            {hours.map(hour => {
                //getting all events from the day we will render
                const hourEvents = dayEvents
                    .map(event => ({
                        ...event,
                        dateFrom: new Date(event.dateFrom),
                        dateTo: new Date(event.dateTo)
                    }))
                    .filter(event => event.dateFrom.getHours() === hour);

                return (
                    <Hour
                        key={dataDay + hour}
                        dataHour={hour}
                        hourEvents={hourEvents}
                    />
                )
            })}
        </div>
    )
}

export default Day;

Day.propTypes = {
    dataDay: PropTypes.number,
    dayEvents: PropTypes.array
};

Day.defaultProps = {
    dayEvents: []
};