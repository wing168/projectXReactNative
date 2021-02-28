import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignUpScreen from '../screens/sign-up.screen';
import SignInScreen from '../screens/sign-in.screen';

const authStack = createStackNavigator();

const AuthStackScreen = () => {
    return (
        <NavigationContainer>
            <authStack.Navigator>
                <authStack.Screen name='Sign In' component={SignInScreen} />
                <authStack.Screen name='Sign Up' component={SignUpScreen} />
            </authStack.Navigator>
        </NavigationContainer>

    );
};

export default AuthStackScreen;