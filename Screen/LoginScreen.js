import React, { Component } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput, ToastAndroid, ActivityIndicator, ScrollView, BackHandler } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import RNExitApp from 'react-native-exit-app';
import Icon from 'react-native-ionicons'
import firebase from 'react-native-firebase';

const NOINPUT = 1;
const WRONGEMAIL = 2;
const EMAILNOTFOUND = 3;
const WRONGPASSWORD = 4;
const TIMEOUTERROR = 5;
const ALLNOINPUT = 6;
const WRONGFORMATPASSWORD = 7;
const WRONGFORMATPHONE = 8;

const ACTIVETABCOLOR = '#000000';
const INACTIVETABCOLOR = '#A9A9A9';

const tabs = [
    'Sign In',
    'Register'
]

const window = Dimensions.get('window');

const maxTabSize = window.width/8;
const minTabSize = window.width/12;
const animatedTabSize = maxTabSize - minTabSize;

const resetAction = StackActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({ routeName: 'DashboardTab'}),
    ],
  });

class LoginScreen extends React.Component {

    numItems = tabs.length
    itemWidth = (window.width / this.numItems)
    animVal = new Animated.Value(0)

    constructor(props) {
        super(props);
        this.state = {
            loginUsername: '',
            registerUsername: '',
            loginPassword: '',
            registerPassword: '',
            registerName: '',
            registerPhone: '',
            passwordIsVisible: true,
            passwordIconName: 'eye',
            loginIsLoading: false,
            registerIsLoading: false,
            selection: {start:0,end:0},
            textBarSize: 20
        }
        this._togglePasswordVisibility = this._togglePasswordVisibility.bind(this);
        this._loginButtonClicked = this._loginButtonClicked.bind(this);
        this._writeUserData = this._writeUserData.bind(this);
        this._registerButtonClicked = this._registerButtonClicked.bind(this);
        this._showToast = this._showToast.bind(this);
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.exitApp);
    }

    exitApp = () => {
        BackHandler.exitApp();
    }

    _writeUserData(email, fullname, phonenumber) {
        firebase.database().ref('users/').push({
            email,
            fullname,
            phonenumber
        }).then((data) => {
            this.props.navigation.navigate('DashboardTab');
            this.setState({loginIsLoading:false});
        }).catch((error) => {
            console.error(error.message);
        })
    }

    _togglePasswordVisibility() {
        this.state.passwordIsVisible = !this.state.passwordIsVisible;
        if (this.state.passwordIsVisible) {
            this.setState({passwordIconName:'eye'})
        } else {
            this.setState({passwordIconName:'eye-off'})
        }
        // this._textInput.setNativeProps({
        //     selection: {
        //         start: this.state.password.length,
        //         end: this.state.password.length
        //     }
        // })
        // this.setState({selection:{start:this.state.password.length, end:this.state.password.length+1}});
    }

    _loginButtonClicked() {
        this.setState({loginIsLoading:true})
        if (this.state.loginPassword === '' || this.state.loginUsername === '') {
            //Email or password is not written
            this._showToast(NOINPUT);
            this.setState({loginIsLoading:false})
        } else {
            if (this._validateEmail(this.state.loginUsername)) {
                this._loginUser();
            }
            else {
                this._showToast(WRONGEMAIL);
                this.setState({loginIsLoading:false})
            }
        }
    }

    _registerButtonClicked() {
        this.setState({registerIsLoading:true})
        if (this.state.registerPassword === '' || this.state.registerUsername === '' || this.state.registerName === '' || this.state.registerPhone === '') {
            //Email or password is not written
            this._showToast(ALLNOINPUT);
            this.setState({registerIsLoading:false})
        } else {
            if (this._validateEmail(this.state.registerUsername)) {
                this._registerUser();
            }
            else {
                this._showToast(WRONGEMAIL);
                this.setState({registerIsLoading:false})
            }
        }
    }

    _loginUser() {
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.loginUsername, this.state.loginPassword)
            .then(() => {
                this.props.navigation.navigate('DashboardTab');
                this.setState({loginIsLoading:false});
            })
            .catch(error => {
                this.setState({loginIsLoading: false});
                this._showToastText(error.message);
            })
            
    }

    _registerUser() {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.registerUsername, this.state.registerPassword)
            .then(() => {
                this._writeUserData(this.state.registerUsername, this.state.registerName, this.state.registerPhone)
            })
            .catch(error => {
                this._showToastText(error.message),
                this.setState({registerIsLoading: false})
            }) 
    }

    _showToastText(message) {
        ToastAndroid.showWithGravity(
            message,
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM
        );
    }

    _showToast(toastId) {
        if (toastId === NOINPUT) {
            ToastAndroid.showWithGravity(
                'Email and Password both must be written',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
        if (toastId === WRONGEMAIL) {
            ToastAndroid.showWithGravity(
                'Incorrect email format',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        }
        if (toastId === EMAILNOTFOUND) {
            ToastAndroid.showWithGravity(
                'No email is found',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        }
        if (toastId === WRONGPASSWORD) {
            ToastAndroid.showWithGravity(
                'Wrong password',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        }
        if (toastId === TIMEOUTERROR) {
            ToastAndroid.showWithGravity(
                'Timeout Error. Please try again later.',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        }
        if (toastId === WRONGFORMATPASSWORD) {
            ToastAndroid.showWithGravity(
                'Password must be 8 characters long and contains number',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        }
        if (toastId === WRONGFORMATPHONE) {
            ToastAndroid.showWithGravity(
                'You should specify the correct phone number',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        }
        if (toastId === ALLNOINPUT) {
            ToastAndroid.showWithGravity(
                'All of the credential must be written',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            )
        }
    }

    _validateEmail = (email) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        return reg.test(email);
    }
    
    render() {

        let viewpager = [];
        let barArray = [];

        tabs.forEach((tab, i) => {
            if (tab === 'Sign In') {
                const thisView = (
                    <LoginPage
                        key={'tab${i}'}
                        loginUsername = {(loginUsername) => this.setState({loginUsername})}
                        loginPassword = {(loginPassword) => this.setState({loginPassword})}
                        loginPasswordIsVisible = {this.state.passwordIsVisible}
                        loginPasswordIconName = {this.state.passwordIconName}
                        loginTextInput = {this._textInput}
                        loginIsLoading = {this.state.loginIsLoading}
                        togglePasswordVisibility = {() => this._togglePasswordVisibility()}
                        loginButtonClicked = {() => this._loginButtonClicked()}
                    ></LoginPage>
                )
                viewpager.push(thisView)
            }
            else {
                const thisView = (
                    <RegisterPage
                        key={'tab${i}'}
                        registerUsername = {(registerUsername) => this.setState({registerUsername})}
                        registerPassword = {(registerPassword) => this.setState({registerPassword})}
                        registerName = {(registerName) => this.setState({registerName})}
                        registerPhone = {(registerPhone) => this.setState({registerPhone})}
                        registerPasswordIsVisible = {this.state.passwordIsVisible}
                        registerPasswordIconName = {this.state.passwordIconName}
                        registerTextInput = {this._textInput}
                        registerIsLoading = {this.state.registerIsLoading}
                        togglePasswordVisibility = {() => this._togglePasswordVisibility()}
                        registerButtonClicked = {() => this._registerButtonClicked()}
                    ></RegisterPage>
                )
                viewpager.push(thisView)
            }

            const scrollBarVar = this.animVal.interpolate({
                inputRange: [window.width * (i - 1), window.width * (i + 1)],
                outputRange: [maxTabSize - i*animatedTabSize, minTabSize + i*animatedTabSize],
                interpolate: 'clamp'
            })
            const colorInterpolate = this.animVal.interpolate({
                inputRange: [window.width * (i - 1), window.width * (i + 1)],
                outputRange: i === 0 ? [ACTIVETABCOLOR, INACTIVETABCOLOR]: [INACTIVETABCOLOR, ACTIVETABCOLOR]
            })

            const tabBar = (
                <View
                    key={'bar${i}'}
                    style={[
                        {
                            width: 200,
                            height: 100,
                            alignItems: 'center',
                            flex: 1,
                            justifyContent: 'center',
                        }
                    ]}
                >
                    <Animated.Text
                        style={[
                            {
                                width: 200,
                                height: 100,
                                fontSize: scrollBarVar,
                                textAlign: 'center',
                                fontFamily: 'Supra-MediumMezzo',
                                color: colorInterpolate
                            }
                        ]}
                    >{tab}</Animated.Text>
                </View>
            );
            barArray.push(tabBar)
        })

        return(

            <View style = {{flex: 1, flexDirection: 'column'}}>
                <View style = {styles.tabBar}>
                    {barArray}
                </View>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={10}
                    pagingEnabled
                    onScroll={
                        Animated.event(
                            [{ nativeEvent: { contentOffset: {x: this.animVal}}}]
                        )
                    }>
                    {viewpager}
                </ScrollView>
            </View>

            

            
                // <TabbedPager
                //     data = {this.data}
                //     renderTab={this._renderTab}
                //     renderPage={this._renderViewPager}
                //     tabIndicatorHeight={window.height/15}
                //     staticTabWidth={window.width*5/7}
                //     initialPage={{title: 'Sign In'}}
                //     renderAsCarousel={true}
                //     scrollTabsEnabled={true}
                // ></TabbedPager>

            // <LoginPage
            //     loginUsername = {(username => this.setState({username}))}
            //     loginPassword = {(password) => this.setState({password})}
            //     loginPasswordIsVisible = {this.state.passwordIsVisible}
            //     loginPasswordIconName = {this.state.passwordIconName}
            //     loginTextInput = {this._textInput}
            //     loginIsLoading = {this.state.isLoading}
            //     togglePasswordVisibility = {() => this._togglePasswordVisibility()}
            //     loginButtonClicked = {() => this._loginButtonClicked()}
            // ></LoginPage>
            
            // <View style={styles.formContainer}>
            //     <FormInput 
            //         onChangeText={(username) => this.setState({username})}
            //         iconName='person'
            //         keyboardType='email-address'
            //         placeholder='Enter your email'
            //         secureTextEntry={false}>
            //     </FormInput>
            //     <FormInput 
            //         onChangeText={(password) => this.setState({password})}
            //         iconName='lock'
            //         keyboardType='default'
            //         placeholder='Enter your password'
            //         formType='password'
            //         secureTextEntry={!this.state.passwordIsVisible}
            //         passwordIconName={this.state.passwordIconName}
            //         togglePasswordVisibility={() => this._togglePasswordVisibility()}
            //         inputSelection={this._textInput}>
            //     </FormInput>
            //     <TouchableOpacity
            //         onPress={() => this._loginButtonClicked()}
            //         style={styles.buttonContainer}>
            //         {this.state.isLoading ? <ActivityIndicator></ActivityIndicator> : <Text style={styles.buttonText}>Login</Text>}
            //     </TouchableOpacity>
            // </View>
                
        );
    }
}

const TabView = ({tabTitle}) => (
    <View style={{ flexDirection:'column'}}>
        <Text style={styles.tabText}>{tabTitle}</Text>
    </View>
);

const LoginPage = ({loginUsername, loginPassword, loginPasswordIsVisible, loginPasswordIconName, loginTextInput, loginIsLoading, togglePasswordVisibility, loginButtonClicked}) => (
    <View style={styles.formContainer}>
                <FormInput 
                    onChangeText={loginUsername}
                    iconName='person'
                    keyboardType='email-address'
                    placeholder='Enter your email'
                    secureTextEntry={false}>
                </FormInput>
                <FormInput 
                    onChangeText={loginPassword}
                    iconName='lock'
                    keyboardType='default'
                    placeholder='Enter your password'
                    formType='password'
                    secureTextEntry={!loginPasswordIsVisible}
                    passwordIconName={loginPasswordIconName}
                    togglePasswordVisibility={togglePasswordVisibility}
                    inputSelection={loginTextInput}>
                </FormInput>
                <TouchableOpacity
                    onPress={loginButtonClicked}
                    style={styles.buttonContainer}>
                    {loginIsLoading ? <ActivityIndicator></ActivityIndicator> : <Text style={styles.buttonText}>Login</Text>}
                </TouchableOpacity>
            </View>
);

const RegisterPage = ({registerUsername, registerName, registerPhone, registerPassword, registerPasswordIsVisible, registerPasswordIconName, registerTextInput, registerIsLoading, togglePasswordVisibility, registerButtonClicked}) => (
    <View style={styles.formContainer}>
                <FormInput 
                    onChangeText={registerUsername}
                    iconName='mail'
                    keyboardType='email-address'
                    placeholder='Enter your email'
                    secureTextEntry={false}>
                </FormInput>
                <FormInput 
                    onChangeText={registerName}
                    iconName='person'
                    keyboardType='default'
                    placeholder='Enter your full name'
                    secureTextEntry={false}>
                </FormInput>
                <FormInput 
                    onChangeText={registerPhone}
                    iconName='call'
                    keyboardType='number-pad'
                    placeholder='Enter your handphone number'
                    secureTextEntry={false}>
                </FormInput>
                <FormInput 
                    onChangeText={registerPassword}
                    iconName='lock'
                    keyboardType='default'
                    placeholder='Enter your password'
                    formType='password'
                    secureTextEntry={!registerPasswordIsVisible}
                    passwordIconName={registerPasswordIconName}
                    togglePasswordVisibility={togglePasswordVisibility}
                    inputSelection={registerTextInput}>
                </FormInput>
                <TouchableOpacity
                    onPress={registerButtonClicked}
                    style={styles.buttonContainer}>
                    {registerIsLoading ? <ActivityIndicator></ActivityIndicator> : <Text style={styles.buttonText}>Register</Text>}
                </TouchableOpacity>
            </View>
);

const FormInput = ({inputSelection, passwordIconName, togglePasswordVisibility, formType, iconName, keyboardType, onChangeText, placeholder, secureTextEntry, value}) => (
    <View style={styles.inputContainer}>
        <View style={styles.innerContainer}>
            <Icon size={window.width/20} style={styles.icon} name={iconName}></Icon>
            <TextInput
                autoCorrect={false}
                onChangeText={onChangeText}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                value={value}
                selection={inputSelection}
                ref={component => inputSelection = component}
            ></TextInput>
            {formType === 'password' ? 
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Icon size={window.width/20} name={passwordIconName}></Icon>
                </TouchableOpacity> : 
                <View></View>}
        </View>
    </View>
)



const styles = StyleSheet.create({
    inputContainer : {
        width: window.width*3/4,
        height: 50,
        borderRadius: 40,
        flexDirection: 'row',
        shadowOffset: { width: 0, height: 30 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 5,
        backgroundColor : "#fff",
        marginVertical: 10,
        alignItems: 'center'
    },
    innerContainer : {
        paddingHorizontal: 15,
        width:'100%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    formContainer : {
        padding: 15,
        width: window.width,
        flex:1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    formLabel : {
        padding: 5,
        paddingBottom: 0,
        color: '#333',
        fontSize: 17,
        fontWeight: '700',
        width: '100%'
    },
    input: {
        flex: 1,
        overflow:'hidden',
        padding: 10,
        color: '#000',
    },
    buttonContainer: {
        backgroundColor: '#FFB170',
        paddingVertical: 15,
        width: window.width*3/5,
        height: 50,
        borderRadius: 40,
        marginTop: 10,
        shadowOffset: { width: 0, height: 30 },
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '700'
    },
    icon: {
        width: window.width/20,
        alignItems: 'center',
        padding: 2,
    },
    tabText: {
        paddingTop: window.height/5,
        fontSize: 30,
        fontFamily: 'Supra-MediumMezzo',
        justifyContent: 'flex-end',
        textAlign: 'center'
    },
    tabBar: {
        flex:1,
        flexDirection: 'row',
        width: window.width,
        alignItems: 'flex-end',
        paddingTop: 100,
        height:300
    }
})

export default LoginScreen;