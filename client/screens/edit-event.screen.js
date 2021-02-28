import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';
import axios from 'axios';

import { dateClickedOpenEventSelector } from '../redux/calendar/calendar.selectors';

import EventsSubmission from '../components/calendar/event-submission.component';


const EditEventsScreen = ({ dateClickedOpenEvent, navigation, route }) => {
    

    const editData = route.params.editData ? route.params.editData : navigation.replace("Calendar");
    const id = editData.id ;

    console.log(editData);
    
    const [{title, startTime, endTime, locationUse, invitee, notes}, setEvent] = useState({title: editData.title, startTime: editData.startTime, endTime: editData.endTime, locationUse: editData.locationUse, invitee: editData.invitee, notes: editData.notes});

    const handleChange = (text, name) => {

        setEvent(prevState => ({ ...prevState, [name]: text}));
    }

    const handleSubmit = async () => {

        const eventDate = new Date(`${dateClickedOpenEvent} ${startTime}:00`);
        
        try {
        
        const editEventReq = axios({
            url: 'http://192.168.1.159:5000/events',
            method: 'put',
            data: {
                id: id,
                title: title, 
                eventDate: eventDate,
                startTime: startTime, 
                endTime: endTime, 
                locationUse: locationUse, 
                invitee: invitee, 
                notes: notes
            }
        })

        
        const editEventRes = await editEventReq;

        console.log(editEventRes);
        
        } catch (err) {
            console.log(err);
        }

        navigation.reset({
            index: 0,
            routes: [{name: 'Calendar'}]
        }); //Need to reset the navigation so that we are back to calendar screen and screen is reloaded
       
    };

    return (
        <View>
            <Text>Edit events page</Text>
           <EventsSubmission handleSubmit={handleSubmit} handleChange={handleChange} title={title} dateClickedOpenEvent={dateClickedOpenEvent} startTime={startTime} 
        endTime={endTime} locationUse={locationUse} invitee={invitee} notes={notes} navigation={navigation} /> 
        </View>
    );
};

const mapStateToProps = createStructuredSelector({
    dateClickedOpenEvent: dateClickedOpenEventSelector
});


export default connect(mapStateToProps, null)(EditEventsScreen);