import React, { Component } from 'react';
import { Alert, Text, TouchableOpacity, View, Image, Button, Picker, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Notification from './common/Notification';
import Card from './common/Card';
import CardSection from './common/CardSection';
import { Spinner } from './common/Spinner';
import Img from './common/background';

class RejectedProjects extends Component {

    static navigationOptions =
        {
            title: 'Rejected Projects',
            headerStyle: { backgroundColor: '#fad815' },
            headerRight: <Notification />
        };

    state = {
        user_email: this.props.navigation.state.params.Email,
        user_password: '',
        error: '',
        loading: false,
        itemVal: 0,
    };

    goBack() {
        const { navigate } = this.props.navigation;
        navigate('First');
    }

    logoutButton(itemValue) {
        if (itemValue === "Logout") {
            { this.goBack() }
        }
    }

    viewProjects(item) {
        // console.log(item);
        this.setState({ itemVal: 5 });
        console.log("ItemVal",this.state.itemVal);
        const { user_email, user_password } = this.state;
        console.log(user_email);
        const { navigate } = this.props.navigation;
        navigate('Sixth', { Email: user_email }, { job_code: item });
        fetch('http://bsthisarasinghe-001-site1.1tempurl.com/index.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email: user_email,
                job_code: item
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            }).catch((error) => {
                console.error(error);
                Alert.alert("No internet connection");
            });
    }

    renderListItem = ({ item }) => (
        <TouchableOpacity style={styles.linkStyle} onPress={() => this.viewProjects(item.Job_Code)}>
            <View style={{ width: '20%', height: 70, alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text style={styles.textStyle}>{item.Job_Code}</Text>
            </View>
            <View style={{ width: '60%', height: 70, alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text style={styles.textStyle}>{item.Job_Name}</Text>
            </View>
            <View style={{ width: '20%', height: 70, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('./pics/right-arrow.png')} style={styles.arrowStyle} />
            </View>
        </TouchableOpacity>
    )

    componentWillMount() {
        fetch('http://bsthisarasinghe-001-site1.1tempurl.com/projects.php')
            .then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.results);
                this.setState({ package: responseJson.results });
            }).catch((error) => {
                //console.error(error);
                Alert.alert("No internet connection");
                this.setState({ loading: false });
            });
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
                        <FlatList
                            data={finalPakageDetails}
                            renderItem={this.renderListItem}
                            keyExtractor={(item, index) => index}
                            scrollEnabled={this.state.scrollEnabled}
                        />
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
        marginBottom: '30%'
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
        borderBottomWidth: 1,
        padding: 5,
        justifyContent: 'flex-start',
        borderColor: '#ddd',
        position: 'relative',
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
    }
}

export default RejectedProjects;