import React, { Component } from 'react';
import {AppRegistry, View} from 'react-native';
import { createAppContainer, createStackNavigator, createBottomTabNavigator, StackNavigator } from 'react-navigation';
import SearchScreen from './Screen/SearchScreen.js';
import MovieDetailScreen from './Screen/MovieDetailScreen.js';
import AccountScreen from './Screen/AccountScreen.js';
import HomeScreen from './Screen/HomeScreen.js';
import LoginScreen from './Screen/LoginScreen.js';
import StartScreen from './Screen/StartScreen.js';
import Icon from 'react-native-ionicons';
import firebase from '@firebase/app';
require('firebase/auth')

const AppContainer = createStackNavigator(
  {
    Search: {screen: SearchScreen},
    MovieDetail: {screen: MovieDetailScreen, navigationOptions: {header : null}}
  },
  { 
    navigationOptions: {header:{visible:false}},
    headerMode: 'screen',
    initialRouteName: 'Search',
  }
)

const SearchStack = createStackNavigator({
  Search: {
    screen: SearchScreen,
    navigationOptions: {
      header: null
    }
  },
})

const AccountStack = createStackNavigator({
  Account: {
    screen: AccountScreen,
    navigationOptions: {
      header: null
    }
  }
})

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    }
  }
})

const DashboardTabRoutes = createBottomTabNavigator(
  {
  Home: HomeStack,
  Search: SearchStack,
  Account: AccountStack
},
{
  tabBarOptions: {
    showLabel: false,
    animationEnabled: true
  },
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({focused, horizontal, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Home') {
        iconName = 'home';
      } else if (routeName === 'Search') {
        iconName = 'search';
      }
      else if (routeName === 'Account') {
        iconName = 'person';
      }
      return <Icon name={iconName} size={horizontal ? 20 : 25} color={tintColor}></Icon>;
    }
  })
})

const DashboardNavigator = createStackNavigator ({
  Start: {screen: StartScreen, navigationOptions: {header: null}},
  Login: {screen: LoginScreen, navigationOptions: {header: null}},
  DashboardTab: {
    screen:DashboardTabRoutes,
    navigationOptions: {
      header: null,
    }
  },
  MovieDetail: {screen: MovieDetailScreen, navigationOptions: {header : null}}
},
{initialRouteName:'Start'})

const AppComponent = createAppContainer(DashboardNavigator);

class App extends Component {

  componentDidMount() {
    

  }

  render() {
    return (
      <AppComponent></AppComponent>
    )
  }
}

export default App;

AppRegistry.registerComponent('MovieApp', () => App);