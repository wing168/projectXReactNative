import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as selectors from '../../redux/calendar/calendar.selectors';
import { setSelectedDates, setDateClickedOpenEvent } from '../../redux/calendar/calendar.actions';

import EventIcon from './event-icon.component';



const IndividualDays = ({ d, year, month, monthsArr, isToday, selectedDates, eventData, setDateClickedOpenEvent, setShowEventsOnDate, mainCalendar, setSelectedDates }) => {

    const dateInput = new Date(year, month, d);
    
    dateInput.setHours(dateInput.getHours() +1);

    const lookupField = `${monthsArr[month]}${d}${year}`;

    const handleClick = () => { 
        if (mainCalendar) {
            setDateClickedOpenEvent(`${d} ${monthsArr[month]} ${year}`);
        } 

        setSelectedDates(dateInput.toUTCString());
    }

    let styleSelector = styles.days;

    if (isToday(d, year, month) && selectedDates.indexOf(dateInput.toUTCString()) > -1) styleSelector = [styles.days, styles.selected];
    else if (selectedDates.indexOf(dateInput.toUTCString()) > -1) styleSelector = [styles.days, styles.selected];
    else if (isToday(d, year, month)) styleSelector = [styles.days, styles.today];
    

    return (
        <View style={styles.indDaysWrap}>
            {d <= 0 ? null : <Text 
                key={d} 
                style={styleSelector}
                onPress={handleClick}
            >
                {d}
            </Text>}

            <View>
                
                {eventData[lookupField] != null 
                ? 
                <EventIcon data={eventData[lookupField]} d={d} month={monthsArr[month]} year={year} setDateClickedOpenEvent={setDateClickedOpenEvent} /> 
                : null}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    indDaysWrap: {
        width: 60,
        alignItems: 'center'
    },
    days: {
       
      width:'50%',  
      padding: 5,
      textAlign: 'center',
      fontFamily: 'OpenSansRegular',
      color: 'black'
    },
    today: {
        fontWeight: 'bold',
        backgroundColor: 'rgb(211, 211, 211)',
        borderRadius: 1000
    },
    selected: {
        backgroundColor: '#5956d6',
        borderRadius: 10,
        fontWeight: 'bold',
        color: 'white'

    }
})

const mapStateToProps = createStructuredSelector ({
    selectedDates: selectors.selectedDatesSelector,
    mainCalendar: selectors.mainCalendarSelector

});

const mapDispatchToProps = dispatch => ({
    setSelectedDates: date => dispatch(setSelectedDates(date)),
    setDateClickedOpenEvent: date => dispatch(setDateClickedOpenEvent(date))
});
    

export default connect(mapStateToProps, mapDispatchToProps)(IndividualDays);