import React, { Component } from 'react';
import { Dimensions, ActivityIndicator, Text, StyleSheet, View, TouchableHighlight, TouchableOpacity, Image, BackHandler } from 'react-native';
import Icon from 'react-native-ionicons';
import firebase from 'react-native-firebase';

class AccountScreen extends Component {

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.exitApp);
    }

    componentWillUnmount() {

    }

    exitApp = () => {
        BackHandler.exitApp();
    }

    constructor(props) {
        super(props);
        this.state = {
            isAccountLoading: true,
            isYourMovieLoading: true,
            isMovieExisted: false,
            textTest: 'Test'
        };

        this._logoutUser = this._logoutUser.bind(this);
    }

    _logoutUser() {
        firebase
            .auth()
            .signOut()
            .then(() => this.props.navigation.navigate('Login'))
            .catch(error => console.log('Error'))
    }

    _getYourMovie(accountId) {

    }

    render() {
        return (
            <View>
                <View style={styles.profileBar}>
                    <View style={styles.profileName}>
                        <Text style={styles.profileText}>Reivin Oktavianus</Text>
                    </View>
                    <TouchableOpacity onPress={this._logoutUser} style={styles.settingsIcon}>
                        <Icon name='settings'></Icon>
                    </TouchableOpacity>
                </View>
                <AccountDashboard accountInformationURL={'http://www.lovemarks.com/wp-content/uploads/profile-avatars/default-avatar-braindead-zombie.png'}></AccountDashboard>
                {/* {this.state.isAccountLoading ? <ActivityIndicator></ActivityIndicator> : <AccountDescription accountDescriptionText={this.state.textTest}></AccountDescription>} */}
                <AccountDescription accountDescriptionText={'Morbi interdum odio tincidunt, consectetur sem vitae, vulputate lorem. Vestibulum ac ipsum id nisi molestie tempus. Duis eu pellentesque sapien, ut feugiat lectus. Phasellus vitae finibus dui. Mauris accumsan a nisi suscipit laoreet. Cras ac ligula urna. Integer bibendum vitae lorem in ornare. Suspendisse hendrerit elit sed laoreet euismod. Quisque pellentesque enim a lacus mattis pretium.'}></AccountDescription>
                <YourMovies></YourMovies>
            </View>
        )
    }
}

const AccountDashboard = ({accountInformationURL}) => (
    <View style={styles.accountContainer}>
        <View style={styles.accountImageBar}>
            <TouchableHighlight style={styles.accountImageContainer}>
                <Image style={styles.accountImage} source={{uri:accountInformationURL}}></Image>
            </TouchableHighlight>
        </View>
        <View style={styles.accountLocationFollowContainer}>
            <View style={styles.accountLocationContainer}>
                <View style={styles.accountLocationInnerContainer}>
                    <Icon size={window.width/20} name='pin'></Icon>
                    <Text style={{fontStyle:'italic', fontSize: window.width/30, justifyContent: 'flex-end', paddingLeft: window.width/30}}>Jakarta - Indonesia</Text>
                </View>
            </View>
            <View style={styles.accountFollowContainer}>
                <View style={styles.accountFollowInnerContainer}>
                    <View style={styles.accountCountContainer}>
                        <Text style={styles.accountFollowCountText}>326</Text>
                        <Text style={styles.accountFollowText}>Following</Text>
                    </View>
                    <View style={styles.accountCountContainer}>
                        <Text style={styles.accountFollowCountText}>4220</Text>
                        <Text style={styles.accountFollowText}>Follower</Text>
                    </View>
                </View>
            </View>
        </View>
    </View>
);

const AccountDescription = ({accountDescriptionText}) => (
    <View style={styles.descriptionContainer}>
        <View style={styles.descriptionIcon}>
            <Icon name='quote' size={window.width/30}></Icon>
        </View>
        <View style={styles.descriptionText}>
            <Text style={{fontFamily:'Supra-NormalMezzo'}}>{accountDescriptionText}</Text>
        </View>
    </View>
);

const YourMovies = ({yourMoviesJson}) => (
    <View>
        <View style={styles.subTextContainer}>
            <View style={styles.subTextContainer}>
                <Text style={styles.subText}>Your movies</Text>
            </View>
            <View style={styles.subTextMoreContainer}>
                <Text style={styles.subTextMore}>More</Text>
            </View>
        </View>
    </View>
);

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    profileBar : {
        flex: 1,
        padding : 20,
        marginTop: 25,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    profileName: {
        width: window.width*4/5,
    },
    settingsIcon: {
        flex: 1,
        alignItems: 'center'
    },
    profileText : {
        fontSize: 30,
        color: 'black',
        fontFamily: 'Supra-MediumMezzo'
    },
    accountContainer : {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    accountImageBar : {
        flex: 1,
    },
    accountImageContainer : {
        height: 80,
        width: 80,
        borderRadius: 40
    },
    accountImage : {
        height: 80,
        width: 80,
        borderRadius: 40
    },
    accountLocationFollowContainer : {
        flex: 1,
        flexDirection: 'column',
    },
    accountLocationInnerContainer : {
        alignItems: 'stretch', 
        flexDirection: 'row',
    },
    accountLocationContainer : {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'flex-end'
    },
    accountFollowContainer : {
        alignItems: 'flex-end',
        marginTop: window.height/50
    },
    accountFollowInnerContainer : {
        width: window.width*2/5 - 20,
        alignItems: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    accountCountContainer : {
        flexDirection: 'column',
    },
    accountFollowCountText : {
        fontSize: window.width/20,
        textAlign:'center',
        color: 'black',
        fontFamily: 'Supra-NormalMezzo'
    },
    accountFollowText : {
        textAlign:'center',
        fontFamily: 'Supra-NormalMezzo'
    },
    descriptionContainer : {
        flexDirection: 'row',
        alignItems : 'stretch',
        padding: 20
    },
    descriptionIcon : {
        width : window.width/15,
        alignItems: 'flex-start'
    },
    descriptionText : {
        flex: 1,
    },
    subText : {
        fontSize: window.width/15,
        fontFamily: 'Supra-MediumMezzo',
        color: 'black',
    },
    subTextContainer : {
        width: window.width/3,
    },
    subTextMore : {
        fontSize: window.width/30,
        fontStyle: 'italic',
    },
    subTextMoreContainer : {
        width: window.width/10,
    },
    subTextContainer : {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10
    }
})

export default AccountScreen;