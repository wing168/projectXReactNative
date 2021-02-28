import React from 'react';
import { StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/FontAwesome5';

import HomeScreen from '../screens/home.screen';
import CalendarScreen from '../screens/calendar.screen';
import LogOutScreen from '../screens/logout.screen';
import AddEventScreen from '../screens/add-event.screen';
import EditEventsScreen from '../screens/edit-event.screen';

import AddEventButton from '../components/calendar/add-event-button.component';



const HomeStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomeStackScreen = ({ navigation }) => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name='Home' component={HomeScreen} options={{
                    headerRight: () => (
                        <Icon name="bars" size={20} color='#900' style={styles.burger} onPress={() => navigation.openDrawer()} />
                    )
                }}/>
            
        </HomeStack.Navigator>

    );
};

const CalendarStack = createStackNavigator();

const CalendarStackScreen = ({ navigation }) => {
    return (
        <CalendarStack.Navigator>
            <CalendarStack.Screen name='Calendar' component={CalendarScreen} options={{
                headerRight: () => (
                    <AddEventButton navigation ={navigation} />
                )
            }} />
            <CalendarStack.Screen name='Add Event' component={AddEventScreen} />
            <CalendarStack.Screen name='Edit Event' component={EditEventsScreen} />
        </CalendarStack.Navigator>
    )
}

const HomeStackTabScreen = () => {
    return (
        
            <Tab.Navigator>
                <Tab.Screen name='Home' component={HomeStackScreen} />
                <Tab.Screen name='Calendar' component={CalendarStackScreen} />

            </Tab.Navigator>

    )
}

const HomeStackTabDrawerScreen = () => {
    return (
        
        <NavigationContainer>
            <Drawer.Navigator drawerPosition={'right'} drawerType='slide'>
                <Drawer.Screen name='Home' component={HomeStackTabScreen} />
                <Drawer.Screen name='Logout' component={LogOutScreen} />
                
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    burger: {
        marginRight: 15
    }
});



export default HomeStackTabDrawerScreen;

