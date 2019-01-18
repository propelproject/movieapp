import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import firebase from 'react-native-firebase';

class StartScreen extends React.Component {

    
    componentDidMount() {

        const firebaseConfig = {
            apiKey : 'AIzaSyCqM9ke-qOqOLFl5l2HAgvodcw7GYenp0k',
            authDomain : 'movieapp-91efb.firebaseapp.com',
            databaseURL : 'https://movieapp-91efb.firebaseio.com/'
          }
      
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                // const resetAction = StackActions.reset({
                //     index: 0,
                //     actions: [NavigationActions.navigate({ routeName: 'DashboardTab' })],
                //   });
                //   this.props.navigation.dispatch(resetAction);
                this.props.navigation.navigate('DashboardTab');
            } else {
                // const resetAction = StackActions.reset({
                //     index: 0,
                //     actions: [
                //         NavigationActions.navigate({ routeName: 'Login'}),
                //     ],
                //   });
                //   this.props.navigation.dispatch(resetAction);
                this.props.navigation.navigate('Login');
            }
        })
    }

    render() {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        )
    }

}

export default StartScreen;