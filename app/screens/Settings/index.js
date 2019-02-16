/**
 * @providesModule screens/settings
 */

import React from 'react'
import styles from './styles'
import Screen from 'decorators/screen'
import { StatusBar, ScrollView, View } from 'react-native'
import Router from 'helpers/router'
import NavBar from 'components/navbar'
import Options from 'components/options'
import language from 'language'
import CacheManager from 'react-native-clear-app-cache'

export default class SearchScreen extends Screen {

  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: '#000'
  }

  state = {
    cacheSize: '-',
    cacheClearing: false
  }

  componentDidMount () {

    CacheManager.getAppCacheSize((value, unit) => {
      this.setState({
        cacheSize: `${value}${unit}`
      })
    })

  }

  clearAppCache = () => {

    if (this.state.cacheClearing) {
      return false
    }

    Router.showAlert({
      title: language.sureToClearCache,
      buttons: [
        {
          text: language.confirm,
          onPress: () => {
            this.setState({
              cacheClearing: true,
            })
            CacheManager.clearAppCache(() => {
              this.setState({
                cacheSize: '0KB',
                cacheClearing: false
              }, () => {
                Router.showMessage({
                  title: language.cacheCleared
                })
              })
            })
          },
          style: 'cancel'
        }, {
          text: language.cancel,
        }
      ]
    })

  }

  render () {

    const { cacheSize, cacheClearing } = this.state

    const options = [
      {
        items: [
          {
            type: 'entry',
            label: language.about,
            link: 'about'
          }, {
            type: 'label',
            label: language.clearCache,
            value: cacheClearing ? language.cacheClearing : cacheSize,
            valueColor: cacheClearing ? '#ffffff40' : null,
            onPress: this.clearAppCache
          }
        ]
      }
    ]

    return (
      <View style={styles.settingsScreen}>
        <StatusBar hidden={false} barStyle="light-content"/>
        <NavBar hidden={false} leftComponent="back" title={language.settings} />
        <ScrollView style={styles.content}>
          <Options options={options}/>
        </ScrollView>
      </View>
    )

  }

}