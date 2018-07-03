import React, { Component } from 'react';
import { Alert, Text, TouchableOpacity, View, Image, ScrollView, Picker, TextInput, BackHandler } from 'react-native';
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

class NotificationDetails extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Details',
            headerStyle: { backgroundColor: '#fad815' }
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
            package: '',
            count: 0,
            message: [],
            color: '#D5EEF0',
            justifyContent: 'flex-start',
            seen: false,
            visible: false
        };
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

    changeVisibility() {
        if (this.props.navigation.state.params.task == 'reject' || this.props.navigation.state.params.task == 'cancel') {
            this.setState({
                visible: true
            });
        } else {
            this.setState({
                visible: false
            });
        }
    }

    componentWillMount() {
        this.getCount();
        this.getDetails();
        this.changeVisibility();
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
        navigate('Tenth');
        return true;
    }

    showReason() {
        if (this.state.visible) {
            return (
                <View style={styles.cardStyle}>
                    <View style={{ width: '35%', flexDirection: 'row', height: 30, alignItems: 'center' }}>
                        <Image source={require('./pics/remarks.png')} style={styles.iconeStyle} />
                        <Text style={styles.textBoldStyle}>Remarks: </Text>
                    </View>
                    <View style={{ width: '65%', height: 30, alignItems: 'center' }}>
                        <Text style={styles.textStyle}>{this.props.navigation.state.params.reason}</Text>
                    </View>
                </View>
            )
        }
    }

    getDetails() {
        fetch('http://bsthisarasinghe-001-site1.1tempurl.com/getDetails.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: this.props.navigation.state.params.member
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                this.setState({ package: responseJson }, function () {
                    this.setState({ loading: false });
                });
            }).catch((error) => {
                // console.error(error);
                // Alert.alert(error);
                Alert.alert("No internet connection");
                this.setState({ loading: false });
            });
    }

    completeView() {
        finalPakageDetails = this.state.package;
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 100, height: 100 }}>
                    <Spinner size="large" spinnerStyle={styles.spinnerStyle} />
                </View>
            );
        }
        return (
            <View style={styles.fullViewStyle}>
                <View style={styles.cardStyle}>
                    <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('./pics/bell.png')} style={styles.imageStyle} />
                    </View>
                    <View style={{ width: '80%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: '700' }}>{this.props.navigation.state.params.Action}</Text>
                    </View>
                </View>
                <View style={styles.cardStyle}>
                    <View style={{ width: '35%', flexDirection: 'row', height: 30, alignItems: 'center' }}>
                        <Image source={require('./pics/employee.png')} style={styles.iconeStyle} />
                        <Text style={styles.textBoldStyle}>Employee: </Text>
                    </View>
                    <View style={{ width: '65%', height: 30, alignItems: 'center' }}>
                        <Text style={styles.textStyle}>{this.state.package}</Text>
                    </View>
                </View>
                <View style={styles.cardStyle}>
                    <View style={{ width: '35%', flexDirection: 'row', height: 30, alignItems: 'center' }}>
                        <Image source={require('./pics/date.png')} style={styles.iconeStyle} />
                        <Text style={styles.textBoldStyle}>Date: </Text>
                    </View>
                    <View style={{ width: '65%', height: 30, alignItems: 'center' }}>
                        <Text style={styles.textStyle}>{this.props.navigation.state.params.date}</Text>
                    </View>
                </View>
                {this.showReason()}
            </View>
        );
    }

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
                // console.error(error);
                // Alert.alert(error);
                Alert.alert("No internet connection");
                this.setState({ loading: false });
            });
    }

    render() {
        take = this;
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <ScrollView>
                    {this.completeView()}
                </ScrollView>
            </View>
        )
    }
}


const styles = {
    fullViewStyle: {
        backgroundColor: '#fff',
        borderRadius: 2,
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    },
    cardStyle: {
        marginTop: 20,
        padding: 5,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#D5D5D5',
        position: 'relative',
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
        color: '#000'
    },
    textBoldStyle: {
        color: '#707270'
    },
    viewStyle: {
        padding: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginBottom: 20
    },
    iconeStyle: {
        width: 30,
        height: 30,
        marginRight: 10
    }
}

export default NotificationDetails;