import React from 'react';
import PropTypes from 'prop-types';
import {TextInput} from 'react-native';
import I18n from '../../utils/I18n';
import styles from './Search.style';

const Search = ({onChangeText}) => {
    return (
        <TextInput underlineColorAndroid='transparent' autoCorrect={false} placeholderTextColor={styles.placeholderColor} placeholder={I18n.translate('search')} style={styles.input} onChangeText={onChangeText} />
    );
};

Search.propTypes = {
    onChangeText: PropTypes.func.isRequired
};

export default Search;