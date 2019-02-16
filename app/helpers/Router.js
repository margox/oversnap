/**
 * @providesModule helpers/router
 */

import { Alert } from 'react-native'
import IndexScreen from 'screens/index'
import PhotoScreen from 'screens/photo'
import UserPhotosScreen from 'screens/user/photos'
import SearchScreen from 'screens/search'
import SearchResultScreen from 'screens/search/result'
import WebViewScreen from 'screens/webview'
import MapViewScreen from 'screens/mapview'
import SettingsScreen from 'screens/settings'
import AboutScreen from 'screens/about'
import ContactScreen from 'screens/contact'
import CreditsScreen from 'screens/credits'

import Picker from 'components/picker'
import Dialog from 'components/dialog'
import ActionSheet from 'components/actionsheet'
import Message from 'components/message'

let __navigator = null

const routes = {
  'index': IndexScreen,
  'photo': PhotoScreen,
  'user/photos': UserPhotosScreen,
  'search': SearchScreen,
  'search/result': SearchResultScreen,
  'webview': WebViewScreen,
  'mapview': MapViewScreen,
  'settings': SettingsScreen,
  'about': AboutScreen,
  'contact': ContactScreen,
  'credits': CreditsScreen,
  'picker': Picker,
  'dialog': Dialog,
  'actionsheet': ActionSheet,
  'message': Message
}

const bindNavigator = (navigator) => __navigator = navigator

const navigateTo = (route, param = {}, navigator = null) => {

  navigator = navigator || __navigator

  if (!navigator || !route) {
    return false
  }

  if (!routes[route]) {
    navigator.push({
      screen: 'webview',
      title: param.title,
      navigatorStyle: {
        tabBarHidden: true
      },
      passProps: { url: route, ...param }
    })
  } else {
    navigator.push({
      screen: route,
      navigatorStyle: {
        tabBarHidden: true
      },
      passProps: param
    })
  }

}

const push = (param, navigator = null) => {

  navigator = navigator || __navigator

  if (!navigator || !param) {
    return false
  }

  navigator.push(param)

}

const showModal = (route, param = {}, navigator = null) => {

  navigator = navigator || __navigator

  if (!navigator || !route) {
    return false
  }

  navigator.showModal({
    screen: route,
    passProps: param
  })

}

const showLightBox = (route, param = {}, navigator = null) => {

  navigator = navigator || __navigator

  if (!navigator || !route) {
    return false
  }

  navigator.showLightBox({
    screen: route,
    passProps: param,
    style: {
      backgroundBlur: 'none',
      tapBackgroundToDismiss: false
    }
  })

}

const showPicker = (param = {}, navigator = null) => {

  navigator = navigator || __navigator

  if (!navigator) {
    return false
  }

  navigator.showLightBox({
    screen: 'picker',
    passProps: param,
    style: {
      backgroundBlur: 'none',
      backgroundColor: '#00000050',
      tapBackgroundToDismiss: true
    }
  })

}

const showDialog = (param = {}, navigator = null) => {

  navigator = navigator || __navigator

  if (!navigator) {
    return false
  }

  navigator.showLightBox({
    screen: 'dialog',
    passProps: param,
    style: {
      backgroundBlur: 'none',
      backgroundColor: '#00000050',
      tapBackgroundToDismiss: true
    }
  })

}

const showAlert = (param) => {

  Alert.alert(
    param.title,
    param.message,
    param.buttons,
    param.options
  )

}

const showActionSheet = (param = {}, navigator = null) => {

  navigator = navigator || __navigator

  if (!navigator) {
    return false
  }

  navigator.showLightBox({
    screen: 'actionsheet',
    passProps: param,
    style: {
      backgroundBlur: 'none',
      backgroundColor: '#00000050',
      tapBackgroundToDismiss: true
    }
  })

}

const showMessage = (param = {}, navigator = null) => {

  navigator = navigator || __navigator

  if (!navigator) {
    return false
  }

  param.type === 'error' && (param.backgroundColor = '#e74c3c')

  navigator.dismissInAppNotification()

  navigator.showInAppNotification({
    screen: "message",
    passProps: param,
    animation: {
      animated: true,
      duration: 0.5,
      type: 'slide-down',
      fade: true
    },
    autoDismissTimerSec: param.duration || 1
  })

}

const dismissMessage = (navigator = null) => {

  navigator = navigator || __navigator

  if (!navigator) {
    return false
  }

  navigator.dismissInAppNotification()

}

const dismissModal = () => {

  if (!__navigator) {
    return false
  }

  __navigator.dismissModal()

}

const dismissLightBox = () => {

  if (!__navigator) {
    return false
  }

  __navigator.dismissLightBox()

}

const dismissDialog = dismissLightBox

const navigateBack = () => {
  __navigator && __navigator.pop()
}

const switchToTab = (param) => {
  __navigator && __navigator.switchToTab(param)
}

export default {
  routes,
  bindNavigator,
  push,
  navigateTo,
  navigateBack,
  showModal,
  showLightBox,
  showPicker,
  showDialog,
  showAlert,
  showActionSheet,
  showMessage,
  dismissModal,
  dismissLightBox,
  dismissMessage,
  switchToTab,
}