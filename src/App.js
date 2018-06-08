import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Header } from './components/common/header';
import LoginForm from './components/LoginForm';
import ProfileActivity from './components/ProfileActivity';
import ProjectPage from './components/ProjectPage';
import ProjectDetails from './components/ProjectDetails';
import RejectedProjects from './components/RejectedProjects';
import RejectedProjectsDetails from './components/RejectedProjectsDetails';
import Settings from './components/Settings';

const NavigationApp = StackNavigator({
  First: { screen: LoginForm },
  Second: { screen: ProfileActivity },
  Third: { screen: ProjectPage },
  Fourth: { screen: ProjectDetails },
  Fifth: { screen: RejectedProjects },
  Sixth: { screen: RejectedProjectsDetails },
  Seventh: { screen: Settings }
});

export default class App extends React.Component{
  render(){
    return <NavigationApp />
  }
}
