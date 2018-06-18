import React, { Component } from 'react';
import { Text, TouchableOpacity, Image } from 'react-native';
import IconBadge from 'react-native-icon-badge';

const Notification = ({ onPress, count }) => {
    return (
        <IconBadge
            MainElement={
                <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
                    <Image source={require('../pics/notification.png')} style={styles.imageStyle} />
                </TouchableOpacity>
            }
            BadgeElement={
                <Text style={{ color: '#FFFFFF' }}>{count}</Text>
            }
            IconBadgeStyle={
                {
                    width: 20,
                    height: 20,
                    backgroundColor: 'red'
                }
            }
            Hidden={count == 0}
        />
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