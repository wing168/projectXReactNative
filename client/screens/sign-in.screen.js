import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


import SignIn from '../components/sign-in.component';

const SignInScreen = ({ navigation }) => {

    

    return (
        <View style={styles.container}>
            <Text>Welcome</Text>
            <Text>Sign in to continue</Text>
            <SignIn />
            <Text>Don't have an account? <Text style={styles.boldText} onPress={() => navigation.navigate("Sign Up")}>Sign Up Now</Text></Text>
            
            <Text>Forgot your password?</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    boldText: {
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    }
})

export default SignInScreen;