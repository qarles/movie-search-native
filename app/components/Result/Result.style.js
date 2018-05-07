import {center} from '../../styles/main';
import {Dimensions} from 'react-native';

const {width} = Dimensions.get('window'),
    size = width / 2 - 3;

export default ({
    container: {
        width: size,
        height: size,
        marginVertical: 1
    },
    touchable: {
        position: 'relative'
    },
    title: {
        backgroundColor: 'rgba(0,0,0,.7)',
        color: 'white',
        position: 'absolute',
        zIndex: 1,
        textAlign: 'center',
        width: '100%'
    },
    image: {
        width: '100%',
        height: '100%'
    }
});