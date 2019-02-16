import { StyleSheet } from 'react-native'
import { Unit } from 'utils/ui'

export default StyleSheet.create({
  aboutScreen: {
    position: 'relative',
    width: Unit(750, false),
    flex: 1,
    backgroundColor: '#000'
  },
  content: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
  },
  appLogoWrapper: {
    width: Unit(200),
    height: Unit(200),
    marginTop: Unit(100),
    borderRadius: Unit(40),
    backgroundColor: '#ffffff20'
  },
  appLogo: {
    width: Unit(120),
    height: Unit(120),
    marginTop: Unit(40),
    marginLeft: Unit(40),
    borderStyle: 'solid',
    borderWidth: Unit(16),
    borderColor: '#fff',
    borderRadius: Unit(60),
  },
  appName: {
    marginTop: Unit(40),
  },
  appNameText: {
    color: '#fff',
    fontSize: Unit(40),
    fontWeight: 'bold',
    textAlign: 'center'
  },
  appDescription: {
    width: Unit(670),
    marginTop: Unit(20),
  },
  appDescriptionText: {
    color: '#ffffff50',
    fontSize: Unit(30),
    textAlign: 'center'
  },
  options: {
    marginTop: Unit(40),
    marginBottom: Unit(40)
  }
})