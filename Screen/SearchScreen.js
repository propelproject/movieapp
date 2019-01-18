import React, { Component }from 'react';
import { Dimensions, FlatList, ActivityIndicator, ScrollView, AppRegistry, TouchableHighlight, TouchableWithoutFeedback, Button, StyleSheet, Text, TextInput, View, StatusBar, Image, BackHandler } from 'react-native';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import Icon from 'react-native-ionicons';

class SearchScreen extends React.Component {

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.exitApp);
  }

  exitApp = () => {
    BackHandler.exitApp();
  }

  _keyExtractor = (item, index) => item.id;
  
  constructor(props) {
    super(props);
    this.state = {
        text: '',
        isLoading: false,
    };
    this._searchMovie = this._searchMovie.bind(this);
    this._goToMovieDetail = this._goToMovieDetail.bind(this);
  }

  _searchMovie(movieKey) {
    this.setState({isLoading:true});
    return fetch('http://www.omdbapi.com/?apikey=bdbedf66&s=' + movieKey )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading:false,
          playerData:responseJson.Search,
        }, function() {

        });
      })
      .catch((error) => {
        console.error(error);
      })
  }

  _goToMovieDetail(movieID) {
    console.log(movieID);
    this.props.navigation.navigate('MovieDetail', {imdbID: movieID});
  }

  render() {
    
    if (this.state.isLoading) {
      return (
        <View style={{paddingTop: StatusBar.currentHeight}}>
          {/* Search Bar */}
          <View style={styles.searchBarContainer}>
            <TextInput 
              style={{padding: 10}} 
              placeholder="Insert Movie Name"
              onChangeText={(text) => this.setState({text})}
              onSubmitEditing={() => this._searchMovie(this.state.text)}></TextInput>
              <Icon name='search' size={20}></Icon>
          </View>
          {/* Movie List */}
          <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
          </View>
      );
    }

    return (
      <View style={{paddingTop: StatusBar.currentHeight}}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
            <TextInput 
              style={{padding: 10}} 
              placeholder="Insert Movie Name"
              onChangeText={(text) => this.setState({text})}
              onSubmitEditing={() => this._searchMovie(this.state.text)}></TextInput>
              <Icon name='search' size={20}></Icon>
        </View>
        {/* Movie List */}
        <View>
          <ScrollView contentContainerStyle={{paddingBottom: 100}}><FlatList
            data={this.state.playerData}
            renderItem={({item}) => 
              <View>
                <TouchableWithoutFeedback onPress={() => this._goToMovieDetail(item.imdbID)}>
                  <View style={styles.listview}>
                    <Image borderRadius={10} resizeMode='stretch' style={styles.movieImage} source={(item.Poster == 'N/A') ? require('./default-placeholder.png') : {uri : item.Poster}}></Image>
                    <View style={styles.movieDetail}>
                      <Text style={{fontSize:20, fontWeight: 'bold'}}>{item.Title}</Text>
                      <Text style={{color:'grey'}}>{item.Year}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            }
            keyExtractor={(item, index) => item.imdbID}>
          </FlatList></ScrollView>
        </View>
        </View>
    );
  }
}

export default SearchScreen;

const window = Dimensions.get('window');

const styles = StyleSheet.create({
  listview : {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
  },
  searchBarContainer : {

    flexDirection: 'row',
    alignItems: 'stretch'
  },
  movieImage : {
    alignSelf: 'center',
    height: window.height*1/4 - 5,
    width: window.width*1/3 - 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    overflow: 'hidden'
  },
  movieDetail : {
    padding : 10,
    width: window.width*0.6,
    flex: 1,
    flexDirection: 'column'
  },
  playerRow : {
    width: window.width*2/3,
    backgroundColor: '#ffffff'
  },
  playerPointsRow : {
    width: window.width/4,
    backgroundColor: '#e90052'
  }
})

// AppRegistry.registerComponent('AwesomeProject', () => BlinkApp);
