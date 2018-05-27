import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text, TouchableOpacity, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Card from './common/Card';
import CardSection from './common/CardSection';
import { Spinner } from './common/Spinner';
import Notification from './common/Notification';


class ProfileActivity extends Component {

  // Setting up profile activity title.
  static navigationOptions =
    {
      title: 'Profile',
      headerStyle: { backgroundColor: '#fad815' },
      headerRight: <Notification />
    };

    state = { user_email: this.props.navigation.state.params.Email, user_password: '', error: '', loading: false };

    viewProjects(){
      const { navigate } = this.props.navigation;
      navigate('Third', { Email: this.state.user_email });
    }

  render() {

    const { goBack } = this.props.navigation;

    return (
      <Card>
        <View style={styles.headerStyle}>
        <Image source={require('./pics/logo.png')} style={styles.logoStyle} />
          <Text style={styles.titleStyle}> {this.props.navigation.state.params.Email} </Text>
          <Button title="LOGOUT" onPress={() => goBack(null)} style={{ color: '#fad815' }} />
        </View>
        <CardSection>
          <View style={{ width: '100%', height: 80, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity style={styles.buttonStyle} onPress={this.viewProjects.bind(this)}>
              <View style={{ flexDirection: 'row',justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('./pics/projects.png')} style={styles.imageStyle} />
                <Text style={styles.textStyle}>Projects</Text>
              </View>
            </TouchableOpacity>
          </View>
        </CardSection>
        <CardSection>
        <View style={{ width: '100%', height: 80, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <TouchableOpacity style={styles.buttonStyle}>
              <View style={{ flexDirection: 'row',justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('./pics/rejected.png')} style={styles.imageStyle} />
                <Text style={styles.textStyle}>Rejected</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle}>
              <View style={{ flexDirection: 'row',justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('./pics/settings.png')} style={styles.imageStyle} />
                <Text style={styles.textStyle}>Settings</Text>
              </View>
            </TouchableOpacity>
          </View>
        </CardSection>
      </Card>
    );
  }

}

const styles = {
  headerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  },
  titleStyle: {
    fontSize: 20,
    paddingLeft: 20,
    flex: 1,
    color: '#000'
  },
  textStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingLeft: 20,
    flex: 1,
    color: '#000'
  },
  buttonStyle: {
    backgroundColor: '#fad815',
    flex: 1,
    height: '100%',
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageStyle: {
    width: 40,
    height: 40
  },
  logoStyle: {
      height: '100%',
      width: 40
  }
}

export default ProfileActivity;