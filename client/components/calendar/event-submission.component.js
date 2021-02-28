import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';

import { setDateClickedOpenEvent, setSelectedDates } from '../../redux/calendar/calendar.actions';
import { convertDateToString } from '../../redux/calendar/calendar.utils'

import FormInput from '../../components/form-input.component';
import CustomButton from '../../components/custom-button.component';

const EventsSubmission = ({ handleSubmit, handleChange, title, dateClickedOpenEvent, startTime, endTime, locationUse, invitee, notes, navigation, setDateClickedOpenEvent, setSelectedDates }) => {
    
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTime, setShowStartTime] = useState(false);
    const [showEndTime, setShowEndTime] = useState(false);

    const dateChange = (event, selectedDate) => {

        if (selectedDate) {

            const dateInput = new Date(selectedDate);
        
            dateInput.setHours(dateInput.getHours() + 1)
    
            setShowDatePicker(false);  
            setSelectedDates(dateInput.toUTCString());
            setDateClickedOpenEvent(convertDateToString(selectedDate));

        }

        setShowDatePicker(false);  
    }

    const startTimeChange = (event, selStartTime) => {

        //Only run the code if selStartTime has been selected (ie user hasn't pressed the cancel button)
        if (selStartTime) {

            let hourToDisplay = `${selStartTime.getHours()}`; //display as text
            let hourToDisplayPlus = `${selStartTime.getHours() === 23 ? '00' : selStartTime.getHours()+ 1}`
            let minuteToDisplay = `${selStartTime.getMinutes()}`; //display as text

            if (hourToDisplay.length === 1) hourToDisplay = '0' + hourToDisplay;
            if (hourToDisplayPlus.length === 1) hourToDisplayPlus = '0' + hourToDisplayPlus;
            if (minuteToDisplay.length === 1) minuteToDisplay = '0' + minuteToDisplay;
            
            const timeToDisplay = `${hourToDisplay}:${minuteToDisplay}`;
            const timeToDisplayPlus = `${hourToDisplayPlus}:${minuteToDisplay}`;
       
            setShowStartTime(false);
            handleChange(timeToDisplay, 'startTime');
            //Change end time to be an hour after
            handleChange(timeToDisplayPlus, 'endTime');
        }

        setShowStartTime(false);
        
    }

    const endTimeChange = (event, selEndTime) => {

        //Only run the code if selEndTime has been selected (ie user hasn't pressed the cancel button)
        if (selEndTime) {

            let hourToDisplay = `${selEndTime.getHours()}`; //display as text
            let minuteToDisplay = `${selEndTime.getMinutes()}`; //display as text

            if (hourToDisplay.length === 1) hourToDisplay = '0' + hourToDisplay;
            if (minuteToDisplay.length === 1) minuteToDisplay = '0' + minuteToDisplay;
            
            const timeToDisplay = `${hourToDisplay}:${minuteToDisplay}`;

            setShowEndTime(false);
            handleChange(timeToDisplay, 'endTime');

            //Check that the end time is not before the start time. If it is decrease the start time by one hour. Start time is a string so need to parse Int

            if (parseInt(startTime.substring(0,2)) > selEndTime.getHours()) {
                let hourToDisplayMinus = `${selEndTime.getHours() === 0 ? '23' : selEndTime.getHours() - 1}`;
                if (hourToDisplayMinus.length === 1) hourToDisplayMinus = '0' + hourToDisplayMinus;
                const timeToDisplayMinus = `${hourToDisplayMinus}:${minuteToDisplay}`;

                handleChange(timeToDisplayMinus, 'startTime');
            }

        }

        setShowEndTime(false);
        
    }


    return (
        <KeyboardAwareScrollView>
            <View>
                <FormInput name='title' label='Title' value={title} handleChange={handleChange} />

                <Text onPress={() => setShowDatePicker(true)}>{dateClickedOpenEvent}</Text>
                {showDatePicker ? <DateTimePicker value={new Date(dateClickedOpenEvent)} mode='date' display='default' onChange={dateChange} /> : null}
                
                <View style={styles.timeSelect}>
                  
                    <Text onPress={() => setShowStartTime(true)} style={styles.time}>{startTime}</Text>
                    {showStartTime ? <DateTimePicker value={new Date(dateClickedOpenEvent).setHours(startTime.substring(0,2))} mode='time' is24Hour={true} display='default' onChange={startTimeChange} /> : null}
                    
                    <Text onPress={() => setShowEndTime(true)} style={styles.time}>{endTime}</Text>
                    {showEndTime ? <DateTimePicker value={new Date(dateClickedOpenEvent).setHours(endTime.substring(0,2))} mode='time' is24Hour={true} display='default' onChange={endTimeChange} /> : null}
                    
                </View>

                <FormInput name='locationUse' label='Location' value={locationUse} handleChange={handleChange} />
                <FormInput name='invitee' label='Invitee' value={invitee} handleChange={handleChange} />
                <FormInput name='notes' label='Notes' value={notes} handleChange={handleChange} />
                <View style={styles.buttonWrap}>
                    <CustomButton buttonLabel='Save' onPress={handleSubmit} />
                    <CustomButton buttonLabel='Cancel' onPress={() => navigation.navigate("Calendar")} />
                </View>
                
            </View>
        </KeyboardAwareScrollView>
        
    );
};

const mapDispatchToProps = dispatch => ({
    setDateClickedOpenEvent: date => dispatch(setDateClickedOpenEvent(date)),
    setSelectedDates: date => dispatch(setSelectedDates(date))
});


const styles = StyleSheet.create({
    buttonWrap: {
        flexDirection: 'row'
    },
    timeSelect: {
        flexDirection: 'row',
        margin: 15
    },
    time: {
        marginHorizontal: 15
    }


})

export default connect(null, mapDispatchToProps)(EventsSubmission);