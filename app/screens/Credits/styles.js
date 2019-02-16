import { StyleSheet } from 'react-native'
import { Unit } from 'utils/ui'

export default StyleSheet.create({
  creditsScreen: {
    position: 'relative',
    width: Unit(750, false),
    flex: 1,
    backgroundColor: '#000'
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  iconWrapper: {
    width: Unit(200),
    marginTop: Unit(40),
    justifyContent: 'center',
    alignItems: 'center'
  },
  creditTextView: {
    width: Unit(690),
    marginTop: Unit(20),
    marginBottom: Unit(40),
  },
  creditText: {
    color: '#ffffff60',
    fontSize: Unit(26),
    fontWeight: 'bold',
    lineHeight: Unit(32),
    textAlign: 'center'
  },
  optionLabel: {
    lineHeight: Unit(96)
  }
})