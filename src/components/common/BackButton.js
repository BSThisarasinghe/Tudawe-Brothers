import React, { Component } from 'react';
import { View, Image, Text, TouchableOpacity, BackHandler } from 'react-native';

class Back extends Component {

    constructor(props) {
        super(props);

        // this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    // componentWillMount() {
    //     BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    // }


    handleBackButtonClick() {
        BackHandler.exitApp();
        return true;
        // console.log("App is in background");
    }

    render() {
        return (
            <TouchableOpacity style={styles.backgroundStyle} onPress={this.handleBackButtonClick.bind(this)}>
                <Image
                    source={require('./../pics/back.png')}
                    style={styles.imageStyle}
                />
            </TouchableOpacity>
        );
    }
};

const styles = {
    backgroundStyle: {
        marginLeft: 10,
        marginRight: 5
    },
    imageStyle: {
        width: 30,
        height: 30
    }
};

export default Back;