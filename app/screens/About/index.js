/**
 * @providesModule screens/about
 */

import React from 'react'
import styles from './styles'
import { StatusBar, ScrollView, View, Text } from 'react-native'
import NavBar from 'components/navbar'
import Options from 'components/options'
import language from 'language'

export default class SearchScreen extends React.Component {

  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: '#000'
  }

  state = {}

  render () {

    const options = [
      {
        items: [
          {
            type: 'entry',
            leftIcon: 'mail-ru',
            leftIconColor: '#0984e3',
            label: language.contactAuthor,
            link: 'contact'
          // }, {
          //   type: 'entry',
          //   leftIcon: 'heart',
          //   leftIconColor: '#f15151',
          //   label: language.credits,
          //   link: 'credits'
          }
        ]
      }
    ]

    return (
      <View style={styles.aboutScreen}>
        <StatusBar hidden={false} barStyle="light-content"/>
        <NavBar leftComponent="back" title={language.about} />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.header}>
            <View style={styles.appLogoWrapper}>
              <View style={styles.appLogo} />
            </View>
            <View style={styles.appName}>
              <Text style={styles.appNameText}>{language.appName}</Text>
            </View>
            <View style={styles.appDescription}>
              <Text style={styles.appDescriptionText}>{language.appDescriptionText}</Text>
            </View>
          </View>
          <View style={styles.options}>
            <Options options={options}/>
          </View>
        </ScrollView>
      </View>
    )

  }

}