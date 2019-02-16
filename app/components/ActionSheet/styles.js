import { StyleSheet } from 'react-native'
import { Unit, screenHeight, isIPhoneX } from 'utils/ui'

export default StyleSheet.create({
  actionSheet: {
    position: 'relative',
    width: Unit(750, false),
    height: screenHeight,
  },
  mask: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: Unit(750, false),
    height: screenHeight,
  },
  content: {
    position: 'absolute',
    zIndex: 2,
    bottom: isIPhoneX ? Unit(50, false) : Unit(20, false),
    left: '50%',
    transform: [{
      translateX: Unit(-355)
    }],
    width: Unit(710),
    overflow: 'hidden',
    borderRadius: Unit(30)
  },
  contentInner: {
    position: 'relative',
    zIndex: 2,
  },
  blurView: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    width: Unit(710)
  },
  buttons: {
    overflow: 'hidden',
  },
  title: {
    paddingLeft: Unit(30),
    paddingRight: Unit(30),
    paddingTop: Unit(20),
    paddingBottom: Unit(20)
  },
  titleText: {
    color: '#8f8f8f',
    fontSize: Unit(26),
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: Unit(38)
  },
  button: {
    height: Unit(120),
  },
  buttonText: {
    color: '#007AFF',
    fontSize: Unit(40),
    textAlign: 'center',
    lineHeight: Unit(120)
  },
  buttonCancel: {
    height: Unit(120),
  },
  buttonCancelText: {
    color: '#FF3B30',
    fontSize: Unit(40),
    textAlign: 'center',
    lineHeight: Unit(120)
  },
  hairline: {
    borderBottomColor: '#ffffff90',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
})