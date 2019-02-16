/**
 * @providesModule components/dialog
 */

import React from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { BlurView } from 'react-native-blur'
import Router from 'helpers/router'
import language from 'language'

export default (props) => (
  <View style={styles.dialog}>
    <View style={styles.content}>
      <View style={styles.contentInner}>
        <View style={styles.iconWrapper}>
          <Icon name={props.iconName} size={72} color="#01050960" />
        </View>
        <View style={styles.textView}>
          <Text style={styles.text}>{props.text}</Text>
        </View>
        {props.showConfirmButton ? (
          <TouchableOpacity onPress={() => {Router.dismissLightBox();props.onConfirm && props.onConfirm()}}>
            <View style={[styles.button, styles.buttonConfirm]}>
              <Text style={styles.buttonConfirmText}>{props.confirmText || language.confirm}</Text>
            </View>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity onPress={() => {Router.dismissLightBox();props.onCancel && props.onCancel()}}>
          <View style={[styles.button, styles.buttonCancel]}>
            <Text style={styles.buttonCancelText}>{props.cancelText || language.cancel}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <BlurView blurType="xlight" style={styles.blurView}/>
    </View>
    <TouchableWithoutFeedback onPress={() => Router.dismissLightBox()}>
      <View style={styles.mask}></View>
    </TouchableWithoutFeedback>
  </View>
)