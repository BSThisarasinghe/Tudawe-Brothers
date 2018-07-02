import React, { Component } from 'react';
import { Alert, Text, TouchableOpacity, View, Image, FlatList, ScrollView, TextInput, BackHandler } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
import DeviceInfo from 'react-native-device-info';
import Notification from './common/Notification';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Img from './common/background';
import { Spinner } from './common/Spinner';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const deviceId = DeviceInfo.getDeviceId();

class SendMessage extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Message',
            headerStyle: { backgroundColor: '#fad815' },
            headerRight: <Notification onPress={() => take.showNotifications()} count={params.countValue} navigation={navigation} />,
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
            count: 0,
            message: [],
            color: '#D5EEF0',
            justifyContent: 'flex-start',
            seen: false
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
        this.getMsg();
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

    renderListItem = ({ item }) => (
        <View style={{
            width: '100%',
            height: 50,
            flexDirection: 'row',
            marginBottom: 5,
            justifyContent: (item.status == 'yes') ? 'flex-end' : 'flex-start',
            alignItems: 'flex-end'
        }} key={item.ID}>
            <View style={{
                width: '60%', height: 50, alignItems: 'flex-start', justifyContent: 'center', backgroundColor: (item.status == 'yes') ? '#167BFB' : '#D5EEF0', borderRadius: 20, borderWidth: 1,
                borderRadius: 20,
                borderColor: '#ddd',
                borderBottomWidth: 0,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 1,
            }}>
                <Text style={{
                    fontSize: 15,
                    paddingLeft: 10,
                    color: (item.status == 'yes') ? '#fff' : '#000'
                }}>
                    {item.msg}
                </Text>
            </View>
        </View>
    )

    getCount() {
        fetch('http://bsthisarasinghe-001-site1.1tempurl.com/getCount.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                deviceId: deviceId
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson);
                this.setState({ count: responseJson });
                this.props.navigation.setParams({
                    countValue: this.state.count
                });
            }).catch((error) => {
                console.error(error);
                // Alert.alert(error);
                // Alert.alert("No internet connection");
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
                this.getMsg();
            }).catch((error) => {
                //console.error(error);
                Alert.alert("No internet connection");
                this.setState({ loading: false });
            });
    }

    getMsg() {
        fetch('http://bsthisarasinghe-001-site1.1tempurl.com/pullMessages.php')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ message: responseJson.results }, function () {
                    this.setState({ loading: false });
                    console.log(responseJson.results);
                });
            }).catch((error) => {
                //console.error(error);
                Alert.alert("No internet connection");
                this.setState({ loading: false });
            });
    }

    completeView() {
        finalPakageDetails = this.state.message;
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100, height: 100 }}>
                    <Spinner size="large" spinnerStyle={styles.spinnerStyle} />
                </View>
            );
        }
        return (
            <FlatList
                data={finalPakageDetails}
                renderItem={this.renderListItem}
                keyExtractor={(item, index) => item.ID.toString()}
                scrollEnabled={this.state.scrollEnabled}
            />
        );
    }


    render() {
        take = this;
        return (
            <View style={{ flex: 1 }}>
                <ScrollView ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        this.scrollView.scrollToEnd({ animated: true });
                    }}>
                    {this.completeView()}
                </ScrollView>
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
        height: 60
        // flex: 1,
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
    },
    spinnerStyle: {
        alignSelf: 'stretch',
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 60,
        paddingTop: 10,
        paddingBottom: 10,
        height: 100
    },
    linkStyle: {
        width: '60%',
        height: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        flexDirection: 'row',
        marginBottom: 5,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1
    },
    textStyle: {
        fontSize: 15,
        paddingLeft: 10,
        color: '#000'
    }
}

export default SendMessage;