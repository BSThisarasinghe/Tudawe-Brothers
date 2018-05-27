import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';
//const data = require('../backend/results.json');
import data from '../backend/results.json';

class Body extends Component {

  state = { value: [] };

  componentWillMount() {
    // axios.get('https://localhost/newApp/src/components/backend/results.json')
    //   .then(response => console.log(response))
    //   .catch(function (error) {
    //     console.log('There has been a problem with your fetch operation: ' + error.message);
    //     // ADD THIS THROW error
    //     throw error;
    //   });
    // //console.log("Hello");
    this.setState({ value: data.posts.name });
    console.log(data.posts[0]);
  }

  render() {
    return (
      <View>
        <Text>{data.posts[0].name}</Text>
      </View>
    );
  }
}

export default Body;