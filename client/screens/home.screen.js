import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import UpcomingEvent from '../components/upcoming-events.component';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'
import { getEventDataDBAsync } from '../redux/calendar/calendar.actions';

import { homepageDataSelector, eventDataSelector } from '../redux/calendar/calendar.selectors';
import { userIDSelector } from '../redux/sign-in/sign-in-selectors';

const HomeScreen = ({ getEventDataDBAsync, homepageData, userID, eventData, navigation }) => {

    useEffect(() => {
        getEventDataDBAsync(userID);
        console.log('useEffect HomeScreen')

    }, [userID]);

    
    return (
        <View>
            <Text>Your upcoming socials</Text>
            <View>
                {homepageData.map((event, index) => 
                    <UpcomingEvent key={index} eventDate={event.eventDate} title={event.title} startTime={event.startTime} endTime={event.endTime} locationUse={event.locationUse} invitee={event.invitee} />
                )}
            </View>
        </View>
    )
}

const mapStateToProps = createStructuredSelector({
    userID: userIDSelector,
    homepageData: homepageDataSelector,
    eventData: eventDataSelector,

});

  
const mapDispatchToProps = dispatch => ({
getEventDataDBAsync: userID => dispatch(getEventDataDBAsync(userID))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);