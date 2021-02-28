import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { userLogOut } from '../redux/sign-in/sign-in.actions'

import CustomButton from '../components/custom-button.component';

const LogOutScreen = ({ navigation, userLogOut }) => {

    const handleLogout = () => {
        userLogOut();
    }

    return (
 
        <View style={styles.centeredView}>
            <Text>Are you sure you want to logout?</Text>
            <View style={styles.buttons}>
                <CustomButton buttonLabel='Yes' onPress={handleLogout} />
                <CustomButton buttonLabel='No' onPress={() => navigation.goBack()} />
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    }
});

const mapDispatchToProps = dispatch => ({
    userLogOut: () => dispatch(userLogOut())
})

export default connect(null, mapDispatchToProps)(LogOutScreen);