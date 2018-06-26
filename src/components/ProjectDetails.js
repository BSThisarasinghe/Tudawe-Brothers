import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Text, TouchableOpacity, Image, Picker, ScrollView, FlatList, BackHandler, Modal, TouchableHighlight } from 'react-native';
import { StackNavigator } from 'react-navigation';
import DeviceInfo from 'react-native-device-info';
import Card from './common/Card';
import CardSection from './common/CardSection';
import { Spinner } from './common/Spinner';
import Notification from './common/Notification';

var take;

const deviceId = DeviceInfo.getDeviceId();

class ProjectDetails extends Component {

    // Setting up profile activity title.
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            title: 'Project Details',
            headerStyle: { backgroundColor: '#fad815' },
            headerRight: <Notification onPress={() => take.showNotifications()} count={params.countValue} />
        }
    };

    constructor(props) {
        super(props);

        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        this.onCancel = this.onCancel.bind(this);
        this.setModalVisible = this.setModalVisible.bind(this);
        this.onReject = this.onReject.bind(this);
        this.setRejectModalVisible = this.setRejectModalVisible.bind(this);
        this.state = {
            user_email: this.props.navigation.state.params.Email,
            user_password: '',
            error: '',
            loading: true,
            loading2: true,
            text: '',
            item_code: 'Item Value',
            des: 'Description',
            editable: false,
            editable1: false,
            editable2: false,
            data: [],
            item_data: [],
            value1: '',
            value2: '',
            value3: '',
            hideText: true,
            count: 0,
            modalVisible: false,
            modalVisible2: false,
            underlineColorAndroid: 'transparent'
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

    onFocus(value) {
        // console.log(value);
        fetch('http://bsthisarasinghe-001-site1.1tempurl.com/changeItem.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item_code: this.state.item_data[0].Item_Code,
                new_value: value
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(responseJson);
                // console.log(responseJson);
            }).catch((error) => {
                console.error(error);
                // Alert.alert(error);
                // Alert.alert("No internet connection");
                this.setState({ loading: false });
            });
    }

    onFocus1(value, item_code) {
        fetch('http://bsthisarasinghe-001-site1.1tempurl.com/changeDes.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item_code: item_code,
                des: value
            })

        })
        // .then((response) => response.json())
        //     .then((responseJson) => {
        //         Alert.alert(responseJson);
        //         // console.log(responseJson);
        //     }).catch((error) => {
        //         console.error(error);
        //         // Alert.alert(error);
        //         // Alert.alert("No internet connection");
        //         this.setState({ loading: false });
        //     });
    }


    onFocus2(value, item_code) {
        fetch('http://bsthisarasinghe-001-site1.1tempurl.com/changeDate.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                item_code: item_code,
                des: value
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                Alert.alert(responseJson);
                // console.log(responseJson);
            }).catch((error) => {
                console.error(error);
                // Alert.alert(error);
                // Alert.alert("No internet connection");
                this.setState({ loading: false });
            });
    }

    onBlur() {
        this.setState({ editable: false });
        // console.log("Edit");
    }

    fetchJobData() {
        fetch('http://bsthisarasinghe-001-site1.1tempurl.com/projectDetails.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                job_code: this.props.navigation.state.params.code
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                // console.log(responseJson.results);
                // this.setState({ data: responseJson.results });
                this.setState({ data: responseJson.results }, function () {
                    this.setState({ loading: false });
                });
                // If server response message same as Data Matched

            }).catch((error) => {
                //console.error(error);
                // Alert.alert(error);
                Alert.alert("No internet connection");
                this.setState({ loading: false });
            });
    }

    fetchItemData() {
        fetch('http://bsthisarasinghe-001-site1.1tempurl.com/itemDetails.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                job_code: this.props.navigation.state.params.code
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                // this.setState({ data: responseJson.results });
                this.setState({ item_data: responseJson.results }, function () {
                    this.setState({ value1: this.state.item_data[0].Item_Code });
                    this.setState({ value2: this.state.item_data[0].Item_Description });
                    this.setState({ value3: this.state.item_data[0].Delivery_Date.date });
                    this.setState({ loading2: false });
                    // console.log(this.state.item_data[0].Discription);
                });
                // If server response message same as Data Matched

            }).catch((error) => {
                //console.error(error);
                // Alert.alert(error);
                Alert.alert("No internet connection");
                this.setState({ loading: false });
            });
    }

    componentWillMount() {
        this.getCount();
        this.fetchJobData();
        this.fetchItemData();
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
        navigate('Third');
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
            console.error(error);
            // Alert.alert(error);
            // Alert.alert("No internet connection");
            this.setState({ loading: false });
          });
      }

    flatListView() {
        finalPakageDetails = this.state.item_data;
        if (this.state.loading2) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner size="large" spinnerStyle={styles.spinnerStyle} />
                </View>
            );
        }
        return (
            <FlatList
                data={finalPakageDetails}
                renderItem={this.tableView}
                keyExtractor={(item, index) => item.Item_Code}
                scrollEnabled={false}
            />
        );
    }

    onApprove() {
        const { navigate } = this.props.navigation;
        fetch('http://bsthisarasinghe-001-site1.1tempurl.com/approve.php', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                job_level: this.props.navigation.state.params.job_level,
                job_code: this.props.navigation.state.params.code
            })

        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.results[1] == 'Job Approved') {
                    navigate('Third', { Email: this.state.user_email });
                } else if (responseJson.results[1] == 'Job Approve failed') {
                    Alert.alert(responseJson.results[1]);
                }
                // Alert.alert(responseJson.results[1]);
                // console.log(responseJson);
            }).catch((error) => {
                console.error(error);
                // Alert.alert(error);
                // Alert.alert("No internet connection");
                this.setState({ loading: false });
            });
    }


    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    onCancel(visible) {
        const { navigate } = this.props.navigation;
        if (this.state.text == '') {
            this.setState({ underlineColorAndroid: 'red' });
        } else {
            this.setState({ underlineColorAndroid: 'transparent' });
            this.setState({ modalVisible: visible });
            fetch('http://bsthisarasinghe-001-site1.1tempurl.com/cancel.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    text: this.state.text,
                    job_code: this.props.navigation.state.params.code
                })

            }).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson == 'Job Canceled') {
                        navigate('Third', { Email: this.state.user_email });
                    } else if (responseJson == 'Job cancelation failed') {
                        Alert.alert(responseJson);
                    }
                    // console.log(responseJson);
                }).catch((error) => {
                    console.error(error);
                    // Alert.alert(error);
                    // Alert.alert("No internet connection");
                    this.setState({ loading: false });
                });
        }
    }

    setRejectModalVisible(visible) {
        this.setState({ modalVisible2: visible });
    }

    onReject(visible) {
        const { navigate } = this.props.navigation;
        if (this.state.text == '') {
            this.setState({ underlineColorAndroid: 'red' });
        } else {
            this.setState({ underlineColorAndroid: 'transparent' });
            this.setState({ modalVisible2: visible });
            fetch('http://bsthisarasinghe-001-site1.1tempurl.com/reject.php', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    job_level: this.props.navigation.state.params.job_level,
                    text: this.state.text,
                    job_code: this.props.navigation.state.params.code
                })

            }).then((response) => response.json())
                .then((responseJson) => {
                    if (responseJson == 'Job Rejected') {
                        navigate('Third', { Email: this.state.user_email });
                    } else if (responseJson == 'Job reject failed') {
                        Alert.alert(responseJson);
                    }
                    // console.log(responseJson);
                }).catch((error) => {
                    console.error(error);
                    // Alert.alert(error);
                    // Alert.alert("No internet connection");
                    this.setState({ loading: false });
                });
        }
    }

    completeView() {
        finalPakageDetails = this.state.item_data;
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Spinner size="large" spinnerStyle={styles.spinnerStyle} />
                </View>
            );
        }
        return (
            <View style={styles.fullViewStyle}>
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
                    <Text style={styles.titleStyle}>MATERIAL REQUISITION</Text>
                </View>
                <View style={styles.cardStyle}>
                    <View style={{ width: '35%' }}>
                        <Text style={styles.textBoldStyle}>Prepared By: </Text>
                    </View>
                    <View style={{ width: '65%' }}>
                        <Text style={styles.textStyle}>{this.state.data[0].UserName}</Text>
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    presentationStyle='overFullScreen'
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        alert('Window has been closed.');
                    }}>
                    <View style={{ marginTop: 100, height: 200, width: '80%', backgroundColor: '#fff', borderRadius: 5, alignSelf: 'center' }}>
                        <View style={styles.cardStyle}>
                            <View style={{ width: '35%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.textBoldStyle}>Note: </Text>
                            </View>
                            <View style={{ width: '65%', height: 50 }}>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    autoCorrect={true}
                                    onChangeText={text => this.setState({ text })}
                                    value={this.state.text}
                                    placeholder="Enter a note"
                                    style={styles.inputStyle}
                                    underlineColorAndroid={this.state.underlineColorAndroid}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity style={{
                                width: 100,
                                height: 30,
                                alignSelf: 'stretch',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#fff',
                                borderRadius: 2,
                                borderWidth: 1,
                                borderColor: '#022B96',
                                marginLeft: 5,
                                marginRight: 5
                            }} onPress={() => this.setModalVisible(!this.state.modalVisible)}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                width: 100,
                                height: 30,
                                alignSelf: 'stretch',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#022B96',
                                borderRadius: 2,
                                borderWidth: 1,
                                borderColor: '#022B96',
                                marginLeft: 5,
                                marginRight: 5
                            }} onPress={() => this.onCancel(!this.state.modalVisible)}>
                                <Text style={{ color: '#fff' }}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    presentationStyle='overFullScreen'
                    visible={this.state.modalVisible2}
                    onRequestClose={() => {
                        alert('Window has been closed.');
                    }}>
                    <View style={{ marginTop: 100, height: 200, width: '80%', backgroundColor: '#fff', borderRadius: 5, alignSelf: 'center' }}>
                        <View style={styles.cardStyle}>
                            <View style={{ width: '35%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.textBoldStyle}>Note: </Text>
                            </View>
                            <View style={{ width: '65%', height: 50 }}>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={4}
                                    autoCorrect={true}
                                    onChangeText={text => this.setState({ text })}
                                    value={this.state.text}
                                    placeholder="Enter a note"
                                    style={styles.inputStyle}
                                    underlineColorAndroid={this.state.underlineColorAndroid}
                                />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity style={{
                                width: 100,
                                height: 30,
                                alignSelf: 'stretch',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#fff',
                                borderRadius: 2,
                                borderWidth: 1,
                                borderColor: '#022B96',
                                marginLeft: 5,
                                marginRight: 5
                            }} onPress={() => this.setRejectModalVisible(!this.state.modalVisible2)}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                width: 100,
                                height: 30,
                                alignSelf: 'stretch',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#022B96',
                                borderRadius: 2,
                                borderWidth: 1,
                                borderColor: '#022B96',
                                marginLeft: 5,
                                marginRight: 5
                            }} onPress={() => this.onReject(!this.state.modalVisible2)}>
                                <Text style={{ color: '#fff' }}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, paddingLeft: 5, paddingRight: 5 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.approveStyle} onPress={this.onApprove.bind(this)}>
                            <Text style={styles.buttonTextStyle}>APPROVE</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.cancelStyle} onPress={() => this.setModalVisible(true)}>
                            <Text style={styles.buttonTextStyle}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.rejectStyle} onPress={() => this.setRejectModalVisible(true)}>
                            <Text style={styles.buttonTextStyle}>REJECT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, paddingLeft: 16, paddingRight: 16 }}>
                    <View style={{ flex: 1, borderWidth: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#CFD8EF' }}>
                        <Text style={styles.dataStyle}>Item Description</Text>
                    </View>
                    <View style={{ flex: 1, borderWidth: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#CFD8EF' }}>
                        <Text style={styles.dataStyle}>Quantity</Text>
                    </View>
                    <View style={{ flex: 1, borderWidth: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#CFD8EF' }}>
                        <Text style={styles.dataStyle}>UOM</Text>
                    </View>
                    <View style={{ flex: 1, borderWidth: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#CFD8EF' }}>
                        <Text style={styles.dataStyle}>Delivery Date</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    {this.flatListView()}
                </View>
            </View>
        );
    }

    hideText(){
        console.log("Hide Text");
        this.setState({ hideText: false });
    }

    displayDate(value) {
        if (this.state.hideText) {
            return (
                <Text style={styles.textStyle} onPress={() => this.hideText()}>{value}</Text>
            );
        } else {
            return (
                <TextInput
                    onChangeText={value => this.setState({ value3: value })}
                    onBlur={() => this.onFocus2(this.state.value3, this.state.item_data[0].Item_Code)}
                    value={value}
                    style={styles.inputStyle}
                    underlineColorAndroid='transparent'
                />
            );
        }
    }

    displayCode(value) {
        return (
            <TextInput
                onChangeText={value => this.setState({ value1: value })}
                onBlur={() => this.onFocus(this.state.value1)}
                value={value}
                style={styles.inputStyle}
                underlineColorAndroid='transparent'
            />
        );
    }

    displayDes(value) {
        console.log(value);
        return (
            <TextInput
                onChangeText={value => this.setState({ value2: value })}
                onBlur={() => this.onFocus1(this.state.value2, this.state.item_data[0].Item_Code)}
                value={value}
                style={styles.inputStyle}
                underlineColorAndroid='transparent'
            />
        );
    }

    tableView = ({ item }) => (
        <View style={{ flex: 1, flexDirection: 'row', borderWidth: 1 }} key={item.Item_Code}>
            <View style={{ flex: 1, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.dataStyle}>{item.Item_Description}</Text>
            </View>
            <View style={{ flex: 1, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                <TextInput
                    onChangeText={value => this.setState({ value2: value })}
                    onBlur={() => this.onFocus1(this.state.value2, item.Item_Code)}
                    value={item.Qty_Required.toString()}
                    // style={styles.inputStyle}
                    underlineColorAndroid='transparent'
                />
            </View>
            <View style={{ flex: 1, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={styles.dataStyle}>{item.UnitofMeasure}</Text>
            </View>
            <View style={{ flex: 1, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                {this.displayDate(item.Delivery_Date.date.toString())}
                {/* <TextInput
                    onChangeText={val => this.setState({ value3: val })}
                    onBlur={() => this.onFocus2(this.state.value3, item.Item_Code)}
                    value={item.Delivery_Date.date.toString()}
                    style={styles.inputStyle}
                    underlineColorAndroid='transparent'
                /> */}
            </View>
        </View>
    )

    render() {
        take = this;
        return (
            <ScrollView>
                {this.completeView()}
            </ScrollView>
        );
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
    viewStyle: {
        padding: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        marginBottom: 20
    },
    titleStyle: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold'
    },
    buttonTextStyle: {
        fontSize: 17,
        color: '#fff'
    },
    logoStyle: {
        height: '100%',
        width: 40
    },
    iconStyle: {
        height: 40,
        width: 40
    },
    textStyle: {
        color: '#000'
    },
    textBoldStyle: {
        color: '#707270'
    },
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 14,
        lineHeight: 23
    },
    approveStyle: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#16922C',
        borderRadius: 2,
        borderWidth: 2,
        borderColor: '#16922C',
        marginLeft: 5,
        marginRight: 5
    },
    cancelStyle: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D3CA0C',
        borderRadius: 2,
        borderWidth: 2,
        borderColor: '#D3CA0C',
        marginLeft: 5,
        marginRight: 5
    },
    rejectStyle: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F22D1D',
        borderRadius: 2,
        borderWidth: 2,
        borderColor: '#F22D1D',
        marginLeft: 5,
        marginRight: 5
    },
    containerStyle: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderColor: '#056416'
    },
    cardStyle: {
        marginTop: 20,
        padding: 5,
        marginLeft: 20,
        marginRight: 20,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        //borderColor: '#ddd',
        position: 'relative',
    },
    container: {
        flex: 1,
        paddingLeft: 16,
        paddingRight: 16,
        // paddingTop: 30,
        backgroundColor: '#fff'
    },
    spinnerStyle: {
        flex: 1,
        alignSelf: 'stretch',
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 60,
        paddingTop: 10,
        paddingBottom: 10
    },
    dataStyle: {
        color: '#000'
    }
}

export default ProjectDetails;