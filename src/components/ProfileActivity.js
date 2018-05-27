import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Alert, Button, Text, TouchableOpacity, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Card from './common/Card';
import CardSection from './common/CardSection';
import { Spinner } from './common/Spinner';


class ProfileActivity extends Component {

  // Setting up profile activity title.
  static navigationOptions =
    {
      title: 'ProfileActivity',

    };

  render() {

    const { goBack } = this.props.navigation;

    return (
      <Card>
        <View style={styles.headerStyle}>
          <Text style={styles.titleStyle}> {this.props.navigation.state.params.Email} </Text>
          <Button title="LOGOUT" onPress={() => goBack(null)} />
        </View>
        <CardSection>
          <View style={{ width: '100%', height: 80, justifyContent: 'center', alignItems: 'center', flex: 1, flexDirection: 'row' }}>
            <TouchableOpacity style={styles.buttonStyle}>
            <Image source={require('./pics/projects.png')} style={styles.imageStyle} />
              <Text style={styles.textStyle}>
                Projects
            </Text>
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
    alignSelf: 'stretch',
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageStyle: {
    width: 40,
    height: 40
  }
}

export default ProfileActivity;