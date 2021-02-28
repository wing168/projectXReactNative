import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

import { signInActionTypes } from './sign-in.types';
import { signInFailure } from '../admin-msgs/admin-msg.actions';
import { getEventDataDBAsync } from '../calendar/calendar.actions';


export const signInAsync = ( userDetails ) => {
    
    return async (dispatch) => {
        try {
            const loginSubmission = axios({
                url: 'http://192.168.1.159:5000/login',
                method: 'post',
                data: {
                    email: userDetails.email,
                    password: userDetails.password
                }
            });
              
            const loginRes = await loginSubmission;
            const token = loginRes.data.token;
    
            
            await AsyncStorage.setItem('token', token);
                   
            dispatch(setUserID(loginRes.data.userID));
            dispatch(getEventDataDBAsync(loginRes.data.userID));
            dispatch(authenticateUser(true));
            
            console.log('logged in', loginRes.data.userID)

        } catch (err) {
            
            dispatch(signInFailure(err.response.data.message))
             console.log('log in failed')
             
        }
 
    }
}

export const authenticateUser = bool => ({
    type: signInActionTypes.AUTHENTICATE_USER,
    payload: bool
});

export const setUserID = userID => ({
    type: signInActionTypes.SET_USER_ID,
    payload: userID
});



export const verifyUserAsync = () => {
    return async (dispatch) => {
        const token = await AsyncStorage.getItem('token');
       

        if (!token) return dispatch(authenticateUser(false));

        try {
            const verifyUser = axios({
                url: 'http://192.168.1.159:5000/verify',
                method: 'post',
                data: {
                token: token
                }
            });
    
            const verifyUserRes = await verifyUser;
            
            if (verifyUserRes) {
                
                dispatch(authenticateUser(true));
                dispatch(setUserID(verifyUserRes.data.message._id));
                return; 
            }
        } catch (err) {
            console.log(err.response);
            return dispatch(authenticateUser(false));
            }
        } 
}

export const userLogOut = () => {
    return async(dispatch) => {
        try {
            const token = await AsyncStorage.removeItem('token');
            console.log('logged out - token removed');
            return dispatch(authenticateUser(false));
        } catch (err) {
            console.log(err)
        }
        
    }
}
