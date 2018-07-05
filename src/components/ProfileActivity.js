import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text, TouchableOpacity, Image, AppState, Platform, Picker, BackHandler } from 'react-native';
import { StackNavigator } from 'react-navigation';
import PushNotification from 'react-native-push-notification';
import IconBadge from 'react-native-icon-badge';
import DeviceInfo from 'react-native-device-info';
import Card from './common/Card';
import CardSection from './common/CardSection';
import { Spinner } from './common/Spinner';
import Notification from './common/Notification';
import PushController from './PushController';
import Img from './common/background';
import Back from './common/BackButton';

var take;

const deviceId = DeviceInfo.getDeviceId();

class ProfileActivity extends Component {

  // Setting up profile activity title.
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Tudawe Brothers',
      headerStyle: { backgroundColor: '#fad815' },
      headerRight: <Notification onPress={() => take.showNotifications()} count={params.countValue} navigation={navigation} />,
      headerLeft: <Back />
    }
  };

  constructor(props) {
    super(props);

    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    this.state = {
      user_email: this.props.navigation.state.params.Email,
      user_password: '',
      error: '',
      loading: false,
      seconds: 5,
      notification: '',
      count: 0,
      msg: 0,
      projects: 0
    };
  }

  showNotifications() {
    // console.log("Hello Buwa");
    const { navigate } = this.props.navigation;
    navigate('Tenth', { Email: this.state.user_email });
  }

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
    const { navigate } = this.props.navigation;
    navigate('Eighth', { Email: this.state.user_email });
  }

  settingsView() {
    const { navigate } = this.props.navigation;
    navigate('Seventh', { Email: this.state.user_email });
  }

  sendMsg() {
    fetch('http://bsthisarasinghe-001-site1.1tempurl.com/seenMessages.php')
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const { navigate } = this.props.navigation;
        navigate('Eleventh', { Email: this.state.user_email });

      }).catch((error) => {
        // console.error(error);
        // Alert.alert(error);
        Alert.alert("No internet connection");
        this.setState({ loading: false });
      });
  }

  componentWillMount() {
    // console.log(deviceId);
    this.getCount();
    this.countMessages();
    this.countProjects();
    this.getNotification();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    this.props.navigation.setParams({
      countValue: this.state.count
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   //   if (prevState.count !== this.state.count) {
  //       // this.getCount();
  //   //   }
  //   // if (prevState.msg !== this.state.msg) {
  //   this.countMessages();
  //   // }
  //   //   if (prevState.projects !== this.state.projects) {
  //   //     this.countProjects();
  //   //   }
  // }

  handleBackButtonClick() {
    BackHandler.exitApp();
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

  countMessages() {
    fetch('http://bsthisarasinghe-001-site1.1tempurl.com/countMessages.php')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson.count);
        this.setState({ msg: responseJson.count });
      }).catch((error) => {
        // console.error(error);
        // Alert.alert(error);
        Alert.alert("No internet connection");
        this.setState({ loading: false });
      });
  }

  countProjects() {
    fetch('http://bsthisarasinghe-001-site1.1tempurl.com/projectsCount.php')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson.count);
        this.setState({ projects: responseJson.count });
      }).catch((error) => {
        // console.error(error);
        // Alert.alert(error);
        Alert.alert("No internet connection");
        this.setState({ loading: false });
      });
  }

  getNotification() {
    fetch('http://bsthisarasinghe-001-site1.1tempurl.com/notification.php')
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log("Hello");
        this.setState({ notification: responseJson });
      }).catch((error) => {
        // console.error(error);
        // Alert.alert(error);
        Alert.alert("No internet connection");
        this.setState({ loading: false });
      });
  }

  handleAppStateChange(appState) {
    if (appState === 'background' || appState === 'inactive') {
      // console.log("App is in background");
      let date = new Date(Date.now() + (60 * 1000));

      if (Platform.OS === 'ios') {
        date = date.toISOString();
      }

      PushNotification.localNotificationSchedule({
        message: this.state.notification, // (required)
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
        // console.error(error);
        // Alert.alert(error);
        Alert.alert("No internet connection");
        // this.setState({ loading: false });
      });
  }

  logoutButton(itemValue) {
    if (itemValue === "Logout") {
      { this.goBack() };
    }
  }

  render() {
    take = this;
    return (
      <View style={{ flex: 1 }}>
        <Img />
        <Card>
          <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
              <TouchableOpacity style={styles.buttonStyle} onPress={this.viewProjects.bind(this)}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                  <IconBadge
                    MainElement={
                      <Image source={require('./pics/projects.png')} style={styles.imageStyle} />
                    }
                    BadgeElement={
                      <Text style={{ color: '#000' }}>{this.state.projects}</Text>
                    }
                    IconBadgeStyle={
                      {
                        width: 40,
                        height: 40,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        position: 'absolute',
                        top: -18,
                        right: -20,
                        borderRadius: 50
                      }
                    }
                    Hidden={this.state.projects == 0}
                  />
                  <Text style={styles.textStyle}>Pending Approvals</Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity style={styles.buttonStyle} onPress={this.rejectedProjects.bind(this)}>
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                <Image source={require('./pics/rejected.png')} style={styles.imageStyle} />
                <Text style={styles.textStyle}>Rejected</Text>
              </View>
            </TouchableOpacity> */}
              <TouchableOpacity style={styles.buttonStyle} onPress={this.sendMsg.bind(this)}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                  <IconBadge
                    MainElement={
                      <Image source={require('./pics/message.png')} style={styles.imageStyle} />
                    }
                    BadgeElement={
                      <Text style={{ color: '#000' }}>{this.state.msg}</Text>
                    }
                    IconBadgeStyle={
                      {
                        width: 30,
                        height: 30,
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        position: 'absolute',
                        top: -10,
                        right: -10
                      }
                    }
                    Hidden={this.state.msg == 0}
                  />
                  <Text style={styles.textStyle}>Messages</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
              <TouchableOpacity style={styles.buttonStyle} onPress={this.approvedProjects.bind(this)}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                  <Image source={require('./pics/pending.png')} style={styles.imageStyle} />
                  <Text style={styles.textStyle}>SRN Status</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonStyle} onPress={this.settingsView.bind(this)}>
                <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}>
                  <Image source={require('./pics/settings.png')} style={styles.imageStyle} />
                  <Text style={styles.textStyle}>Settings</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
        {/* <IconBadge
          MainElement={
            <TouchableOpacity style={{ alignItems: 'flex-end', padding: 10 }} onPress={this.sendMsg.bind(this)}>
              <Image source={require('./pics/msg.png')} style={styles.imageStyle} />
            </TouchableOpacity>
          }
          BadgeElement={
            <Text style={{ color: '#FFFFFF' }}>{this.state.msg}</Text>
          }
          IconBadgeStyle={
            {
              width: 20,
              height: 20,
              backgroundColor: 'red'
            }
          }
          Hidden={this.state.msg == 0}
        /> */}
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