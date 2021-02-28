import React from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { setShowEventsOnDate } from '../../redux/calendar/calendar.actions';

import Icon from 'react-native-vector-icons/FontAwesome5';


const EventIcon = ({ data, d, month, year, setDateClickedOpenEvent, setShowEventsOnDate }) => {

    const colourPalette = ['#007aff', '#4cd964', '#ff3b30', '#ff9500', '#5956d6'];
    
    return (
        <View style={styles.iconWrap} onPress={() => {setDateClickedOpenEvent(`${d} ${month} ${year}`); setShowEventsOnDate(true); }}>
           {data.map((event, index) => {
               if (index <= 2) return <Icon style={[styles.icon, {color: colourPalette[index], backgroundColor: colourPalette[index]}]} key={index} name='circle' /> 
               
           })}

        </View>
    );
};

const mapDispatchToProps = dispatch => ({
    setShowEventsOnDate: date => dispatch(setShowEventsOnDate(date))
})

const styles = StyleSheet.create({
    iconWrap: {
        flexDirection: 'row',
        marginTop: 2
    },
    icon: {
        fontSize: 5,
        borderRadius: 50,
        marginHorizontal: 1

    }


})

export default connect(null, mapDispatchToProps)(EventIcon);

