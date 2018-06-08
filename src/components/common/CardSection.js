import React, { Component } from 'react';
import { View } from 'react-native';

const CardSection = (props) => {
    return (
      <View style={styles.containerStyle}>
          {props.children}
      </View>
    );  
};

const styles = {
    containerStyle: {
        marginTop: 20,
        borderBottomWidth: 1,
        padding: 5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 60,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        //borderColor: '#ddd',
        position: 'relative',
    }
};


export default CardSection;