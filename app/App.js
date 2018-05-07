import React, {Component} from 'react';
import {View, Platform, ActivityIndicator} from 'react-native';
import {StackNavigator} from 'react-navigation';
import I18n from './utils/I18n';
import Search from './components/Search';
import Results from './components/Results';
import ResultDetails from './components/ResultDetails';

const API = 'https://api.themoviedb.org/3/',
    API_KEY = '03c93abb1975c0c02a167e1b3e8b63d4';

const mainStyle = {
    flex: 1,
    justifyContent: 'center'
};

class App extends Component {

    static navigationOptions = {
        title: I18n.translate('home'),
        headerBackTitle: null,
        headerTitleStyle: {
            alignSelf: 'center'
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            results: [],
            query: '',
            page: 1,
            total_pages: 1,
            isLoading: false,
            isBottom: false,
            isEnd: true
        }

        this.isRequest = false;
        this.searchTimeout = null;

        this.searchMovies = this.searchMovies.bind(this);
        this.requestMovies = this.requestMovies.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.goToDetails = this.goToDetails.bind(this);
    }

    searchMovies(query) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout)
        }
        this.setState({isLoading: true});
        this.searchTimeout = setTimeout(() => {
            if (query) {
                this.requestMovies(query, 1).then(({results, page, total_pages}) => {
                    this.setState({results, query, page, total_pages, isLoading: false, isEnd: results.length === 0});
                })
            } else {
                this.setState({results: [], query: '', page: 1, total_pages: 1, isLoading: false, isEnd: true})
            }
        }, 500);
    }

    requestMovies(query, page) {
        return fetch(`${API}search/movie?api_key=${API_KEY}&query=${query}&page=${page}&language=${I18n.lang}`)
            .then(r => r.json())
    }

    handleScroll(e) {
        if (!this.isRequest && !this.state.isEnd) {
            const {layoutMeasurement, contentOffset, contentSize} = e.nativeEvent;
            if (contentOffset.y >= contentSize.height - (layoutMeasurement.height + 500)) {
                if (!this.state.isBottom) {
                    this.isRequest = true;
                    this.setState({isBottom: true});
                    this.requestMovies(this.state.query, this.state.page + 1).then(({results, page, total_pages}) => {
                        this.setState({results: this.state.results.concat(results), page, isBottom: false, isEnd: results.length === 0}, () => {
                            this.isRequest = false;
                        });
                    })
                }
            }
        }

    }

    goToDetails(element) {
        this.props.navigation.navigate('Details', element);
    }

    render() {
        return <View style={mainStyle}>
            <Search onChangeText={this.searchMovies} />
            {this.state.isLoading ? <View style={{flex: 1, alignItems: 'center', marginTop: 20}}><ActivityIndicator size="large" color="#0000ff" /></View> : <Results onScroll={this.handleScroll} onResultClick={this.goToDetails} results={this.state.results} />}
            {this.state.isBottom && <View style={{marginTop: 10, marginBottom: 10}}><ActivityIndicator size="large" color="#0000ff" /></View>}
        </View>;
    }
}

const Details = props => <ResultDetails {...props.navigation.state.params} />;
Details.navigationOptions = ({navigation}) => {
    const {params} = navigation.state;
    return {
        title: params ? params.title : 'Unknown title'
    }
};

export default StackNavigator({
    Home: {
        screen: App
    },
    Details: {
        screen: Details
    }
});