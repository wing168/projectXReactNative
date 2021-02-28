import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';
import axios from 'axios';

import { dateClickedOpenEventSelector } from '../redux/calendar/calendar.selectors';
import { userIDSelector } from '../redux/sign-in/sign-in-selectors';

import EventsSubmission from '../components/calendar/event-submission.component';



const AddEventScreen = ({ dateClickedOpenEvent, userID, navigation }) => {

    const timeNow = new Date().getHours();
    const start = timeNow < 10 ? `0${timeNow}` : timeNow; //Need to add leading zero if before 10 am
    const end = (timeNow + 1) < 10 ? `0${timeNow + 1}` : timeNow + 1; //Need to add leading zero if before 10 am

    const [{title, startTime, endTime, locationUse, invitee, notes}, setEvent] = useState({title:'', startTime: `${start}:00`, 
    endTime: `${end}:00`, locationUse: '', invitee: '', notes: ''});

    const handleChange = (text, name) => {
        

        setEvent(prevState => ({ ...prevState, [name]: text}));
    }


    const handleSubmit = async () => {

        const eventDate = new Date(`${dateClickedOpenEvent} ${startTime}:00`);

        try {
        const addEventReq = axios({
            url: 'http://192.168.1.159:5000/events',
            method: 'post',
            data: {
                    userID: userID,
                    title: title, 
                    eventDate: eventDate,
                    startTime: startTime, 
                    endTime: endTime, 
                    locationUse: locationUse, 
                    invitee: invitee, 
                    notes: notes
            }
        });

        

            const addEventRes = await addEventReq;

            console.log(addEventRes.data.message);

            

        } catch (err) {
            console.log(err.response);
        }

        navigation.reset({
            index: 0,
            routes: [{name: 'Calendar'}]
        }) //Need to reset the navigation so that we are back to the original calendar screen and screen is reloaded
        
    };

    return (
    <View>
        <Text>Add Event Page</Text>
        <EventsSubmission handleSubmit={handleSubmit} handleChange={handleChange} title={title} dateClickedOpenEvent={dateClickedOpenEvent} startTime={startTime} 
        endTime={endTime} locationUse={locationUse} invitee={invitee} notes={notes} navigation={navigation} />
    </View>
    )
};

const mapStateToProps = createStructuredSelector({
    dateClickedOpenEvent: dateClickedOpenEventSelector,
    userID: userIDSelector
});


export default connect(mapStateToProps, null)(AddEventScreen);