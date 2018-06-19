import React, { Component } from 'react';
import { Alert, Text, TouchableOpacity, View, Image, Button, Picker, TextInput, BackHandler } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
import Notification from './common/Notification';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Img from './common/background';
import { Spinner } from './common/Spinner';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class SendMessage extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Message',
            headerStyle: { backgroundColor: '#fad815' },
            headerRight: <Notification onPress={() => take.showNotifications()} count={params.countValue} />,
        }
    };


    constructor(props) {
        super(props);

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            user_email: this.props.navigation.state.params.Email,
            text: '',
            error: '',
            scrollEnabled: true,
            loading: true,
            itemVal: 0,
            package: [],
            dropDownData: ['1st Level', '2nd Level', '3rd Level', '4th Level'],
            level: 'Select Level',
            count: 0
        };
    }

    showNotifications() {
        // console.log("Hello Buwa");
        const { navigate } = this.props.navigation;
        navigate('Tenth', { Email: this.state.user_email });
    }

    goBack() {
        fetch('http://bsthisarasinghe-001-site1.1tempurl.com/logout.php')
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson.results[0]);
                if (responseJson === 'NULL') {
                    const { navigate } = this.props.navigation;
                    navigate('First');
                }
            }).catch((error) => {
                // console.error(error);
                // Alert.alert(error);
                Alert.alert("No internet connection");
                // this.setState({ loading: false });
            });
    }

    logoutButton(itemValue) {
        if (itemValue === "Logout") {
            { this.goBack() }
        }
    }

    componentWillMount() {
        this.getCount();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentDidMount() {
        this.props.navigation.setParams({
            countValue: this.state.count
        });
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        // BackHandler.exitApp();
        const { navigate } = this.props.navigation;
        navigate('Second');
        return true;
    }

    getCount() {
        fetch('http://bsthisarasinghe-001-site1.1tempurl.com/getCount.php')
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson.count);
                this.setState({ count: responseJson.count });
                this.props.navigation.setParams({
                    countValue: this.state.count
                });
            }).catch((error) => {
                //console.error(error);
                // Alert.alert(error);
                Alert.alert("No internet connection");
                this.setState({ loading: false });
            });
    }

    sendMsg() {
        fetch('http://bsthisarasinghe-001-site1.1tempurl.com/sendMsg.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: this.state.text
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(responseJson);
                this.textInput.clear();
            }).catch((error) => {
                //console.error(error);
                Alert.alert("No internet connection");
                this.setState({ loading: false });
            });
    }


    render() {
        take = this;
        return (
            <View style={{ flex: 1 }}>
                <Card>
                    <View style={styles.viewStyle}>
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
                </Card>
                <View style={styles.containerStyle}>
                    <KeyboardAwareScrollView style={{ borderWidth: 1, position: 'absolute', bottom: 0, width: '85%', borderColor: '#D1D1D1', paddingLeft: 5, paddingRight: 5 }}>
                        <TextInput
                            ref={input => { this.textInput = input }}
                            placeholder="What's on your mind?"
                            autoCorrect={true}
                            onChangeText={text => this.setState({ text })}
                            value={this.state.text}
                            style={styles.inputStyle}
                            underlineColorAndroid='transparent'
                            blurOnSubmit={true}
                            returnKeyType="done"
                            multiline={true}
                        />
                    </KeyboardAwareScrollView>
                    <TouchableOpacity style={{ position: 'absolute', bottom: 0, width: '15%', height: 50, right: 0, justifyContent: 'center', alignItems: 'center' }} onPress={this.sendMsg.bind(this)}>
                        <Image source={require('./pics/send.png')} style={styles.imageStyle} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


const styles = {
    viewStyle: {
        padding: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        // marginBottom: '30%'
    },
    containerStyle: {
        flex: 1,
        // flexDirection: 'row'
    },
    inputStyle: {
        backgroundColor: '#fff',
        width: '100%',
        color: '#000'
    },
    imageStyle: {
        width: 40,
        height: 40
    }
}

export default SendMessage;