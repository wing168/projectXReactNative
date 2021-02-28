import { calendarActionTypes } from './calendar.types';
import axios from 'axios';
import { transformData } from './calendar.utils'

export const setMonth = month => ({
    type: calendarActionTypes.SET_MONTH,
    payload: month
});

export const setYear = year => ({
    type: calendarActionTypes.SET_YEAR,
    payload: year
});


export const setSelectedDates = dates => ({
    type: calendarActionTypes.SET_SELECTED_DATES,
    payload: dates
});

export const setDateClickedOpenEvent = date => ({
    type: calendarActionTypes.SET_DATE_CLICKED_OPEN_EVENT,
    payload: date
});

export const setShowEventsOnDate = bool => ({
    type: calendarActionTypes.SET_SHOW_EVENTS_ON_DATE,
    payload: bool
});


export const getEventDataDBAsync = (userID) => {
    return async (dispatch) => {
        try {  
            const submitEventData = axios({
                url: 'http://192.168.1.159:5000/get-calendar',
                method: 'post',
                data: {
                    userID: userID
                }
            });
            console.log('getting data from DB')
            const eventDataRes = await submitEventData;

            const dateTimeNow = Date.now();

            //For homepage data, only want the three upcoming events to be displayed. Therefore need to apply filter twice, first time to get array that only has future data
            // ie upcoming data and then filter again to only extract the first three items in the array

            const homePageData = eventDataRes.data.data.filter(x => new Date(x.eventDate) > dateTimeNow).filter((x, i) => i < 3);

            const transformedData = transformData(eventDataRes.data.data);

            dispatch(setHomePageData(homePageData));
            dispatch(setEventsToState(transformedData));
            
            console.log('finished getting data from DB')
        } catch (err) {
            console.log(err.response);
        }

    }
}

export const setEventsToState = eventData => ({
    type: calendarActionTypes.SET_EVENTS_TO_STATE,
    payload: eventData
});

export const setHomePageData = data => ({
    type: calendarActionTypes.SET_HOMEPAGE_DATA,
    payload: data
    
});

