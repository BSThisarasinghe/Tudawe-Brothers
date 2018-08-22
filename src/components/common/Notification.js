import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import IconBadge from 'react-native-icon-badge';
import ModalDropdown from 'react-native-modal-dropdown';
import { StackNavigator } from 'react-navigation';
import { Spinner } from './Spinner';

class Notification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            user_name: 'label',
            loading: true,
            level: ''
        };
    }

    getUser() {
        fetch('http://buwaneka-001-site1.1tempurl.com/showUser.php')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({ user_name: responseJson }, function () {
                    if (this.state.user_name != 'label') {
                        this.setState({ loading: false });
                    }
                });
            }).catch((error) => {
                // console.error(error);
                // Alert.alert(error);
                Alert.alert("No internet connection");
                this.setState({ loading: false });
            });
    }

    componentWillMount() {
        this.getUser();
    }

    onSelectOpt(idx, value) {
        this.setState({ level: value });
        if (value === "Logout") {
            { this.goBack() }
        }
    }

    goBack() {
        fetch('http://buwaneka-001-site1.1tempurl.com/logout.php')
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

    showLogout() {
        if (this.state.loading) {
            return (
                <ModalDropdown options={['', 'Logout']} onSelect={(idx, value) => this.onSelectOpt(idx, value)} style={{ width: '100%', height: 30, justifyContent: 'center', paddingLeft: 20 }} dropdownStyle={{ width: 100, height: 82, paddingBottom: 0 }} dropdownTextStyle={{ color: '#000', fontSize: 15 }} dropdownTextHighlightStyle={{ fontWeight: 'bold' }} >
                    <View style={{ height: 30, width: 60, alignItems: 'center', paddingRight: 10 }}>
                        <Image
                            source={require('../pics/logout.png')}
                            style={styles.downStyle}
                        />
                    </View>
                </ModalDropdown>
            );
        }
        return (
            <ModalDropdown options={[this.state.user_name, 'Logout']} onSelect={(idx, value) => this.onSelectOpt(idx, value)} style={{ width: '100%', height: 30, justifyContent: 'center', paddingLeft: 20 }} dropdownStyle={{ width: 100, height: 82, paddingBottom: 0 }} dropdownTextStyle={{ color: '#000', fontSize: 15 }} dropdownTextHighlightStyle={{ fontWeight: 'bold' }} >
                <View style={{ height: 30, width: 60, alignItems: 'center', paddingRight: 20 }}>
                    <Image
                        source={require('../pics/logout.png')}
                        style={styles.downStyle}
                    />
                </View>
            </ModalDropdown>
        );
    }

    render() {
        return (
            <View style={{ flexDirection: 'row', paddingRight: 10 }}>
                <IconBadge
                    MainElement={
                        < TouchableOpacity onPress={this.props.onPress} style={styles.buttonStyle} >
                            <Image source={require('../pics/notification.png')} style={styles.imageStyle} />
                        </TouchableOpacity>
                    }
                    BadgeElement={
                        < Text style={{ color: '#FFFFFF' }}> {this.props.count}</Text >
                    }
                    IconBadgeStyle={
                        {
                            width: 21,
                            height: 21,
                            backgroundColor: 'red'
                        }
                    }
                    Hidden={this.props.count == 0}
                />
                <View style={{ height: 30, width: 60, backgroundColor: 'transparent' }}>
                    {this.showLogout()}
                </View>
            </View>
        )
    }
}


const styles = {
    imageStyle: {
        width: 25,
        height: 25
    },
    buttonStyle: {
        marginLeft: 5,
        marginRight: 7
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
    downStyle: {
        width: 25,
        height: 25
    }
}

export default Notification;