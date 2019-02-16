import { StyleSheet } from 'react-native'
import { Unit, screenHeight, isIPhoneX } from 'utils/ui'

export default StyleSheet.create({
  pickerView: {
    position: 'relative',
    width: Unit(750, false),
    height: screenHeight,
  },
  mask: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: '50%',
    transform: [{
      translateX: Unit(-355)
    }],
    width: Unit(710),
    height: screenHeight,
  },
  content: {
    position: 'absolute',
    zIndex: 2,
    bottom: Unit(-4),
    left: Unit(20),
    width: Unit(710),
    paddingBottom: isIPhoneX ? Unit(90) : Unit(50),
    backgroundColor: '#fff',
    borderTopLeftRadius: Unit(10),
    borderTopRightRadius: Unit(10),
  },
  title: {
    paddingLeft: Unit(30),
    paddingRight: Unit(30),
    paddingTop: Unit(30),
    paddingBottom: Unit(30),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#d1d5d9'
  },
  titleText: {
    color: '#919599',
    fontSize: Unit(28),
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: Unit(48)
  },
})