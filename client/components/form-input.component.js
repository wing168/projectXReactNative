import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';


const FormInput = ({ label, name, handleChange, type, value, onPress }) => {

 
    
    return (
 
        <View>
            <TextInput style={styles.textInput} value={value} placeholder={label} onChangeText={text => handleChange(text, name)} secureTextEntry={type === 'password' ? true : false}  />

        </View>
    );
};

const styles = StyleSheet.create({
    textInput: {

        borderBottomColor: 'gray',
        borderWidth: 1,
        borderRadius:10,
        marginTop: 20,
        fontSize: 15,
        width: 250

    }
})

export default FormInput;
