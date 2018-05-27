import React, { Component } from 'react';
import { Alert, View, TextInput, Text, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Button from './common/Button';
import Card from './common/Card';
import CardSection from './common/CardSection';
import { Spinner } from './common/Spinner';

class LoginForm extends Component {

    static navigationOptions =
        {
            title: 'Login',
            headerStyle: { backgroundColor: '#fad815' }
        };

    state = { user_email: '', user_password: '', error: '', loading: false };

    onButtonPress() {
        const { user_email, user_password } = this.state;
        const { navigate } = this.props.navigation;
        this.setState({ error: '', loading: true });
        //console.log(email);

        fetch('http://sudoit.me/buwa/newApp/index.php', {
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
            console.error(error);
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
            <Card>
                <View style={styles.containerStyle2}>
                    <Image source={require('./pics/logo.png')} style={styles.imageStyle} />
                </View>
                <CardSection style={styles.containerStyle}>
                    <Text style={styles.labelStyle}>Email</Text>
                    <TextInput
                        placeholder="user@gmail.com"
                        onChangeText={user_email => this.setState({ user_email })}
                        value={this.state.user_email}
                        style={styles.inputStyle}
                    />
                </CardSection>
                <CardSection style={styles.containerStyle}>
                    <Text style={styles.labelStyle}>Password</Text>
                    <TextInput
                        secureTextEntry
                        placeholder="password"
                        autoCorrect={false}
                        onChangeText={user_password => this.setState({ user_password })}
                        value={this.state.user_password}
                        style={styles.inputStyle}
                    />
                </CardSection>
                <Text style={styles.errorStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
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
        flex: 2
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    containerStyle2: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle: {
        height: 100,
        width: '100%'
    },
    errorStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export default LoginForm;