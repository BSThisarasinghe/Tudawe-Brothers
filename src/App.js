import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Header } from './components/common/header';
import LoginForm from './components/LoginForm';
import ProfileActivity from './components/ProfileActivity';
import ProjectPage from './components/ProjectPage';

const NavigationApp = StackNavigator({
  First: { screen: LoginForm },
  Second: { screen: ProfileActivity },
  Third: { screen: ProjectPage }
});

export default class App extends React.Component{
  render(){
    return <NavigationApp />
  }
}
