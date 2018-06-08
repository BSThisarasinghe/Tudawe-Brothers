import React, { Component } from 'react';
import { Alert, View, TextInput, Text, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Button from './common/Button';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Img from './common/background';
import { Spinner } from './common/Spinner';

class LoginForm extends Component {

    static navigationOptions =
        {
            title: '',
            headerStyle: { backgroundColor: 'transparent', height: 0 }
        };

    state = { user_email: '', user_password: '', error: '', loading: false };

    onButtonPress() {
        const { user_email, user_password } = this.state;
        const { navigate } = this.props.navigation;
        this.setState({ error: '', loading: true });
        //console.log(email);

        fetch('http://bsthisarasinghe-001-site1.1tempurl.com/index.php', {
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
                if (responseJson === 'Data Matched') {

                    //Then open Profile activity and send user email to profile activity.
                    navigate('Second', { Email: user_email });
                    this.setState({ loading: false });

                }
                else {
                    Alert.alert(responseJson);
                    this.setState({ loading: false });
                }

            }).catch((error) => {
                //console.error(error);
               Alert.alert("No internet connection");
                this.setState({ loading: false });
            });
    }

    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
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

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Img />
                <View style={styles.containerStyle2}>
                    <Image source={require('./pics/ic_launcher.png')} style={styles.imageStyle} />
                </View>
                <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>Tudawe Brothers(Pvt) Ltd</Text>
                </View>
                <CardSection style={styles.containerStyle}>
                    <Image source={require('./pics/user.png')} style={styles.iconStyle} />
                    <TextInput
                        placeholder="Username"
                        placeholderTextColor="#fff"
                        onChangeText={user_email => this.setState({ user_email })}
                        value={this.state.user_email}
                        style={styles.inputStyle}
                    />
                </CardSection>
                <CardSection style={styles.containerStyle}>
                    <Image source={require('./pics/pwd.png')} style={styles.iconStyle} />
                    <TextInput
                        secureTextEntry
                        placeholder="Password"
                        placeholderTextColor="#fff"
                        autoCorrect={false}
                        onChangeText={user_password => this.setState({ user_password })}
                        value={this.state.user_password}
                        style={styles.inputStyle}
                    />
                </CardSection>
                <Text style={styles.errorStyle}>
                    {this.state.error}
                </Text>
                <View style={styles.buttonStyle}>
                    {this.renderButton()}
                </View>
            </View>
        );
    }
}

const styles = {
    inputStyle: {
        color: '#fff',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
       // borderBottomColor: 'transparent'
        //backgroundColor: 'transparent'
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
        height: 150,
        width: 150
    },
    errorStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    },
    buttonStyle: {
        marginTop: 20,
        borderBottomWidth: 1,
        padding: 5,
        borderRadius: 60,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
    }
}

export default LoginForm;