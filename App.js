import React from 'react'
import { Linking, Platform } from 'react-native'
import { Navigation } from 'react-native-navigation'
import Router from 'helpers/router'
import Store from 'helpers/store'
import PhotoController from 'controllers/photo'
import SplashScreen from 'react-native-splash-screen'
import { registerScreens } from 'app/screens'

// redefine global.console
if (!__DEV__) {
  global.console = {
    info: () => {},
    log: () => {},
    warn: () => {},
    debug: () => {},
    error: () => {},
  }
}

// Todos
// 1.优化图片分享
// 2.壁纸预览功能
// 3.下拉刷新功能

registerScreens()

const LaunchApp = async (ignoreUnauthorized = false) => {

  const cachedPhotos = await Store.getLocalData('OVERSHAP_CACHED_PHOTOS')
  const favoritePhotos = await PhotoController.getFavoritePhotos(true)

  SplashScreen.hide()

  Navigation.startSingleScreenApp({
    screen: {
      screen: 'index'
    },
    passProps: {
      initialPhotos: cachedPhotos && cachedPhotos.length ? cachedPhotos : []
    },
    appStyle: {
      keepStyleAcrossPush: false
    },
    animationType: 'fade'
  })

}

LaunchApp()