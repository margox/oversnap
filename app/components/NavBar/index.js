/**
 * @providesModule components/navbar
 */

import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Router from 'helpers/router'
import styles from './styles.js'

export const navBarHeight = styles.navBarHeight

const defaultProps = {
  barStyle: 'dark',
  translucent: true
}

export default (props) => {

  const componentProps = { ...defaultProps, ...props }
  const contentColor = componentProps.barStyle === 'dark' ? '#fff' : '#515559'

  return (
    <View style={[styles.navBar, componentProps.style]}>
      <View style={styles.navBarContent}>
        <View style={styles.leftComponent}>
        {componentProps.leftComponent === 'back' ? (
          <View style={styles.buttonBack}>
            <TouchableOpacity onPress={Router.navigateBack}>
              <Icon name="arrow-left" size={20} color={contentColor} />
            </TouchableOpacity>
          </View>
        ) : componentProps.leftComponent}
        </View>
        {componentProps.title ? (
          <View style={styles.title}>
            {typeof componentProps.title === 'string' ? (
              <Text ellipsizeMode="middle" numberOfLines={1} style={[styles.titleText, {color: contentColor}]}>{componentProps.title}</Text>
            ) : componentProps.title}
          </View>
        ) : null}
        <View style={styles.rightComponent}>
          {componentProps.rightComponent || null}
        </View>
      </View>
      {componentProps.addonComponent || null}
    </View>
  )

}