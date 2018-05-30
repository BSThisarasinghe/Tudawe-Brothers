import React, { Component } from 'react';
import { Text, TouchableOpacity, View, Image, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Notification from './common/Notification';
import Card from './common/Card';
import CardSection from './common/CardSection';
import { Spinner } from './common/Spinner';

class RejectedProjects extends Component {

    static navigationOptions =
        {
            title: 'Rejected Projects',
            headerStyle: { backgroundColor: '#fad815' },
            headerRight: <Notification />
        };

    state = { user_email: this.props.navigation.state.params.Email, user_password: '', error: '', loading: false };

    goBack() {
        const { navigate } = this.props.navigation;
        navigate('First');
    }

    viewProjects() {
        const { navigate } = this.props.navigation;
        navigate('Sixth', { Email: this.state.user_email });
    }

    render() {
        return (
            <Card>
                <View style={styles.viewStyle}>
                    <Image source={require('./pics/logo.png')} style={styles.logoStyle} />
                    <Text style={styles.titleStyle}> {this.props.navigation.state.params.Email} </Text>
                    <Button title="LOGOUT" onPress={this.goBack.bind(this)} color= '#fad815' />
                </View>
                <View style={styles.containerStyle}>
                    <TouchableOpacity style={styles.linkStyle} onPress={this.viewProjects.bind(this)}>
                        <View style={{ width: '20%', height: 50 }}>
                            <Image source={require('./pics/mobitel.png')} style={styles.iconStyle} />
                        </View>
                        <View style={{ width: '60%', height: 50, alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Text style={styles.textStyle}>mCash</Text>
                        </View>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('./pics/right-arrow.png')} style={styles.arrowStyle} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.linkStyle} onPress={this.viewProjects.bind(this)}>
                        <View style={{ width: '20%', height: 50 }}>
                            <Image source={require('./pics/dialog.png')} style={styles.iconStyle} />
                        </View>
                        <View style={{ width: '60%', height: 50, alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Text style={styles.textStyle}>Dialog Selfcare</Text>
                        </View>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('./pics/right-arrow.png')} style={styles.arrowStyle} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.linkStyle} onPress={this.viewProjects.bind(this)}>
                        <View style={{ width: '20%', height: 50 }}>
                            <Image source={require('./pics/ezcash.png')} style={styles.iconStyle} />
                        </View>
                        <View style={{ width: '60%', height: 50, alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Text style={styles.textStyle}>eZ Cash</Text>
                        </View>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('./pics/right-arrow.png')} style={styles.arrowStyle} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.linkStyle} onPress={this.viewProjects.bind(this)}>
                        <View style={{ width: '20%', height: 50 }}>
                            <Image source={require('./pics/airtel.png')} style={styles.iconStyle} />
                        </View>
                        <View style={{ width: '60%', height: 50, alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Text style={styles.textStyle}>Airtel</Text>
                        </View>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('./pics/right-arrow.png')} style={styles.arrowStyle} />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.linkStyle} onPress={this.viewProjects.bind(this)}>
                        <View style={{ width: '20%', height: 50 }}>
                            <Image source={require('./pics/recharge.png')} style={styles.iconStyle} />
                        </View>
                        <View style={{ width: '60%', height: 50, alignItems: 'flex-start', justifyContent: 'center' }}>
                            <Text style={styles.textStyle}>Quick Recharge</Text>
                        </View>
                        <View style={{ width: '20%', height: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={require('./pics/right-arrow.png')} style={styles.arrowStyle} />
                        </View>
                    </TouchableOpacity>
                </View>
            </Card>
        )
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
    arrowStyle: {
        height: 20,
        width: 20
    },
    textStyle: {
        fontSize: 20,
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
        height: 50,
        backgroundColor: '#fff',
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