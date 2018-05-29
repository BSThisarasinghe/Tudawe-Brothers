import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text, TouchableOpacity, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
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

    state = { user_email: this.props.navigation.state.params.Email, user_password: '', error: '', loading: false, text: '' };

    viewProjects() {
        const { navigate } = this.props.navigation;
        navigate('Third', { Email: this.state.user_email });
    }

    goBack() {
        const { navigate } = this.props.navigation;
        navigate('First');
    }

    render() {

        const { goBack } = this.props.navigation;

        return (
            <Card>
                <View style={styles.viewStyle}>
                    <Image source={require('./pics/logo.png')} style={styles.logoStyle} />
                    <Text style={styles.titleStyle}> {this.props.navigation.state.params.Email} </Text>
                    <Button title="LOGOUT" onPress={this.goBack.bind(this)} color='#fad815' />
                </View>
                <Card>
                    <CardSection>
                        <Image source={require('./pics/dialog.png')} style={styles.iconStyle} />
                        <Text style={styles.titleStyle}>Dialog Selfcare</Text>
                    </CardSection>
                    <CardSection>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.textBoldStyle}>Start Date: </Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.textStyle}>Sep 15, 2015</Text>
                        </View>
                    </CardSection>
                    <CardSection>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.textBoldStyle}>Start Date: </Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.textStyle}>Sep 15, 2016</Text>
                        </View>
                    </CardSection>
                    <CardSection>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.textBoldStyle}>Company: </Text>
                        </View>
                        <View style={{ width: '50%' }}>
                            <Text style={styles.textStyle}>Dilog Axiata PLC</Text>
                        </View>
                    </CardSection>
                    <CardSection>
                        <View style={{ width: '50%', height: 50 }}>
                            <Text style={styles.textBoldStyle}>Note: </Text>
                        </View>
                        <View style={{ width: '50%', height: 50 }}>
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
                    </CardSection>
                    <CardSection>
                        <View style={{ width: '50%', height: 35 }}>
                            <TouchableOpacity style={styles.approveStyle}>
                                <Text style={styles.titleStyle}>APPROVE</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '50%', height: 35 }}>
                            <TouchableOpacity style={styles.rejectStyle}>
                                <Text style={styles.titleStyle}>REJECT</Text>
                            </TouchableOpacity>
                        </View>
                    </CardSection>
                </Card>
            </Card>
        );
    }

}

const styles = {
    viewStyle: {
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        flexDirection: 'row',
        borderColor: '#ddd',
        position: 'relative',
        marginBottom: 50
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
        backgroundColor: '#169bd4',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#169bd4',
        marginLeft: 5,
        marginRight: 5
    },
    rejectStyle: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 2,
        borderColor: '#169bd4',
        marginLeft: 5,
        marginRight: 5
    }
}

export default ProjectDetails;