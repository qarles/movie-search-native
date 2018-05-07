import {NativeModules, Platform} from 'react-native';
import langs from '../locales';

class I18n {
    static get lang() {
        return Platform.OS === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale.replace(/_/g, '-') : NativeModules.I18nManager.localeIdentifier.replace(/_/g, '-');
    }

    static translate(key) {
        if (langs[I18n.lang]) {
            return langs[I18n.lang][key];
        } else {
            return langs['en-EN'][key];
        }
    }
}

export default I18n;