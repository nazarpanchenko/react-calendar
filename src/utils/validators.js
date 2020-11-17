import moment from "moment";
import { getEventsList } from '../gateway/events.js';

export const date = {
    d: moment().format('YYYY-MM-DD', 'mm/dd/yyyy'),
    h : moment().format('hh'),
    m : moment().format('mm')
};

export const isTitleValid = text => text !== '';

export const isDateValid = (date, startTime, endTime) => {
    const dayStart = new Date(date);
    dayStart.setHours(0);

    const dayEnd = new Date(date);
    dayEnd.setHours(dayStart.getHours() + 24);

    const start = new Date(date, startTime);
    start.setHours(dayStart.getHours());

    const end = new Date(date, endTime);
    end.setHours(dayEnd.getHours());

    const validators = {
        datesNotSame: !(moment(start).isSame(end)),
        isInRange: (start > dayStart) && (end < dayEnd),
        notInPast: new Date() < new Date(date, startTime),
        isDurationValid: moment(end).diff(moment(start), 'hours') < 6
    };

    for (let validator in validators) {
        if (validators[validator] === false) return false; 
    }

    return true;
};

export const eventExists = event => {
    const { dateFrom, dateTo } = event;
    
    getEventsList().then(events => events.map(e => {
            if (new Date(dateFrom).getTime() === new Date(e.dateFrom).getTime() 
                || new Date(dateTo).getTime() === new Date(e.dateTo).getTime()) {
                    alert('Event is already planned on this date. Please, choose another date');
                    return true;
            }
            return false;
        })
    );
};

export const canDeleteEvent = event => {
    const eventStart = new Date(event.dateFrom),
        now = new Date();

    if (now >= eventStart) {
        return true;
    }
    return moment(eventStart).diff(moment(now), 'minutes') > 15;
};

export default date;