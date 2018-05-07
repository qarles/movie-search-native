import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import styles from './Spinner.style';

const Spinner = ({size}) => (
    <View style={{...styles, width: size, height: size}}>
        <ActivityIndicator size="large" color="#0000ff" />
    </View>
);

export default Spinner;