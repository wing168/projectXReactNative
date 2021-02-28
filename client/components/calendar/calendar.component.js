import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as selectors from '../../redux/calendar/calendar.selectors'
import { setMonth, setYear, setSelectedDates, setDateClickedOpenEvent } from '../../redux/calendar/calendar.actions';
import * as calendarUtils from '../../redux/calendar/calendar.utils';

import IndividualDays from './individual-days.component';

import Icon from 'react-native-vector-icons/FontAwesome5';


const MainCalendar = ({ month, year, setMonth, setYear, currentDate, currentMonth, currentYear, daysArr, daysLeapYearArr, daysOfWeekArr, 
    monthsArr, eventData, setSelectedDates, setDateClickedOpenEvent }) => {

    const chkLeapYr = ((year % 4 === 0 && year % 100 !== 0) || (year % 100 === 0 && year % 400 === 0 ) ? true : false);
    const daysToUse = chkLeapYr ? daysLeapYearArr : daysArr;


    const incMonthFunc = () => {
        if (month === 11) {
            setMonth(0);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }

        //When changing calendar to a different month, remove the event on date screen and set date clicked to be today
        setSelectedDates(null);
        setDateClickedOpenEvent(`${calendarUtils.currentDate} ${calendarUtils.monthsArr[calendarUtils.currentMonth]} ${calendarUtils.currentYear}`);
    } 

    const decreaseMonthFunc = () => {
        if (month === 0) {
            setMonth(11);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }

        setSelectedDates(null);
        setDateClickedOpenEvent(`${calendarUtils.currentDate} ${calendarUtils.monthsArr[calendarUtils.currentMonth]} ${calendarUtils.currentYear}`);
    } 

    const isToday = (date, yr, mth) => {
        if (currentDate === date && currentYear === yr && currentMonth === mth) {
            return true;
        }
        return false;
    }

    let startDayOfMonth = new Date(year, month, 1).getDay();
    
    return (
        
        <View style={styles.daysOfWeekWrap}>
            <View style={styles.monthYearWrap}>
                <TouchableOpacity style={styles.monthNav} onPress={decreaseMonthFunc}>
                    <Icon name='angle-left' size={20} />
                </TouchableOpacity>
                
                <Text style={styles.monthYear}>{monthsArr[month]} {year}</Text>
                <TouchableOpacity style={styles.monthNav} onPress={incMonthFunc}>
                    <Icon name='angle-right' size={20} />
                </TouchableOpacity>
                
            </View>
            <View style={styles.daysWrap}>
                <View style={styles.daysHeader}>
                    {daysOfWeekArr.map(days => (
                        <Text key={days} style={styles.daysOfWeek}>{days}</Text>
                    ))}
                </View>
                <View style={styles.daysBody}>
                    {Array(daysToUse[month] + startDayOfMonth).fill(null).map((day, index) => {
                        const d = index - startDayOfMonth + 1;
                        
                        return (
                            <View key={index} style={styles.datesWrap}>
                                <IndividualDays d={d} month={month} year={year} monthsArr={monthsArr} isToday={isToday} eventData={eventData} />
                                 
                            </View>
                        );
                    })}
                </View> 
            </View>   
        </View>
        
    );
};

const styles = StyleSheet.create({
    daysOfWeekWrap: {
        padding: 15
    },
    monthYearWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    monthYear: {
        
        fontSize: 20,
        fontFamily: 'OpenSansSemiBold'
        
    },
    monthNav: {
        fontSize: 20,
        borderStyle: 'solid',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5
    },
    daysWrap: {
        width: '100%'
    },
    daysHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlign: 'center',
        flexGrow: 1,
        marginTop: 15
    },
    daysOfWeek: {
        padding: (5, 10),
        fontSize: 15,
        width: '14.2%',
        color: 'grey',
        fontFamily: 'OpenSansRegular'
        
    },
    daysBody: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    datesWrap: {
        
        textAlign: 'center',
        height: 50,
        width: '14.2%',
        alignItems: 'center'
    }


})

const mapStateToProps = createStructuredSelector({
    month: selectors.monthSelector,
    year: selectors.yearSelector,
    currentDate: selectors.currentDateSelector,
    currentMonth: selectors.currentMonthSelector,
    currentYear: selectors.currentYearSelector,
    daysArr: selectors.daysArrSelector,
    daysLeapYearArr: selectors.daysLeapYearArrSelector,
    daysOfWeekArr: selectors.daysOfWeekArrSelector,
    monthsArr: selectors.monthsArrSelector
})

const mapDispatchToProps = dispatch => ({
    setMonth: month => dispatch(setMonth(month)),
    setYear: year => dispatch(setYear(year)),
    setSelectedDates: date => dispatch(setSelectedDates(date)),
    setDateClickedOpenEvent: date => dispatch(setDateClickedOpenEvent(date))

})

export default connect(mapStateToProps, mapDispatchToProps)(MainCalendar);