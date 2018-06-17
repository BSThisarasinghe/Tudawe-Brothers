import React, { Component } from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';

const Notification = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
            <Image source={require('../pics/notification.png')} style={styles.imageStyle} />
        </TouchableOpacity>
    )
}


const styles = {
    imageStyle: {
        width: 30,
        height: 30
    },
    buttonStyle: {
        marginLeft: 5,
        marginRight: 10
    }
}

export default Notification;