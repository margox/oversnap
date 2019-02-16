import { StyleSheet } from 'react-native'
import { Unit, isIPhoneX } from 'utils/ui'

const headerHeight = isIPhoneX ? Unit(170) : Unit(140)

export default StyleSheet.create({
  indexScreen: {
    position: 'relative',
    flex: 1,
    width: Unit(750, false),
    backgroundColor: '#000'
  },
  headerBar: {
    position: 'absolute',
    zIndex: 5,
    top: 0,
    left: 0,
    width: Unit(750, false),
    height: headerHeight
  },
  navBar: {
    backgroundColor: '#000',
  },
  indexTitleWrapper: {
    width: Unit(500, false),
    height: Unit(60),
    overflow: 'hidden',
  },
  indexTitleTextView: {
    height: Unit(120),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  indexTitleText: {
    color: '#fff',
    fontSize: Unit(32),
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: Unit(60),
    textShadowColor: '#00000050',
    textShadowOffset: {
      width:1,
      height: 1
    },
    textShadowRadius: 3
  },
  headerShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Unit(750, false),
    height: headerHeight
  },
  headerButton: {
    position: 'relative',
    zIndex: 3,
    width: Unit(70),
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerButtonIcon: {
    width: Unit(36),
    height: Unit(36),
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoListWrapper: {
    flex: 1,
    overflow: 'hidden'
  }
})