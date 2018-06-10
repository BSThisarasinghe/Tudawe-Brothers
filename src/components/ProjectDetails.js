import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text, TouchableOpacity, Image, Picker, ScrollView, WebView } from 'react-native';
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
        user_email: this.props.navigation.state.params.code,
        user_password: '',
        error: '',
        loading: false,
        text: '',
        item_code: 'Item Value',
        des: 'Description',
        editable: false,
        editable1: false,
        editable2: false,
        data: [],
        Job_Name: []
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

    onFocus() {
        //this.setState({ editable: true });
        console.log("Edit");
    }

    onFocus1() {
        // this.setState({ editable1: true });
        console.log(this.state.data);
    }


    onFocus2() {
        // this.setState({ editable2: true });
        console.log("Edit2");
    }

    onBlur() {
        this.setState({ editable: false });
        // console.log("Edit");
    }

    componentWillMount() {
        // console.log(this.props.navigation.state.params.code);
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
                this.setState({ data: responseJson.results });
                // If server response message same as Data Matched

            }).catch((error) => {
                //console.error(error);
                // Alert.alert(error);
                Alert.alert("No internet connection");
                this.setState({ loading: false });
            });     
    }

    // componentDidMount(){
    //     this.setState({ Job_Name: this.state.data[0].Job_Name });
    // }

    tableView() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', borderWidth: 1, marginBottom: 10 }}>
                <View style={{ flex: 1, flexDirection: 'row', height: 40 }}>
                    <View style={{ flex: 1, borderWidth: 1 }}>
                        <Text>Item Code</Text>
                    </View>
                    <View style={{ flex: 1, borderWidth: 1 }}>
                        <EditableText
                            text={'textOfTheField'} //required
                            sendText={this.onFocus.bind(this)} //required
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', height: 40 }}>
                    <View style={{ flex: 1, borderWidth: 1 }}>
                        <Text>Destriction</Text>
                    </View>
                    <View style={{ flex: 1, borderWidth: 1 }}>
                        <EditableText
                            text={'textOfTheField122'} //required
                            sendText={this.onFocus1.bind(this)} //required
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', height: 40 }}>
                    <View style={{ flex: 1, borderWidth: 1 }}>
                        <Text>Delivery Date</Text>
                    </View>
                    <View style={{ flex: 1, borderWidth: 1 }}>
                        <EditableText
                            text={'textOfTheFie2'} //required
                            sendText={this.onFocus2.bind(this)} //required
                        />
                    </View>
                </View>
            </View>
        );
    }

    render() {
        return (
            <ScrollView>
                <Card>
                    {/* <View style={styles.viewStyle}>
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
                    </View> */}
                    <View style={styles.containerStyle}>
                        <Text style={styles.titleStyle}>Material Requisition</Text>
                    </View>
                    <View style={styles.cardStyle}>
                        <View style={{ width: '35%' }}>
                            <Text style={styles.textBoldStyle}>Project Name: </Text>
                        </View>
                        <View style={{ width: '65%' }}>
                            <Text style={styles.textStyle}>Something</Text>
                        </View>
                    </View>
                    <View style={styles.cardStyle}>
                        <View style={{ width: '35%' }}>
                            <Text style={styles.textBoldStyle}>MRN No: </Text>
                        </View>
                        <View style={{ width: '65%' }}>
                            <Text style={styles.textStyle}>Something</Text>
                        </View>
                    </View>
                    <View style={styles.cardStyle}>
                        <View style={{ width: '35%' }}>
                            <Text style={styles.textBoldStyle}>MRN Date: </Text>
                        </View>
                        <View style={{ width: '65%' }}>
                            <Text style={styles.textStyle}>Something</Text>
                        </View>
                    </View>
                    <View style={styles.cardStyle}>
                        <View style={{ width: '35%' }}>
                            <Text style={styles.textBoldStyle}>Prepared By: </Text>
                        </View>
                        <View style={{ width: '65%' }}>
                            <Text style={styles.textStyle}>Something</Text>
                        </View>
                    </View>
                    <View style={styles.cardStyle}>
                        <View style={{ width: '35%' }}>
                            <Text style={styles.textBoldStyle}>Site Eng/Mgr: </Text>
                        </View>
                        <View style={{ width: '65%' }}>
                            <Text style={styles.textStyle}>Something</Text>
                        </View>
                    </View>
                    <View style={styles.cardStyle}>
                        <View style={{ width: '35%' }}>
                            <Text style={styles.textBoldStyle}>Coordinator: </Text>
                        </View>
                        <View style={{ width: '65%' }}>
                            <Text style={styles.textStyle}>Something</Text>
                        </View>
                    </View>
                    <View style={styles.cardStyle}>
                        <View style={{ width: '35%' }}>
                            <Text style={styles.textBoldStyle}>Site QS: </Text>
                        </View>
                        <View style={{ width: '65%' }}>
                            <Text style={styles.textStyle}>Something</Text>
                        </View>
                    </View>
                    <View style={styles.cardStyle}>
                        <View style={{ width: '35%', height: 50 }}>
                            <Text style={styles.textBoldStyle}>Remarks: </Text>
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
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.approveStyle}>
                                <Text style={styles.titleStyle}>APPROVE</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.cancelStyle}>
                                <Text style={styles.titleStyle}>CANCEL</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <TouchableOpacity style={styles.rejectStyle}>
                                <Text style={styles.titleStyle}>REJECT</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.container}>
                        {this.tableView()}
                        {this.tableView()}
                    </View>
                </Card>
            </ScrollView>
        );
    }

}

const styles = {
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
        color: '#000',
        fontWeight: 'bold'
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
        backgroundColor: '#1DC737',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#1DC737',
        marginLeft: 5,
        marginRight: 5
    },
    cancelStyle: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D3CA0C',
        borderRadius: 5,
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
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#F22D1D',
        marginLeft: 5,
        marginRight: 5
    },
    containerStyle: {
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center'
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
        padding: 16,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
}

export default ProjectDetails;