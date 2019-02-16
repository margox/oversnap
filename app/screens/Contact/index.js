/**
 * @providesModule screens/contact
 */

import React from 'react'
import styles from './styles'
import Screen from 'decorators/screen'
import { StatusBar, View, Linking } from 'react-native'
import NavBar from 'components/navbar'
import Options from 'components/options'
import language from 'language'

export default class SearchScreen extends Screen {

  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: '#000'
  }

  render () {

    const options = [
      {
        items: [
          {
            type: 'entry',
            leftIcon: 'web',
            leftIconColor: '#0984e3',
            label: 'Margox\'s Blog',
            link: 'https://margox.cn'
          }, {
            type: 'entry',
            leftIcon: 'dribbble',
            leftIconColor: '#ea4c89',
            label: 'Dribbble',
            link: 'https://dribbble.com/margox'
          }, {
            type: 'entry',
            leftIcon: 'github-circle',
            leftIconColor: '#54595e',
            label: 'Github',
            link: 'https://github.com/margox'
          }, {
            type: 'entry',
            leftIcon: 'mail-ru',
            leftIconColor: '#ef1734',
            label: 'Sina Weibo',
            link: 'https://m.weibo.cn/u/1726667734'
          }, {
            type: 'entry',
            leftIcon: 'email-outline',
            leftIconColor: '#0984e3',
            label: 'Mail to margox@foxmail.com',
            onPress: () => Linking.openURL('mailto:margox@foxmail.com')
          },
        ]
      }
    ]

    return (
      <View style={styles.contactScreen}>
        <StatusBar hidden={false} barStyle="light-content"/>
        <NavBar leftComponent="back" title={language.contactAuthor} />
        <Options options={options}/>
      </View>
    )

  }

}