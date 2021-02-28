import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector} from 'reselect';

import MainCalendar from '../components/calendar/calendar.component';
import EventsOnDateScreen from '../screens/event-on-date.screen';

import { getEventDataDBAsync } from '../redux/calendar/calendar.actions';

import { eventDataSelector, selectedDatesSelector } from '../redux/calendar/calendar.selectors';
import { userIDSelector } from '../redux/sign-in/sign-in-selectors';

const CalendarScreen = ({ eventData, selectedDates, navigation, getEventDataDBAsync, userID }) => {
    
    useEffect(() => {
        getEventDataDBAsync(userID);

    }, []);
   

    return (
        <View>
            <MainCalendar eventData={eventData}/>
            {selectedDates.length > 0 ? <EventsOnDateScreen eventData={eventData} navigation={navigation} /> : null}
        </View>
    )
};

const mapStateToProps = createStructuredSelector({
    eventData: eventDataSelector,
    selectedDates: selectedDatesSelector,
    userID: userIDSelector
});


  
const mapDispatchToProps = dispatch => ({
getEventDataDBAsync: userID => dispatch(getEventDataDBAsync(userID))
});


export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen);