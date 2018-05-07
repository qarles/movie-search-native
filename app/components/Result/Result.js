import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {TextInput, View, Text, Animated, Dimensions, TouchableOpacity} from 'react-native';
import styles from './Result.style';
import Spinner from '../Spinner';

class Result extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            loaded: false,
            opacity: new Animated.Value(0)
        }

        this.onLoadEnd = this.onLoadEnd.bind(this);
    }

    onLoadEnd() {
        this.setState({loaded: true});
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500
        }).start();
    }

    render() {
        const {data, onResultClick} = this.props,
            {title, poster_path} = data;
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.touchable} onPress={() => onResultClick(data)}>
                    <Text style={styles.title}>{title}</Text>
                    {!this.state.loaded && <Spinner size={styles.image.width} />}
                    <Animated.Image onLoadEnd={this.onLoadEnd} style={{...styles.image, opacity: this.state.opacity}} source={poster_path ? {uri: `https://image.tmdb.org/t/p/w500${poster_path}`} : require('../../assets/no-image.png')} />
                </TouchableOpacity>
            </View>
        );
    }
}

Result.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string.isRequired,
        poster_path: PropTypes.string
    }).isRequired,
    onResultClick: PropTypes.func.isRequired
}

export default Result;