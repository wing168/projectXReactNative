import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import FormInput from './form-input.component'
import CustomButton from './custom-button.component';
import AdminMsg from './admin-msg.component';

import axios from 'axios';

const SignUp = ({ navigation }) => {
    
    
    const [{ firstName, lastName, email, password, confirmPW }, setCredentials] = useState({ firstName: '', lastName: '', email: '', password: '', confirmPW: '' });
    
    console.log(firstName, lastName, email, password, confirmPW);
    const [errorMsg, setError] = useState(null);
    const [adminMsg, setAdminMsg] = useState(null);

    const handleChange = (text, name) => {
        

        setCredentials(prevState => ({ ...prevState, [name]: text}));
    }


    const handleSubmit = async() => {
  
        //check that the password is confirmed

        if (password !== confirmPW) {
            setCredentials ({firstName: firstName, lastName: lastName, email: email, password: '', confirmPW: ''});
            return setError('Password does not match - please try again');

        }

        const registerSubmission = axios({
            url: 'http://192.168.1.159:5000/signup',
            method: 'post',
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            }
        });

        try {
            const registerRes = await registerSubmission;

            setAdminMsg(registerRes.data.message);
            setCredentials({firstName: '', lastName: '', email: '', password: '', confirmPW: ''});

            setError(null);
            setTimeout(() => navigation.navigate("Sign In"), 2500);
         
        } catch (err){

            setCredentials({firstName: firstName, lastName: lastName, email: '', password: '', confirmPW: ''});
            setError(err.response.data.message);
            
        }

    }

    return (
        <KeyboardAwareScrollView>
            <View>
                {errorMsg ? <AdminMsg message={errorMsg} color='rgba(221, 30, 30, 0.747)' /> : null}
                {adminMsg ? <AdminMsg message ={adminMsg} color='rgb(90, 90, 90)' /> : null} 
            
                <FormInput name='firstName' value={firstName} handleChange={handleChange} label='First Name' />
                <FormInput name='lastName' value={lastName} handleChange={handleChange} label='Surname' />
                <FormInput name='email' value={email} handleChange={handleChange} label='Email' />
                <FormInput name='password' value={password} handleChange={handleChange} label='Password' type='password'  />
                <FormInput name='confirmPW' value={confirmPW} handleChange={handleChange} label='Confirm Password' type='password'  />
                <CustomButton buttonLabel='Sign Up' onPress={handleSubmit}/>

            </View>

        </KeyboardAwareScrollView>
        
    )
};

export default SignUp;