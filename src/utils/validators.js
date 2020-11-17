import moment from "moment";
import { getEventsList } from '../gateway/events.js';

export const isTitleValid = text => text !== '';

export const isDateValid = (date, startTime, endTime) => {
    
    const dayStart = new Date(date);
    dayStart.setHours(0);

    const dayEnd = new Date(date);
    dayEnd.setHours(dayStart.getHours() + 24);

    const start = new Date(date, startTime),
        end = new Date(date, endTime);

    const validators = {
        datesNotSame: !(moment(start).isSame(end)),

        notInPast: !(moment().isSameOrBefore(start)),

        isDurationValid: moment(end).diff(moment(start), 'hours') < 6,

        isCorrectMins: !(start.getMinutes() % 15 && end.getMinutes() % 15),
        
        isInRange: moment(start).isSameOrAfter(moment(dayStart)) 
            && moment(end).isSameOrBefore(moment(dayEnd))
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
