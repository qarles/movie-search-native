import {center} from '../../styles/main';
import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');

export default ({
    container: {
        ...center,
    },
    image: {
        width,
        height: width
    },
    infoIcons: {
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: 10,
            width
        },
        base: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        right: {
            flex: 1,
            justifyContent: 'flex-end'
        }
    },
    info: {
        ...center,
        marginVertical: 10
    },
    infoText: {
        textAlign: 'justify',
        marginHorizontal: 20,
        fontSize: 16,
        ...Platform.select({
            android: {
                minHeight: height / 2 - 25,
            },
            ios: {}
        })
    }
});