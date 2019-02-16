/**
 * @providesModule components/picker
 */

import React from 'react'
import styles from './styles'
import { View, Text, Picker, TouchableWithoutFeedback } from 'react-native'
import Router from 'helpers/router'

export default (props) => (
  <View style={styles.pickerView}>
    <View style={styles.content}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{props.title}</Text>
      </View>
      <View style={styles.pickerWrapper}>
        <Picker
          style={styles.picker}
          selectedValue={props.value}
          onValueChange={props.onChange}
        >
        {props.items.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
        </Picker>
      </View>
    </View>
    <TouchableWithoutFeedback onPress={() => Router.dismissLightBox()}>
      <View style={styles.mask}></View>
    </TouchableWithoutFeedback>
  </View>
)