import moment from "moment";
import { getEventsList } from '../gateway/events.js';

export const isTitleValid = text => text !== '';

export const isDateValid = (start, end) => {
    const validators = {
        isInRange: moment(start).startOf('day') < moment(end).endOf('day'),

        datesNotSame: !(moment(start).isSame(end)),

        isDurationValid: moment(end).diff(moment(start), 'hours') < 6,

        notInPast: !(moment().isSameOrBefore(start)),

        isCorrectMins: !(new Date(start.getMinutes()) % 15 
            && new Date(end).getMinutes() % 15)
    };

    for (let validator in validators) {
        if (validators[validator] === false) return false; 
    }
    return true;
};

export const eventExists = event => {
    const { dateFrom, dateTo } = event;
    
    getEventsList().then(events => events.map(e => {
            if (new Date(dateFrom).getTime() === new Date(e.dateFrom).getTime() &&
                new Date(dateTo).getTime() === new Date(e.dateTo).getTime()) {
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

    if (now.getTime() >= eventStart.getTime()) {
        return true;
    }
    return moment(eventStart).diff(moment(now), 'minutes') > 15;
};
