/**
 * @providesModule components/listholder
 */

import React from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './styles.js'

export default ({ type, text }) => {

  if (type === 'searching') {

    return (
      <View style={styles.listHolder}>
        <View style={styles.iconWrapper}>
          <ActivityIndicator size="large" color="#ffffff90" />
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
    )

  } else if (type === 'no-result') {

    return (
      <View style={styles.listHolder}>
        <View style={styles.iconWrapper}>
          <Icon name="camera" size={64} color="#ffffff90" />
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
    )

  } else if (type === 'loading') {

    return (
      <View style={styles.listHolder}>
        <View style={styles.iconWrapper}>
          <ActivityIndicator size="large" color="#ffffff90" />
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
    )

  } else if (type === 'no-photo') {

    return (
      <View style={styles.listHolder}>
        <View style={styles.iconWrapper}>
          <Icon name="camera" size={64} color="#ffffff50" />
        </View>
        <Text style={styles.text}>{text}</Text>
      </View>
    )

  }

}