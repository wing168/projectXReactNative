import { calendarActionTypes } from './calendar.types';
import * as calendarUtils from './calendar.utils';

const INITIAL_STATE = {
    daysArr: calendarUtils.daysArr,
    daysLeapYearArr: calendarUtils.daysLeapYearArr,
    daysOfWeekArr: calendarUtils.daysOfWeekArr,
    monthsArr: calendarUtils.monthsArr,
    currentDate: calendarUtils.currentDate,
    currentMonth: calendarUtils.currentMonth,
    currentYear: calendarUtils.currentYear,
    month: calendarUtils.currentMonth,
    year: calendarUtils.currentYear,
    selectedDates: [],
    mainCalendar: true,
    dateClickedOpenEvent: `${calendarUtils.currentDate} ${calendarUtils.monthsArr[calendarUtils.currentMonth]} ${calendarUtils.currentYear}`,
    ShowEventsOnDate: false,
    homepageData: [],
    eventData: {}   
}

const calendarReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case calendarActionTypes.SET_MONTH:
            return {
                ...state,
                month: action.payload
            }
        
        case calendarActionTypes.SET_YEAR:
            return {
                ...state,
                year: action.payload
            }
        
        
        case calendarActionTypes.SET_SELECTED_DATES:
            return {
                ...state,
                selectedDates: calendarUtils.addRemoveDatesToState(action.payload, state.mainCalendar, state.selectedDates)
            }
        
        case calendarActionTypes.SET_DATE_CLICKED_OPEN_EVENT:
            return {
                ...state,
                dateClickedOpenEvent: action.payload
            }
        
        case calendarActionTypes.SET_SHOW_EVENTS_ON_DATE:
            return {
                ...state,
                ShowEventsOnDate: action.payload
            }

        case calendarActionTypes.SET_EVENTS_TO_STATE:
            return {
                ...state,
                eventData: action.payload
            }

        case calendarActionTypes.SET_HOMEPAGE_DATA:
            return {
                ...state,
                homepageData: action.payload
            }
        
        default:
            return state;
    }
};

export default calendarReducer;