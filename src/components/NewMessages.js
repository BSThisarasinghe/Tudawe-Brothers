import React, { Component } from 'react';
import { Alert, Text, TouchableOpacity, View, Picker, FlatList, BackHandler } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import Card from './common/Card';
import Img from './common/background';
import { Spinner } from './common/Spinner';

const deviceId = DeviceInfo.getDeviceId();

class NewMessages extends Component {

    static navigationOptions =
        {
            title: 'Notifications',
            headerStyle: { backgroundColor: '#fad815' },
            // headerRight: <Notification />
        };

    constructor(props) {
        super(props);

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.state = {
            user_email: this.props.navigation.state.params.Email,
            user_password: '',
            error: '',
            scrollEnabled: true,
            loading: true,
            itemVal: 0,
            package: [],
            dropDownData: ['1st Level', '2nd Level', '3rd Level', '4th Level'],
            level: 'Select Level'
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

    removeNotification(id, device) {
        // console.log(id, ",", device);
        fetch('http://bsthisarasinghe-001-site1.1tempurl.com/updateNotification.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                device: device
            })
        })
    }


    renderListItem = ({ item }) => (
        <TouchableOpacity style={{
            width: '100%',
            height: 70,
            // backgroundColor: 'rgba(255, 255, 255, 0.5)',
            backgroundColor: (item.task == 'approve') ? 'rgba(15, 178, 10, 0.5)' : (item.task == 'cancel') ? 'rgba(171, 51, 10, 0.5)' : 'rgba(235, 238, 7, 0.5)',
            flexDirection: 'row',
            marginBottom: 10,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: '#ddd',
            borderBottomWidth: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            elevation: 1,
        }} key={item.id} onPress={() => this.removeNotification(item.id, deviceId)}>
            <View style={{ width: '60%', height: 70, alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text style={styles.textStyle}>{item.action}</Text>
            </View>
            <View style={{ width: '40%', height: 70, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.textStyle}>{item.action_date}</Text>
            </View>
        </TouchableOpacity>
    )

    onSelectOpt(idx, value) {

        this.setState({ level: value }, function () {
            this.projectsList();
        });
    }

    projectsList() {
        fetch('http://bsthisarasinghe-001-site1.1tempurl.com/newMessages.php')
            .then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson.results[0].task);
                this.setState({ package: responseJson.results }, function () {
                    this.setState({ loading: false });
                });
            }).catch((error) => {
                //console.error(error);
                Alert.alert("No internet connection");
                this.setState({ loading: false });
            });
    }

    componentWillMount() {
        this.projectsList();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        const { navigate } = this.props.navigation;
        navigate('Second');
        return true;
    }

    completeView() {
        finalPakageDetails = this.state.package;
        // console.log(finalPakageDetails);
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
                keyExtractor={(item, index) => item.id.toString()}
                scrollEnabled={this.state.scrollEnabled}
            />
        );
    }

    render() {
        finalPakageDetails = this.state.package;
        return (
            <View style={{ flex: 1 }}>
                <Img />
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
                    <View style={styles.containerStyle}>
                        {this.completeView()}
                    </View>
                </Card>
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
    titleStyle: {
        fontSize: 20,
        paddingLeft: 20,
        flex: 1,
        color: '#000'
    },
    logoStyle: {
        height: '100%',
        width: 40
    },
    arrowStyle: {
        height: 20,
        width: 20
    },
    textStyle: {
        fontSize: 15,
        paddingLeft: 10,
        color: '#000'
    },
    containerStyle: {
        // borderBottomWidth: 1,
        padding: 5,
        justifyContent: 'flex-start',
        borderColor: '#ddd',
        position: 'relative',
    },
    containerStyle1: {
        borderBottomWidth: 1,
        padding: 5,
        justifyContent: 'flex-start',
        borderColor: '#ddd',
        position: 'relative',
        marginBottom: '20%'
    },
    iconStyle: {
        height: 40,
        width: 40
    },
    linkStyle: {
        width: '100%',
        height: 70,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        flexDirection: 'row',
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    downStyle: {
        width: 10,
        height: 10
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
    }
}

export default NewMessages;