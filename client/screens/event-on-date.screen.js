import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { dateClickedOpenEventSelector } from '../redux/calendar/calendar.selectors';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import EventsOnDate from '../components/calendar/event-on-date.component';
import {lookUpFieldForData } from '../redux/calendar/calendar.utils'

const EventsOnDateScreen = ({ eventData, dateClickedOpenEvent, navigation }) => {
    
    
    const dataForDate = eventData[lookUpFieldForData(dateClickedOpenEvent)];

    return (
        <KeyboardAwareScrollView>
            <View>
                <Text>{`Events for ${dateClickedOpenEvent}`}</Text>
                <View style={styles.wrapper}>
                    {dataForDate && dataForDate.length > 0 
                    ? 
                    dataForDate.map((event, index) => <EventsOnDate key={index} eventDate={event.eventDate} id={event.id} title={event.title} startTime={event.startTime} 
                    endTime={event.endTime} invitee={event.invitee} locationUse={event.locationUse} notes={event.notes} navigation={navigation} />) 
                    : 
                    <Text>No events in diary</Text>}
                    
                </View>
            </View>
        </KeyboardAwareScrollView>
        
    ) 
};

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        flex: 1,
        flexWrap: 'wrap'
    }
})

const mapStateToProps = createStructuredSelector({
    dateClickedOpenEvent: dateClickedOpenEventSelector
});

export default connect(mapStateToProps, null)(EventsOnDateScreen)