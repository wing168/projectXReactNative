import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AdminMsg = ({ message, color }) => {
    return (
        <View style={{backgroundColor: color, borderRadius: 5}}>
            <Text style={styles.text}> {message} </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        color: 'rgb(219, 219, 219)'
    }
})

export default AdminMsg;