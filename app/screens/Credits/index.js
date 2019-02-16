/**
 * @providesModule screens/credits
 */

import React from 'react'
import styles from './styles'
import Screen from 'decorators/screen'
import { StatusBar, ScrollView, View, Text } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
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
        caption: language.creditListCaption,
        items: [
          {
            type: 'entry',
            label: 'React Native',
            link: 'https://facebook.github.io/react-native/'
          }, {
            type: 'entry',
            label: 'Unsplash',
            link: 'https://unsplash.com'
          }, {
            type: 'entry',
            label: 'React Native Navigation',
            link: 'https://github.com/wix/react-native-navigation'
          }, {
            type: 'entry',
            label: 'React Native Blur',
            link: 'https://github.com/react-native-community/react-native-blur'
          }, {
            type: 'entry',
            label: 'React Native Splash Screen',
            link: 'https://github.com/crazycodeboy/react-native-splash-screen'
          }, {
            type: 'entry',
            label: 'React Native Swiper',
            link: 'https://github.com/leecade/react-native-swiper'
          }, {
            type: 'entry',
            label: 'React Native Vector Icons',
            link: 'https://github.com/oblador/react-native-vector-icons'
          }, {
            type: 'entry',
            label: 'Material Design Icons',
            link: 'https://materialdesignicons.com/'
          }, {
            type: 'entry',
            label: 'Feather Icons',
            link: 'https://feathericons.com/'
          }
        ]
      }
    ]

    return (
      <View style={styles.creditsScreen}>
        <StatusBar hidden={false} barStyle="light-content"/>
        <NavBar leftComponent="back" title={language.credits} />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.iconWrapper}>
            <Icon name="heart" size={72} color="#f15151" />
          </View>
          <View style={styles.creditTextView}>
            <Text style={styles.creditText}>{language.creditText}</Text>
          </View>
          <Options options={options}/>
          {/*<View style={styles.creditTextView}>
            <Text style={styles.creditText}>{language.creditThankYou}</Text>
          </View>*/}
        </ScrollView>
      </View>
    )

  }

}