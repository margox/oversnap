/**
 * @providesModule components/message
 */

import React from 'react'
import styles from './styles'
import { View, Text, TouchableOpacity } from 'react-native'
import { BlurView } from 'react-native-blur'

export default (props) => (
  <View style={styles.messageView}>
    <View style={[styles.content, props.backgroundColor ? { backgroundColor: props.backgroundColor, shadowColor: props.backgroundColor } : null]}>
      <View style={styles.titleView}><Text style={styles.title}>{props.title}</Text></View>
      {props.actionText ? (
        <View style={styles.actionButton}>
          <TouchableOpacity onPress={props.action}>
            <Text style={[styles.actionText, props.actionTextColor ? { color: props.actionTextColor } : null]}>{props.actionText}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
    <BlurView blurType="dark" style={styles.blurView}/>
  </View>
)