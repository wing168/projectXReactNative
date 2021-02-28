import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SignUp from '../components/sign-up.component';


const SignUpScreen = ({ navigation }) => (
    
    <View>
    
        <Text>Create your account</Text>
        <SignUp navigation={navigation} />
        <Text>Already have an account? <Text style={styles.boldText} onPress={() => navigation.navigate("Sign In")}>Sign in now!</Text></Text>

    </View>
);

const styles = StyleSheet.create({
    boldText: {
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
})

export default SignUpScreen;