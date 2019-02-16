import { StyleSheet } from 'react-native'
import { Unit, isIPhoneX } from '../../utils/ui'

export const navBarHeight = isIPhoneX ? Unit(170) : Unit(140)

export default StyleSheet.create({
  navBar: {
    position: 'relative',
    zIndex: 5,
    width: Unit(750, false),
    height: navBarHeight,
    backgroundColor: '#000'
  },
  navBarContent: {
    position: 'absolute',
    zIndex: 2,
    top: isIPhoneX ? Unit(80) : Unit(50),
    left: Unit(15, false),
    width: Unit(720, false),
    height: Unit(80),
  },
  leftComponent: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    bottom: 0,
    height: Unit(80),
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightComponent: {
    position: 'absolute',
    zIndex: 2,
    right: 0,
    bottom: 0,
    height: Unit(80),
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonBack: {
    width: Unit(80),
    height: Unit(80),
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    position: 'absolute',
    bottom: 0,
    left: Unit(110, false),
    width: Unit(500, false),
    height: Unit(80),
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    color: '#fff',
    fontSize: Unit(34),
    fontWeight: 'bold',
    lineHeight: Unit(80),
    textAlign: 'center'
  },
  blurView: {
    flex: 1,
    position: 'relative',
    zIndex: 1
  }
})