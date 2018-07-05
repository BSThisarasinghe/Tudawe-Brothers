import React, { Component } from 'react';
import { Alert, Text, TouchableOpacity, View, Image, Button, Picker, FlatList, BackHandler, TextInput } from 'react-native';
import { StackNavigator } from 'react-navigation';
import ModalDropdown from 'react-native-modal-dropdown';
import DeviceInfo from 'react-native-device-info';
import Notification from './common/Notification';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Img from './common/background';
import { Spinner } from './common/Spinner';
import search_icon from '../../android/app/src/main/res/mipmap-mdpi/search_icon.png';

var take;

const deviceId = DeviceInfo.getDeviceId();

class ProjectPage extends Component {

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Pending Approvals',
            headerStyle: { backgroundColor: '#fad815' },
            headerRight: <Notification onPress={() => take.showNotifications()} count={params.countValue} navigation={navigation} />,
        }
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
            dropDownData: ['1st Level', '2nd Level', '3rd Level', '4th Level', '1st Level Alternative', '2nd Level Alternative', '3rd Level Alternative', '4th Level Alternative'],
            level: 'Select Level',
            count: 0,
            search_value: ''
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

    viewProjects(job_code, SRN_No) {
        // console.log("Item",job_code);
        // if (this.state.level != 'Select Level') {
        const { user_email, itemVal } = this.state;

        const { navigate } = this.props.navigation;
        navigate('Fourth', {
            Email: user_email,
            code: job_code,
            srn_no: SRN_No,
            job_level: this.state.level
        });
        // } else {
        //     Alert.alert("Select a level first");
        // }
    }

    renderListItem = ({ item }) => (
        <TouchableOpacity style={styles.linkStyle} key={item.SRN_No} onPress={() => this.viewProjects(item.Job_Code, item.SRN_No)}>
            <View style={{ width: '20%', height: 70, alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text style={styles.textStyle}>{item.SRN_No}</Text>
            </View>
            <View style={{ width: '60%', height: 70, alignItems: 'flex-start', justifyContent: 'center' }}>
                <Text style={styles.textStyle}>{item.Job_Name}</Text>
            </View>
            <View style={{ width: '20%', height: 70, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('./pics/right-arrow.png')} style={styles.arrowStyle} />
            </View>
        </TouchableOpacity>
    )

    onSelectOpt(idx, value) {
        this.setState({ level: value }, function () {
            this.projectsList();
        });
    }

    projectsList() {
        fetch('http://bsthisarasinghe-001-site1.1tempurl.com/projects.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                job_level: this.state.level
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson.results);
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
        // this.forceUpdate();
        this.projectsList();
        this.getCount();
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentDidMount() {
        // this.forceUpdate();
        this.props.navigation.setParams({
            countValue: this.state.count
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.package !== this.state.package) {
            this.projectsList();
        }
        if (prevState.count !== this.state.count) {
            this.getCount();
        }
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

    onSearch(value) {
        // this.setState({ package: [] });
        this.setState({ search_value: value });
        this.setState({ loading: true });
        // console.log(value);
        if (value != '') {
            fetch('http://bsthisarasinghe-001-site1.1tempurl.com/search_result.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    search_value: value
                })

            }).then((response) => response.json())
                .then((responseJson) => {
                    // console.log(responseJson.results);
                    this.setState({ package: responseJson.results }, function () {
                        this.setState({ loading: false });
                    });
                }).catch((error) => {
                    //console.error(error);
                    Alert.alert("No internet connection");
                    this.setState({ loading: false });
                });
        } else {
            this.projectsList();
        }
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
            <FlatList
                data={finalPakageDetails}
                renderItem={this.renderListItem}
                keyExtractor={(item, index) => item.SRN_No.toString()}
                extraData={this.state}
                scrollEnabled={this.state.scrollEnabled}
            />
        );
    }

    render() {
        take = this;
        finalPakageDetails = this.state.package;
        return (
            <View style={{ flex: 1 }}>
                <Img />
                <Card>
                    <View style={styles.mainStyle}>
                        <View style={{ height: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('./pics/search.png')} style={styles.iconStyle} />
                        </View>
                        <TextInput
                            placeholder="Search..."
                            autoCorrect={false}
                            onChangeText={search_value => this.onSearch(search_value)}
                            value={this.state.search_value}
                            style={styles.inputStyle}
                            underlineColorAndroid='transparent'
                            returnKeyType="next"
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={styles.containerStyle1}>
                        <ModalDropdown options={this.state.dropDownData} onSelect={(idx, value) => this.onSelectOpt(idx, value)} style={{ width: '100%', backgroundColor: 'rgba(255,255,255,0.8)', height: 30, justifyContent: 'center', paddingLeft: 20 }} dropdownStyle={{ width: '80%', height: 100 }} dropdownTextStyle={{ color: '#000', fontSize: 15 }} dropdownTextHighlightStyle={{ fontWeight: 'bold' }} >
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ width: '70%' }}>
                                    <Text style={{ color: '#000', fontSize: 15 }}>{this.state.level}</Text>
                                </View>
                                <View style={{ width: '30%', alignItems: 'flex-end', paddingRight: 10 }}>
                                    <Image
                                        source={require('./pics/down.png')}
                                        style={styles.downStyle}
                                    />
                                </View>
                            </View>
                        </ModalDropdown>
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
        paddingBottom: 40
    },
    containerStyle1: {
        borderBottomWidth: 1,
        padding: 5,
        justifyContent: 'flex-start',
        borderColor: '#ddd',
        position: 'relative'
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
    mainStyle: {
        // padding: 5,
        backgroundColor: '#fff',
        marginLeft: 5,
        marginRight: 5,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        position: 'relative',
        marginTop: 10,
        borderRadius: 5
    },
    iconStyle: {
        height: 30,
        width: 30,
        marginRight: 30,
        marginLeft: 30
    }
}

export default ProjectPage;