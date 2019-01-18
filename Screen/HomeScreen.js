import React, {Component} from 'react';
import { View, Text, Button, Image, BackHandler } from 'react-native';
import Icon from 'react-native-ionicons';

class HomeScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.exitApp);
    }

    exitApp = () => {
        BackHandler.exitApp();
    }

    static navigationOptions = {
        tabBarIcon: ({ tintColor }) => {
            return <Icon name='home' size={25} color={tintColor}></Icon>
        }
    }

    render() {
        return(
            <Text>Home Screen</Text>
        )
    }

}

export default HomeScreen;