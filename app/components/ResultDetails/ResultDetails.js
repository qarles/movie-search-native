import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {TextInput, View, ScrollView, Text, Image, TouchableOpacity, Animated} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './ResultDetails.style';

class ResultDetails extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            imageHeight: new Animated.Value(styles.image.height)
        };

        this.toggleImage = this.toggleImage.bind(this);
        this.onScroll = this.onScroll.bind(this);

        this.expanded = true;
        this.animation = false;
    }

    toggleImage() {
        const {height} = styles.image;
        if (!this.animation) {
            this.animation = true;

            Animated.timing(this.state.imageHeight, {
                toValue: this.expanded ? height / 2 : height,
                duration: 500
            }).start(() => {
                this.expanded = !this.expanded;
                setTimeout(() => {
                    this.animation = false;
                }, 100);
            });
        }
    }

    onScroll(e) {
        const {contentOffset} = e.nativeEvent;

        if (!this.animation) {
            if (contentOffset.y <= 0 && !this.expanded) {
                this.toggleImage();
            } else if (this.expanded) {
                this.toggleImage();
            }
        }
    }

    render() {
        const {title, vote_average, vote_count, poster_path, overview, release_date} = this.props;
        return (
            <View style={styles.container}>
                <Animated.View style={{...styles.image, height: this.state.imageHeight}}>
                    <Image resizeMode='contain' style={{width: '100%', height: '100%'}} source={poster_path ? {uri: `https://image.tmdb.org/t/p/w500${poster_path}`} : require('../../assets/no-image.png')} />
                </Animated.View>
                <View style={styles.infoIcons.container}>
                    <View style={styles.infoIcons.base}>
                        <MaterialIcons
                            name='star'
                            size={26}
                            style={{color: 'gold'}}
                        />
                        <Text>{vote_average}</Text>
                    </View>
                    <View style={styles.infoIcons.base}>
                        <MaterialIcons
                            name='person'
                            size={26}
                            style={{color: 'blue'}}
                        />
                        <Text>{vote_count}</Text>
                    </View>
                    <View style={{...styles.infoIcons.base, ...styles.infoIcons.right}}>
                        <Text>{release_date}</Text>
                        <MaterialIcons
                            name='date-range'
                            size={26}
                            style={{color: 'grey'}}
                        />
                    </View>
                </View>
                <View style={styles.info}>
                    <ScrollView style={{height: '100%'}} scrollEventThrottle={400} onScroll={this.onScroll}>
                        <Text style={styles.infoText}>{overview}</Text>
                    </ScrollView>
                </View>
            </View>
        );
    }
};

ResultDetails.propTypes = {
    title: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired,
    vote_count: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    release_date: PropTypes.string,
    overview: PropTypes.string
}

export default ResultDetails;