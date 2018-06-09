import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text, TouchableOpacity, Image, AppState, Platform, Picker } from 'react-native';
import { StackNavigator } from 'react-navigation';
import PushNotification from 'react-native-push-notification';
import Card from './common/Card';
import CardSection from './common/CardSection';
import { Spinner } from './common/Spinner';
import Notification from './common/Notification';
import PushController from './PushController';
import Img1 from './common/settingsBackground';

class Settings extends Component {

    static navigationOptions =
        {
            title: 'Settings',
            headerStyle: { backgroundColor: '#fad815' },
            headerRight: <Notification />
        };

    state = {
        user_email: this.props.navigation.state.params.Email,
        cur_pwd: '',
        new_pwd: '',
        con_pwd: '',
        error: '',
        loading: false
    };

    goBack() {
        const { navigate } = this.props.navigation;
        navigate('First');
    }

    logoutButton(itemValue) {
        if (itemValue === "Logout") {
            { this.goBack() };
        }
    }

    onButtonPress() {
        const { cur_pwd, new_pwd, con_pwd } = this.state;
        const { navigate } = this.props.navigation;
        this.setState({ error: '', loading: true });
        //console.log(email);

        fetch('http://bsthisarasinghe-001-site1.1tempurl.com/changePassword.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cur_pwd: cur_pwd,
                new_pwd: new_pwd,
                con_pwd: con_pwd
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(responseJson);
                this.setState({ loading: false });
            }).catch((error) => {
                //console.error(error);
                Alert.alert("No internet connection");
                this.setState({ loading: false });
            });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <Img1 />
                <View style={styles.viewStyle1}>
                    <View style={{ height: 30, width: 100, backgroundColor: '#fff' }}>
                        <Picker
                            selectedValue={this.state.user_email}
                            style={{ height: 30, width: 100 }}
                            mode='dropdown'
                            onValueChange={(itemValue, itemIndex) => this.logoutButton(itemValue)}>
                            <Picker.Item label={this.state.user_email} value="" />
                            <Picker.Item label="Logout" value="Logout" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.viewStyle}>
                    <View style={styles.containerStyle}>
                        <View style={styles.mainStyle}>
                            <Text style={styles.titleStyle}>CHANGE YOUR PASSWORD</Text>
                        </View>
                        <View style={styles.mainStyle}>
                            <TextInput
                                secureTextEntry
                                placeholder="Current Password"
                                //placeholderTextColor="#fff"
                                autoCorrect={false}
                                onChangeText={cur_pwd => this.setState({ cur_pwd })}
                                value={this.state.cur_pwd}
                                style={styles.inputStyle}
                                underlineColorAndroid='transparent'
                            //inlineImageLeft='search_icon'
                            />
                        </View>
                        <View style={styles.mainStyle}>
                            <TextInput
                                secureTextEntry
                                placeholder="New Password"
                                //placeholderTextColor="#fff"
                                autoCorrect={false}
                                onChangeText={new_pwd => this.setState({ new_pwd })}
                                value={this.state.new_pwd}
                                style={styles.inputStyle}
                                underlineColorAndroid='transparent'
                            />
                        </View>
                        <View style={styles.mainStyle}>
                            <TextInput
                                secureTextEntry
                                placeholder="Confirm Password"
                                //placeholderTextColor="#fff"
                                autoCorrect={false}
                                onChangeText={con_pwd => this.setState({ con_pwd })}
                                value={this.state.con_pwd}
                                style={styles.inputStyle}
                                underlineColorAndroid='transparent'
                            />
                        </View>
                        <View style={styles.mainStyle}>
                            <TouchableOpacity style={styles.buttonStyle} onPress={this.onButtonPress.bind(this)}>
                                <Text style={styles.textStyle}>CHANGE PASSWORD</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = {
    viewStyle1: {
        padding: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginBottom: '20%'
    },
    viewStyle: {
        // backgroundColor: 'red',
        height: 350,
        // marginTop: 100,
        paddingLeft: 10,
        paddingRight: 10
    },
    containerStyle: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    mainStyle: {
        padding: 5,
        backgroundColor: '#fff',
        marginLeft: 20,
        marginRight: 20,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
        marginTop: 10
    },
    titleStyle: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        //textAlign: 'center'
        alignSelf: 'center'
    },
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
    buttonStyle: {
        flex: 1,
        backgroundColor: '#0C5DD3',
        alignSelf: 'stretch',
        borderRadius: 5,
    },
    textStyle: {
        alignSelf: 'center',
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
}

export default Settings;