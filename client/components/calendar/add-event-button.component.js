import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome5';

const AddEventButton = ({navigation}) => {
    return (
        <View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Add Event")}>
                <Text style={styles.buttonText} >Add Event</Text>
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    button: {
        margin: 15,
        
    },
    buttonText: {
     
        borderRadius: 10,
        paddingVertical: 7,
        paddingHorizontal: 10,
        backgroundColor: '#5956d6',
        color: 'white',
        fontWeight: 'bold'
        
    }
})

export default AddEventButton;