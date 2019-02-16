import { StyleSheet } from 'react-native'
import { Unit } from 'utils/ui'

export default StyleSheet.create({
  settingsScreen: {
    position: 'relative',
    width: Unit(750, false),
    flex: 1,
    backgroundColor: '#000'
  },
  content: {
    flex: 1
  },
  optionLabel: {
    lineHeight: Unit(96)
  }
})