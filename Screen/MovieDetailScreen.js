import React, { Component }from 'react';
import { Text, Image, ActivityIndicator, StyleSheet, ScrollView, View, Dimensions, StatusBar } from 'react-native';


class MovieDetailScreen extends Component {

    static navigationOption = {
        title: 'Welcome',
        header: {visible:false}
    };

    constructor(props) {
        super(props);
        this.state = {
            isLoading:'true',

        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        const imdbId = navigation.getParam('imdbID', 'no-id');
        this.setState({isLoading:true});
        return fetch('http://www.omdbapi.com/?apikey=bdbedf66&i=' + imdbId )
        .then((response) => response.json())
        .then((responseJson) => {

            this.setState({
            isLoading:false,
            playerData:responseJson,
            }, function() {

            });
        })
        .catch((error) => {
            console.error(error);
        })
    }

    // async componentDidMount() {
    //     await Expo.Font.loadAsync({
    //         Roboto: require("native-base/Fonts/Roboto.ttf"),
    //         Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    //         Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    //       });
    //       this.setState({ isLoading: false})
    // }

    render () {
        // const { navigation } = this.props;
        // const imdbId = navigation.getParam('imdbID', 'no-id');
        if (this.state.isLoading) {
            return <ActivityIndicator></ActivityIndicator>
        }
        // return (
        //         <CollapsingToolbar
        //             toolbarColor='#000000'  
        //             title='Demo Toolbar'
        //             src={{uri: 'https://pmcvariety.files.wordpress.com/2018/11/spider-man-into-the-spider-verse-e1543416140763.jpg?w=891'}}>
        //             <Text>
        //                 {imdbId}             
        //             </Text>
        //         </CollapsingToolbar>
        
        // );

        return (
            <View style={{paddingTop:StatusBar.currentHeight}}>
                <View style={{height:window.height*0.75}}>
                    <Image resizeMode='stretch' style={styles.movieImage} source={{uri:this.state.playerData.Poster}}></Image>
                </View>
                <View style={styles.container}>
                    <View style={{height: window.height*0.25}}>
                        <ScrollView contentContainerStyle={styles.scrollContainer}>
                            <Text style={styles.title}>{this.state.playerData.Title}</Text>
                            <Text></Text>
                        </ScrollView>
                    </View>
                </View>
            </View>
            
        )
    }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },
    scrollContainer: {
        padding: 16
    },
    title: {
        fontSize: 24,
        marginVertical: 16
    },
    movieImage : {
        alignSelf: 'center',
        height: window.height*0.75,
        width: window.width,
      }
})

export default MovieDetailScreen;