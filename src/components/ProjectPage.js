import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Notification from './common/Notification';

class ProjectPage extends Component {

    static navigationOptions =
        {
            title: 'Projects',
            headerStyle: { backgroundColor: '#fad815' },
            headerRight: <Notification />
        };

    render() {
        return (
            <View style={{ flex: 1, padding: 10 }}>
                <Text style={styles.textStyle}>
                    {this.props.navigation.state.params.Email}
                </Text>
            </View>
        )
    }
}


const styles = {
    textStyle: {
        alignSelf: 'flex-end',
        color: '#000',
        fontSize: 17,
        fontWeight: '600',
        paddingTop: 10,
        paddingBottom: 10
    }
}

export default ProjectPage;