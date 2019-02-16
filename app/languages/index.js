/**
 * @providesModule language
 */

import { NativeModules } from 'react-native'
import Store from 'helpers/store'
import en from './en'
import zh from './zh'

const appLanguagePacks = { en, zh }
const deviceLocale = NativeModules.SettingsManager.settings.AppleLocale.substring(0, 2).toLowerCase()
const appLanguage = Store.get('app_language') || deviceLocale

export const getLanguage = () => appLanguage

export const setLanguage = (language) => {
  Store.set('app_language', language)
  Store.setLocalData('app_language', language)
}

export default appLanguagePacks[appLanguage] || appLanguagePacks['en']
