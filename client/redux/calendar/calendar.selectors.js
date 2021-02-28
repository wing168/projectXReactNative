import { createSelector } from 'reselect';

const calendarSelector = state => state.calendar;

export const monthSelector = createSelector(
    [calendarSelector],
    calendar => calendar.month
);

export const yearSelector = createSelector(
    [calendarSelector],
    calendar => calendar.year
);

export const selectedDatesSelector = createSelector(
    [calendarSelector],
    calendar => calendar.selectedDates
);

export const currentDateSelector = createSelector(
    [calendarSelector],
    calendar => calendar.currentDate
);

export const currentMonthSelector = createSelector(
    [calendarSelector],
    calendar => calendar.currentMonth
);

export const currentYearSelector = createSelector(
    [calendarSelector],
    calendar => calendar.currentYear
);

export const daysArrSelector = createSelector(
    [calendarSelector],
    calendar => calendar.daysArr
);

export const daysLeapYearArrSelector = createSelector(
    [calendarSelector],
    calendar => calendar.daysLeapYearArr
);

export const daysOfWeekArrSelector = createSelector(
    [calendarSelector],
    calendar => calendar.daysOfWeekArr
);

export const monthsArrSelector = createSelector(
    [calendarSelector],
    calendar => calendar.monthsArr
);

export const mainCalendarSelector = createSelector(
    [calendarSelector],
    calendar => calendar.mainCalendar
);

export const dateClickedOpenEventSelector = createSelector(
    [calendarSelector],
    calendar => calendar.dateClickedOpenEvent
);

export const showEventsOnDateSelector = createSelector(
    [calendarSelector],
    calendar => calendar.showEventsOnDate
);

export const eventDataSelector = createSelector(
    [calendarSelector],
    calendar => calendar.eventData
);

export const homepageDataSelector = createSelector(
    [calendarSelector],
    calendar => calendar.homepageData
);
