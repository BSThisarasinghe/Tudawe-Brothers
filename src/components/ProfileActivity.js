import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text, TouchableOpacity, Image, AppState, Platform, Picker, BackHandler } from 'react-native';
import { StackNavigator } from 'react-navigation';
import PushNotification from 'react-native-push-notification';
import Card from './common/Card';
import CardSection from './common/CardSection';
import { Spinner } from './common/Spinner';
import Notification from './common/Notification';
import PushController from './PushController';
import Img from './common/background';
import Back from './common/BackButton';

class ProfileActivity extends Component {

  // Setting up profile activity title.
  static navigationOptions =
    {
      title: 'Tudawe Brothers(Pvt) Ltd',
      headerStyle: { backgroundColor: '#fad815' },
      headerRight: <Notification />,
      headerLeft: <Back />
    };

  constructor(props) {
    super(props);

    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = { user_email: this.props.navigation.state.params.Email, user_password: '', error: '', loading: false, seconds: 5 };
  }

  //state = { user_email: this.props.navigation.state.params.Email, user_password: '', error: '', loading: false, seconds: 5 };

  viewProjects() {
    const { navigate } = this.props.navigation;
    navigate('Third', { Email: this.state.user_email });
  }

  rejectedProjects() {
    // console.log("Working");
    const { navigate } = this.props.navigation;
    navigate('Fifth', { Email: this.state.user_email });
  }

  approvedProjects() {
    // console.log("Working");
    const { navigate } = this.props.navigation;
    navigate('Eighth', { Email: this.state.user_email });
  }

  settingsView() {
    const { navigate } = this.props.navigation;
    navigate('Seventh', { Email: this.state.user_email });
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    // BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }

  handleAppStateChange(appState) {
    if (appState === 'background') {
      // console.log("App is in background");
      let date = new Date(Date.now() + (60 * 1000));

      if (Platform.OS === 'ios') {
        date = date.toISOString();
      }

      PushNotification.localNotificationSchedule({
        message: "My Notification Message", // (required)
        date, // in 60 secs
      });
    }
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
        console.error(error);
        // Alert.alert(error);
        // Alert.alert("No internet connection");
        // this.setState({ loading: false });
      });
  }

  logoutButton(itemValue) {
    if (itemValue === "Logout") {
      { this.goBack() };
    }
  }

  render() {

    return (
      <View style={{ flex: 1 }}>
        <Img />
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
        <Card>
          <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
            <TouchableOpacity style={styles.buttonStyle} onPress={this.viewProjects.bind(this)}>
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                <Image source={require('./pics/projects.png')} style={styles.imageStyle} />
                <Text style={styles.textStyle}>Projects</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} onPress={this.rejectedProjects.bind(this)}>
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                <Image source={require('./pics/rejected.png')} style={styles.imageStyle} />
                <Text style={styles.textStyle}>Rejected</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
            <TouchableOpacity style={styles.buttonStyle} onPress={this.approvedProjects.bind(this)}>
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                <Image source={require('./pics/approved.png')} style={styles.imageStyle} />
                <Text style={styles.textStyle}>Approved</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonStyle} onPress={this.settingsView.bind(this)}>
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                <Image source={require('./pics/settings.png')} style={styles.imageStyle} />
                <Text style={styles.textStyle}>Settings</Text>
              </View>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
    );
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
  textStyle: {
    fontSize: 17,
    fontWeight: 'bold',
    paddingLeft: 20,
    flex: 1,
    color: '#fff'
  },
  buttonStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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