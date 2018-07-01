import React, { Component } from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginForm from './components/LoginForm';
import ProfileActivity from './components/ProfileActivity';
import ProjectPage from './components/ProjectPage';
import ProjectDetails from './components/ProjectDetails';
import RejectedProjects from './components/RejectedProjects';
import RejectedProjectsDetails from './components/RejectedProjectsDetails';
import Settings from './components/Settings';
import ApprovedProjects from './components/ApprovedProjects';
import ApprovedProjectsDetails from './components/ApprovedProjectsDetails';
import Home from './components/Home';
import NewMessages from './components/NewMessages';
import SendMessage from './components/SendMessage';
import NotificationDetails from './components/NotificationDetails';

const NavigationApp = StackNavigator({
  Home: { screen: Home },
  First: { screen: LoginForm },
  Second: { screen: ProfileActivity },
  Third: { screen: ProjectPage },
  Fourth: { screen: ProjectDetails },
  Fifth: { screen: RejectedProjects },
  Sixth: { screen: RejectedProjectsDetails },
  Seventh: { screen: Settings },
  Eighth: { screen: ApprovedProjects },
  Ninth: { screen: ApprovedProjectsDetails },
  Tenth: { screen: NewMessages },
  Eleventh: { screen: SendMessage },
  Twelwth: { screen: NotificationDetails }
});

export default class App extends React.Component{
  render(){
    return <NavigationApp />
  }
}
