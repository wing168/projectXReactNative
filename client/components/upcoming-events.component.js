import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { convertDateToString } from '../redux/calendar/calendar.utils';

const UpcomingEvent = ({ eventDate, startTime, endTime, locationUse, invitee, title }) => {

    const eventDateString = convertDateToString(new Date(eventDate));

    return (
        <View>
            <Text>{eventDateString}</Text>
            <Text>{title}</Text>
            <Text>{startTime}</Text>
            <Text>{endTime}</Text>
            <Text>{locationUse}</Text>
            <Text>{invitee}</Text>
        </View>
       
    );
};

export default UpcomingEvent;