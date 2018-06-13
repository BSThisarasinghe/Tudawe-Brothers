import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size, spinnerStyle }) => {
    return(
        <View style={spinnerStyle}>
            <ActivityIndicator size={size || 'large'} />
        </View>
    );
}

export { Spinner };