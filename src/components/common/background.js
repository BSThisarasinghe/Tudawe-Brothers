import React from 'react';
import { View, Image, Text } from 'react-native';

const Img = () => {
    return (
        <View style={styles.backgroundStyle}>
            <Image 
                source={require('./../pics/background.jpg')}
                style={styles.imageStyle}
                blurRadius={2}
            />
        </View>
    );
};

const styles = {
    backgroundStyle: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    imageStyle: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover'
    }
};

export default Img;