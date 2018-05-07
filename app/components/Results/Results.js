import React from 'react';
import PropTypes from 'prop-types';
import {View, ScrollView} from 'react-native';
import Result from '../Result';
import styles from './Results.style';

const Results = ({results, onResultClick, onScroll}) => {
    return (
        <ScrollView scrollEventThrottle={400} onScroll={onScroll}>
            <View style={styles.container}>
                {results.map(result => <Result key={result.id} data={result} onResultClick={onResultClick}/>)}
            </View>
        </ScrollView>
    );
};

Results.propTypes = {
    results: PropTypes.array.isRequired,
    onResultClick: PropTypes.func.isRequired,
    onScroll: PropTypes.func.isRequired
};

export default Results;