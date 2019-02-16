import { StyleSheet } from 'react-native'
import { Unit } from 'utils/ui'

export default StyleSheet.create({
  options: {
    width: Unit(710, false),
    marginLeft: Unit(20, false),
    backgroundColor: '#000',
  },
  section: {
    marginBottom: Unit(40),
    backgroundColor: '#000',
  },
  sectionCaption: {
    height: Unit(80),
    paddingLeft: Unit(30),
  },
  sectionCaptionText: {
    color: '#ffffff60',
    fontSize: Unit(30),
    fontWeight: 'bold',
    lineHeight: Unit(80),
  },
  optionItem: {
    position: 'relative',
    width: Unit(710, false),
    height: Unit(96),
    marginBottom: Unit(6),
    paddingLeft: Unit(20),
    backgroundColor: '#ffffff15',
    borderRadius: Unit(10),
    flexDirection: 'row'
  },
  optionLeftIcon: {
    width: Unit(96),
    height: Unit(86),
    marginTop: Unit(10),
    marginLeft: Unit(-20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionLabel: {
    flex: 1,
  },
  optionLabelText: {
    color: '#ffffff90',
    fontSize: Unit(32),
    lineHeight: Unit(96)
  },
  optionValue: {
    position: 'absolute',
    top: 0,
    right: Unit(30),
    height: Unit(96),
  },
  optionValueText: {
    fontSize: Unit(32),
    lineHeight: Unit(96)
  },
  optionRightIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: Unit(96),
    height: Unit(86),
    marginTop: Unit(11),
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionSwitch: {
    position: 'absolute',
    top: 0,
    right: Unit(30),
    height: Unit(96),
    justifyContent: 'center',
    alignItems: 'center',
  }
})