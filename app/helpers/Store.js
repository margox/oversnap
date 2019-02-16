/**
 * @providesModule helpers/store
 */

import { AsyncStorage } from 'react-native'
import iCloudStorage from 'react-native-icloudstore'

let appTempData = {}

export default {

  set (name, value) {
    appTempData[name] = value
    return appTempData
  },

  get (name) {
    return name ? appTempData[name] : appTempData
  },

  remove (name) {
    delete appTempData[name]
    return appTempData
  },

  async setCloudData (name, data, stringify = true) {
    await iCloudStorage.setItem(name, stringify ? JSON.stringify(data) : data)
  },

  async getCloudData (name, toJSON = true) {
    const response = await iCloudStorage.getItem(name)
    return toJSON ? (response ? JSON.parse(response) : null) : response
  },

  async setLocalData (name, data, stringify = true) {
    await AsyncStorage.setItem(name, stringify ? JSON.stringify(data) : data)
  },

  async getLocalData (name, toJSON = true) {
    const response = await AsyncStorage.getItem(name)
    return toJSON ? (response ? JSON.parse(response) : null) : response
  },

  async removeLocalData (name) {
    await AsyncStorage.removeItem(name)
  },

  async clearLocalData () {
    await AsyncStorage.clear()
  }

}