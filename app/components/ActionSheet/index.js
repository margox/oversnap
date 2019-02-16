/**
 * @providesModule components/actionsheet
 */

import React from 'react'
import styles from './styles'
import { View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { VibrancyView } from 'react-native-blur'
import Router from 'helpers/router'
import { Unit } from 'utils/ui'
import language from 'language'

export default (props) => (
  <View style={styles.actionSheet}>
    <View style={styles.content}>
      <View style={styles.contentInner}>
        <View style={styles.buttons}>
          {props.title ? (
            <View style={styles.title}>
              <Text style={styles.titleText}>{props.title}</Text>
            </View>
          ) : null}
          {props.buttons.map((button, index) => (
            <TouchableOpacity key={index} onPress={() => {
              !button.preventDismiss && Router.dismissLightBox()
              button.onPress && button.onPress()
            }}>
              <View style={[styles.button, index === 0 ? {borderTopWidth: 0} : null]}>
                <Text style={[styles.buttonText, button.textColor ? {color: button.textColor} : null]}>{button.text}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={() => {Router.dismissLightBox();props.onCancel && props.onCancel()}}>
          <View style={styles.buttonCancel}>
              <Text style={[styles.buttonCancelText, props.cancelTextColor ? {color: props.cancelTextColor} : null]}>{props.cancelText || language.cancel}</Text>
            </View>
        </TouchableOpacity>
      </View>
      <VibrancyView blurType="xlight" style={styles.blurView}>
        {props.title ? <View style={[styles.hairline, {height: Unit(78)}]} /> : null}
        {props.buttons.map((button, index) => <View key={index} style={[styles.hairline, {height: Unit(120)}]}/>)}
      </VibrancyView>
    </View>
    <TouchableWithoutFeedback onPress={() => Router.dismissLightBox()}>
      <View style={styles.mask}></View>
    </TouchableWithoutFeedback>
  </View>
)