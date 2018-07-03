import React, { Component } from 'react';
import { Alert, View, Text, FlatList, YellowBox } from 'react-native';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

class Home extends Component {

  static navigationOptions =
    {
      title: '',
      headerStyle: { backgroundColor: 'transparent', height: 0 }
    };

    // state = {
    //   // user_email: this.props.navigation.state.params.Email
    // }


  onButtonPress() {
    // const { user_email, user_password } = this.state;
    const { navigate } = this.props.navigation;
    // this.setState({ error: '', loading: true });
    //console.log(email);

    fetch('http://bsthisarasinghe-001-site1.1tempurl.com/index.php')
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        if(responseJson.results[1] === 'session is set'){
          navigate('Second', { Email: responseJson.results[0] });
          this.setState({ loading: false });
        }else{
          navigate('First');
          this.setState({ loading: false });
        }
      }).catch((error) => {
        // console.error(error);
        // Alert.alert(error);
        Alert.alert("No internet connection");
        // this.setState({ loading: false });
      });
  }

  componentWillMount() {
    this.onButtonPress();
    YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated']);
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <BarIndicator color='#fad815' size={80} count={5} />
      </View>
    );
  }
}

export default Home;