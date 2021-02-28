import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import { createStructuredSelector } from 'reselect';


import AuthStackScreen from './routes/auth';
import HomeStackTabDrawerScreen from './routes/home';

import { userAuthSelector } from './redux/sign-in/sign-in-selectors';
import { verifyUserAsync } from './redux/sign-in/sign-in.actions'

const App = ({ userAuthenticated, verifyUserAsync }) => {
  
  useEffect(() => {

    console.log('calling App useEffect')
    verifyUserAsync();
    
    //What is in AsyncStorage
    const checkStorage = async () => {
      try{
        const storage = await AsyncStorage.getAllKeys();
        console.log(`Storage items: ${storage}`);
      } catch(err) {
        console.log(err);
      }
    }

    checkStorage(); 

    //Delete token in storage

//     const removeToken = async () => {
//       try {
//         const token = await AsyncStorage.removeItem('token');
       
//       } catch (err) {
//         console.log(err);
//       }
//     }

//     removeToken();

})

  return (
        userAuthenticated ? 
        <HomeStackTabDrawerScreen />
        :
        <AuthStackScreen />

  )
}

const mapStateToProps = createStructuredSelector({
  userAuthenticated: userAuthSelector,
});

const mapDispatchToProps = dispatch => ({
  verifyUserAsync: () => dispatch(verifyUserAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);