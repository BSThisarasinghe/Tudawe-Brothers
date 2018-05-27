import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Header } from './components/common/header';
import LoginForm from './components/LoginForm';
import ProfileActivity from './components/ProfileActivity';

const NavigationApp = StackNavigator({
  First: { screen: LoginForm },
  Second: { screen: ProfileActivity }
});

export default class App extends React.Component{
  render(){
    return <NavigationApp />
  }
}
