import { StyleSheet } from 'react-native'
import { Unit, screenHeight, isIPhoneX } from 'utils/ui'
import baseStyles from 'configs/styles'

export default StyleSheet.create({
  dialog: {
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
    paddingBottom: Unit(20),
    overflow: 'hidden',
    borderRadius: Unit(8),
  },
  contentInner: {
    position: 'relative',
    zIndex: 2
  },
  iconWrapper: {
    width: Unit(300, false),
    height: Unit(150),
    marginTop: Unit(50),
    marginLeft: Unit(205, false),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textView: {
    width: Unit(650, false),
    marginLeft: Unit(30, false),
    marginTop: Unit(20),
    marginBottom: Unit(40),
  },
  text: {
    color: '#01050690',
    fontSize: Unit(30),
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: Unit(48)
  },
  button: {
    width: Unit(670, false),
    marginLeft: Unit(20, false),
  },
  buttonConfirm: {
    height: Unit(96),
    marginBottom: Unit(20),
    backgroundColor: baseStyles.colors.primary,
    borderRadius: Unit(4)
  },
  buttonConfirmText: {
    color: '#fff',
    fontSize: Unit(32),
    fontWeight: "800",
    textAlign: 'center',
    lineHeight: Unit(96)
  },
  buttonCancel: {
    height: Unit(96),
    backgroundColor: '#fff',
  },
  buttonCancelText: {
    color: '#01050990',
    fontSize: Unit(32),
    fontWeight: "800",
    textAlign: 'center',
    lineHeight: Unit(96)
  },
  blurView: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    width: Unit(710),
    borderRadius: Unit(8),
  }
})