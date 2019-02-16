/**
 * @providesModule components/options
 */

import React from 'react'
import { View, Text, Switch, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import baseStyles from 'configs/styles'
import Router from 'helpers/router'
import styles from './styles.js'

const generateOptionItem = (option, index) => {

  switch (option.type) {

    case 'entry':
      return (
        <TouchableOpacity key={index} onPress={() => {
          option.link && Router.navigateTo(option.link)
          option.onPress && option.onPress()
        }}>
          <View style={[styles.optionItem, index === 0 ? {borderTopWidth: 0} : null]}>
            {option.leftIcon ? (
              <View style={styles.optionLeftIcon}>
                <Icon name={option.leftIcon} size={24} color={option.leftIconColor || '#ffffff90'} />
              </View>
            ) : null}
            <View style={styles.optionsLabel}>
              <Text style={[styles.optionLabelText, option.labelColor ? {color: option.labelColor} : null]}>{option.label}</Text>
            </View>
            {option.rightIcon !== null ? (
              <View style={styles.optionRightIcon}>
                <Icon name={option.rightIcon || 'chevron-right'} size={32} color={option.rightIconColor || '#ffffff40'}/>
              </View>
            ): null}
          </View>
        </TouchableOpacity>
      )
    break

    case 'label':
      return (
        <TouchableOpacity key={index} onPress={() => {
          option.link && Router.navigateTo(option.link)
          option.onPress && option.onPress()
        }}>
          <View style={[styles.optionItem, index === 0 ? {borderTopWidth: 0} : null]}>
            {option.leftIcon ? (
              <View style={styles.optionLeftIcon}>
                <Icon name={option.leftIcon} size={24} color={option.leftIconColor || '#ffffff90'} />
              </View>
            ) : null}
            <View style={styles.optionsLabel}>
              <Text style={[styles.optionLabelText, option.labelColor ? {color: option.labelColor} : null]}>{option.label}</Text>
            </View>
            <View style={styles.optionValue}>
              <Text style={[styles.optionValueText, {color: option.valueColor || '#ffffff90'}]}>{option.value}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    break

    case 'switch':
      return (
        <View style={[styles.optionItem, index === 0 ? {borderTopWidth: 0} : null]}>
          {option.leftIcon ? (
            <View style={styles.optionLeftIcon}>
              <Icon name={option.leftIcon} size={24} color={option.leftIconColor || '#ffffff90'} />
            </View>
          ) : nul}
          <View style={styles.optionsLabel}>
            <Text style={[styles.optionLabelText, option.labelColor ? {color: option.labelColor} : null]}>{option.label}</Text>
          </View>
          <View style={styles.optionSwitch}>
            <Switch value={option.value} disabled={option.disabled} onTintColor={baseStyles.colors.primary} onValueChange={option.onChange} />
          </View>
        </View>
      )
    break

    case 'picker':
      const selectedItem = option.items.find(({ value }) => value === option.value)
      const selectedItemLabel = selectedItem ? selectedItem.label : option.value
      return (
        <TouchableOpacity key={index} onPress={() => {
          Router.showPicker({
            title: option.title,
            items: option.items,
            value: option.value,
            onChange: option.onChange
          })
          option.onPress && option.onPress()
        }}>
          <View style={[styles.optionItem, index === 0 ? {borderTopWidth: 0} : null]}>
            {option.leftIcon ? (
              <View style={styles.optionLeftIcon}>
                <Icon name={option.leftIcon} size={24} color={option.leftIconColor || '#ffffff90'} />
              </View>
            ) : null}
            <View style={styles.optionsLabel}>
              <Text style={[styles.optionLabelText, option.labelColor ? {color: option.labelColor} : null]}>{option.label}</Text>
            </View>
            <View style={styles.optionValue}>
              <Text style={[styles.optionValueText, {color: option.valueColor || '#ffffff90'}]}>{selectedItemLabel}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    break

  }

}

export default ({ options }) => (
  <View style={styles.options}>
    {options.map((section, sectionIndex) => (
      <View style={styles.section} key={sectionIndex}>
        {section.caption ? (
          <View style={styles.sectionCaption}>
            <Text style={styles.sectionCaptionText}>{section.caption}</Text>
          </View>
        ) : null}
        {section.items.map(generateOptionItem)}
      </View>
    ))}
  </View>
)