import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Text, TouchableOpacity, Image, Picker, ScrollView, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import EditableText from 'react-native-inline-edit';
import Card from './common/Card';
import CardSection from './common/CardSection';
import { Spinner } from './common/Spinner';
import Notification from './common/Notification';


class ProjectDetails extends Component {

    // Setting up profile activity title.
    static navigationOptions =
        {
            title: 'Project Details',
            headerStyle: { backgroundColor: '#fad815' },
            headerRight: <Notification />
        };

    state = {
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
        hideText: true
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

    onFocus(value) {
        console.log(value);
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
                // console.log(responseJson);
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
                // console.log(responseJson);
                // this.setState({ data: responseJson.results });
                this.setState({ item_data: responseJson.results }, function () {
                    this.setState({ value1: this.state.item_data[0].Item_Code });
                    this.setState({ value2: this.state.item_data[0].Discription });
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
        this.fetchJobData();
        this.fetchItemData();
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
                Alert.alert(responseJson);
                // console.log(responseJson);
            }).catch((error) => {
                console.error(error);
                // Alert.alert(error);
                // Alert.alert("No internet connection");
                this.setState({ loading: false });
            });
    }

    onCancel() {
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
                Alert.alert(responseJson);
                // console.log(responseJson);
            }).catch((error) => {
                console.error(error);
                // Alert.alert(error);
                // Alert.alert("No internet connection");
                this.setState({ loading: false });
            });
    }

    onReject() {
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
                Alert.alert(responseJson);
                // console.log(responseJson);
            }).catch((error) => {
                console.error(error);
                // Alert.alert(error);
                // Alert.alert("No internet connection");
                this.setState({ loading: false });
            });
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
                        <Text style={styles.textBoldStyle}>Project Name: </Text>
                    </View>
                    <View style={{ width: '65%' }}>
                        <Text style={styles.textStyle}>{this.state.data[0].Job_Name}</Text>
                    </View>
                </View>
                <View style={styles.cardStyle}>
                    <View style={{ width: '35%' }}>
                        <Text style={styles.textBoldStyle}>SRN No: </Text>
                    </View>
                    <View style={{ width: '65%' }}>
                        <Text style={styles.textStyle}>{this.state.data[0].SRN_No}</Text>
                    </View>
                </View>
                <View style={styles.cardStyle}>
                    <View style={{ width: '35%' }}>
                        <Text style={styles.textBoldStyle}>SRN Date: </Text>
                    </View>
                    <View style={{ width: '65%' }}>
                        <Text style={styles.textStyle}>{this.state.data[0].SRN_Date.date}</Text>
                    </View>
                </View>
                <View style={styles.cardStyle}>
                    <View style={{ width: '35%' }}>
                        <Text style={styles.textBoldStyle}>Prepared By: </Text>
                    </View>
                    <View style={{ width: '65%' }}>
                        <Text style={styles.textStyle}>{this.state.data[0].FLevel}</Text>
                    </View>
                </View>
                <View style={styles.cardStyle}>
                    <View style={{ width: '35%' }}>
                        <Text style={styles.textBoldStyle}>Site Eng/Mgr: </Text>
                    </View>
                    <View style={{ width: '65%' }}>
                        <Text style={styles.textStyle}>{this.state.data[0].SLevel}</Text>
                    </View>
                </View>
                <View style={styles.cardStyle}>
                    <View style={{ width: '35%' }}>
                        <Text style={styles.textBoldStyle}>Coordinator: </Text>
                    </View>
                    <View style={{ width: '65%' }}>
                        <Text style={styles.textStyle}>{this.state.data[0].TLevel}</Text>
                    </View>
                </View>
                <View style={styles.cardStyle}>
                    <View style={{ width: '35%' }}>
                        <Text style={styles.textBoldStyle}>Site QS: </Text>
                    </View>
                    <View style={{ width: '65%' }}>
                        <Text style={styles.textStyle}>{this.state.data[0].FLevel}</Text>
                    </View>
                </View>
                <View style={styles.cardStyle}>
                    <View style={{ width: '35%' }}>
                        <Text style={styles.textBoldStyle}>Remarks: </Text>
                    </View>
                    <View style={{ width: '65%' }}>
                        <Text style={styles.textStyle}>{this.state.data[0].Remarks}</Text>
                    </View>
                </View>
                <View style={styles.cardStyle}>
                    <View style={{ width: '35%', height: 50 }}>
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
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, paddingLeft: 5, paddingRight: 5 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.approveStyle} onPress={this.onApprove.bind(this)}>
                            <Text style={styles.buttonTextStyle}>APPROVE</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.cancelStyle} onPress={this.onCancel.bind(this)}>
                            <Text style={styles.buttonTextStyle}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.rejectStyle} onPress={this.onReject.bind(this)}>
                            <Text style={styles.buttonTextStyle}>REJECT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    {this.flatListView()}
                </View>
            </View>
        );
    }

    displayDate(value) {
        if (this.state.hideText) {
            return (
                <Text style={styles.textStyle} onPress={this.setState({ hideText: false })}>{value}</Text>
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
        <View style={{ flex: 1, flexDirection: 'column', borderWidth: 1, marginBottom: 10 }} key={item.Item_Code}>
            <View style={{ flex: 1, flexDirection: 'row', height: 40 }}>
                <View style={{ flex: 1, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.dataStyle}>Item Code</Text>
                </View>
                <View style={{ flex: 1, borderWidth: 1 }}>
                    {this.displayCode(item.Item_Code)}
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', height: 40 }}>
                <View style={{ flex: 1, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.dataStyle}>Description</Text>
                </View>
                <View style={{ flex: 1, borderWidth: 1 }}>
                    {this.displayDes(item.Discription)}
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', height: 40 }}>
                <View style={{ flex: 1, borderWidth: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.dataStyle}>Delivery Date</Text>
                </View>
                <View style={{ flex: 1, borderWidth: 1 }}>
                    {this.displayDate(item.Delivery_Date.date)}
                </View>
            </View>
        </View>
    )

    render() {
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
        borderBottomWidth: 1,
        borderBottomColor: '#CCCDCC',
        //borderColor: '#ddd',
        position: 'relative',
    },
    container: {
        flex: 1,
        padding: 16,
        paddingTop: 30,
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