import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import {createStructuredSelector } from 'reselect';


import FormInput from './form-input.component';
import CustomButton from './custom-button.component';
import AdminMsg from './admin-msg.component';
import { signInErrorMsgSelector } from '../redux/admin-msgs/admin-msg.selectors';

import { signInAsync } from '../redux/sign-in/sign-in.actions';


const SignIn = ({ signInErrorMsg, userAuthenticated, signInAsync}) => {
    const [{ email, password }, setCredentials] = useState({email: '', password: ''});

    const handleChange = (text, name) => {
        
        setCredentials(prevState => ({ ...prevState, [name]: text}));

    }


    const handleSubmit = () => {

        signInAsync({ email: email, password: password });

        setCredentials({ email: '', password: ''}) 
 
    };
    

    return (
        <View>
            {signInErrorMsg ? <AdminMsg message={signInErrorMsg} color='rgba(221, 30, 30, 0.747)' /> : null}
            
            <FormInput name='email' value={email} handleChange={handleChange} label='Email' />
            <FormInput name='password' value={password} handleChange={handleChange} label='Password' type='password' />
            <CustomButton buttonLabel='Log In' onPress={handleSubmit} />
            
        </View>
    );
}

const mapStateToProps = createStructuredSelector({
signInErrorMsg: signInErrorMsgSelector
});


const mapDispatchToProps = dispatch => ({
    signInAsync: userDetails => dispatch (signInAsync(userDetails))
});


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);