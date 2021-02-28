import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import axios from 'axios';

import Icon from 'react-native-vector-icons/FontAwesome5';

const EventsOnDate = ({ id, eventDate, title, startTime, endTime, locationUse, invitee, notes, navigation }) => {
    
    const deleteEventsFromDB = async (id) => {
        
        try {
        const deleteEventsReq = axios({
            url: 'http://192.168.1.159:5000/events',
            method: 'delete',
            data: {
                id: id
            }
        });

    
        const deleteEventsRes = await deleteEventsReq;
        console.log(deleteEventsRes);

        navigation.replace("Calendar");
        
        } catch (err) {
            console.log(err);
        }
    }
   
    return (
        <View style={styles.eventOnDateWrap}>
            <View>
                <Text>{title}</Text>
                <Text>{startTime}</Text>
                <Text>{endTime}</Text>
                <Text>{locationUse}</Text>
                <Text>{invitee}</Text>
                <Text>{notes}</Text>
            </View>
            <View style={styles.iconsWrap}>
                <Icon name='edit' size={20} style={styles.indIcons} onPress={() => navigation.navigate("Edit Event", {editData: {id: id, eventDate: eventDate, title: title, startTime: startTime, endTime: endTime, locationUse: locationUse, invitee: invitee, notes: notes}})} />
                <Icon name='trash-alt' size={20} style={styles.indIcons} onPress={() => deleteEventsFromDB(id)} />
            </View>
            
            
        </View>
    )
};

const styles = StyleSheet.create({
    eventOnDateWrap: {
        flexDirection: 'row'
    },
    iconsWrap: {
        flexDirection: 'row',
    },
    indIcons: {
        paddingHorizontal: 10
    }
});



export default EventsOnDate;