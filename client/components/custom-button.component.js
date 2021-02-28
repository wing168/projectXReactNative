import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


const CustomButton = ({ buttonLabel, onPress }) => (
  
   <View style={styles.container}>
       <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}> {buttonLabel} </Text>
       </TouchableOpacity>
   </View>
  );
  
const styles = StyleSheet.create({
    container: {
        
        
    },
    button: {
        backgroundColor: '#5956d6',
        width: 120,
        height: 50,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        margin: 15

        
        
    },
    text: {
        
        color: 'white',
        letterSpacing: 0.5,
        fontWeight: 'bold'

    }
});

export default CustomButton;