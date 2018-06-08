import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ size }) => {
    return(
        <View style={styles.viewStyle}>
            <ActivityIndicator size={size || 'large'} />
        </View>
    );
}

const styles = {
    viewStyle: { 
        flex: 1,
        backgroundColor: 'rgba(253, 197, 24, 0.8)',
        alignSelf: 'stretch',
        borderRadius: 5,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 60,
        paddingTop: 10,
        paddingBottom: 10
    }
}

export { Spinner };