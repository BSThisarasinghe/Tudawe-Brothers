import React, { Component } from 'react';
import { Alert, View, TextInput, Text, Image, YellowBox, ScrollView, BackHandler, KeyboardAvoidingView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Button from './common/Button';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Img from './common/background';
import { Spinner } from './common/Spinner';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class LoginForm extends Component {

    static navigationOptions =
        {
            title: '',
            headerStyle: { backgroundColor: 'transparent', height: 0 }
        };

    constructor(props) {
        super(props);

        // this.handleAppStateChange = this.handleAppStateChange.bind(this);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = { user_email: '', user_password: '', error: '', loading: false };
    }

    onButtonPress() {
        const { user_email, user_password } = this.state;
        const { navigate } = this.props.navigation;
        this.setState({ error: '', loading: true });
        //console.log(email);

        fetch('http://buwaneka-001-site1.1tempurl.com/index.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: user_email,
                password: user_password
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                //console.log("Hello");

                // If server response message same as Data Matched
                if (responseJson.results[1] === 'Data Matched') {

                    //Then open Profile activity and send user email to profile activity.
                    navigate('Second', { Email: user_email });
                    this.setState({ loading: false });

                }
                else {
                    Alert.alert(responseJson.results[1]);
                    this.setState({ loading: false });
                }

            }).catch((error) => {
                //console.error(error);
                // Alert.alert(error);
                Alert.alert("No internet connection");
                this.setState({ loading: false });
            });
    }

    componentWillMount() {
        YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" spinnerStyle={styles.spinnerStyle} />;
        }

        return (
            <Button onPress={this.onButtonPress.bind(this)}>
                Log In
            </Button>
        );
    }

    onLoginFail() {
        this.setState({ error: 'Authentication Failed', loading: false });
    }

    onLoginSuccess() {
        this.setState({
            user_email: '',
            user_password: '',
            loading: false,
            error: '',
        });
    }

    focusNextField(nextField) {
        this.refs[nextField].focus();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Img />
                <ScrollView keyboardShouldPersistTaps='always'>
                    <KeyboardAvoidingView behavior="padding" enabled>
                        <View style={styles.containerStyle2}>
                            <Image source={require('./pics/ic_launcher.png')} style={styles.imageStyle} />
                        </View>
                        <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Tudawe Brothers(Pvt) Ltd</Text>
                        </View>
                        <CardSection style={styles.containerStyle}>
                            <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('./pics/user.png')} style={styles.iconStyle} />
                            </View>
                            <TextInput
                                ref="1"
                                placeholder="Username"
                                // placeholderTextColor="#fff"
                                onChangeText={user_email => this.setState({ user_email })}
                                value={this.state.user_email}
                                style={styles.inputStyle}
                                underlineColorAndroid='transparent'
                                returnKeyType="next"
                                blurOnSubmit={false}
                                onSubmitEditing={() => this.focusNextField('2')}
                            />
                        </CardSection>
                        <CardSection style={styles.containerStyle}>
                            <View style={{ height: 40, justifyContent: 'center', alignItems: 'center' }}>
                                <Image source={require('./pics/pwd.png')} style={styles.iconStyle} />
                            </View>
                            <TextInput
                                ref="2"
                                secureTextEntry
                                placeholder="Password"
                                // placeholderTextColor="#fff"
                                autoCorrect={false}
                                onChangeText={user_password => this.setState({ user_password })}
                                value={this.state.user_password}
                                style={styles.inputStyle}
                                underlineColorAndroid='transparent'
                                blurOnSubmit={true}
                                returnKeyType="done"
                            />
                        </CardSection>
                        <Text style={styles.errorStyle}>
                            {this.state.error}
                        </Text>
                        <View style={styles.buttonStyle}>
                            {this.renderButton()}
                        </View>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }
}

const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2,
        // borderBottomColor: 'transparent'
        // backgroundColor: 'red',
        // width: '100%'
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    iconStyle: {
        height: 30,
        width: 30,
        marginRight: 30,
        marginLeft: 30
    },
    containerStyle: {
        marginTop: 50,
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerStyle2: {
        marginTop: 50,
        height: 150,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        height: 175,
        width: 150
    },
    errorStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    buttonStyle: {
        marginTop: 20,
        // borderBottomWidth: 1,
        padding: 5,
        borderRadius: 60,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
    },
    spinnerStyle: {
        flex: 1,
        backgroundColor: 'rgba(253, 197, 24, 0.8)',
        alignSelf: 'stretch',
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 60,
        paddingTop: 10,
        paddingBottom: 10
    }
}

export default LoginForm;