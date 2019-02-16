import { StyleSheet } from 'react-native'
import { Unit, screenHeight, isIPhoneX } from 'utils/ui'

export default StyleSheet.create({
  searchScreen: {
    width: Unit(750, false),
    height: screenHeight,
  },
  form: {
    position: 'relative',
    zIndex: 3,
    width: Unit(720, false),
    height: Unit(76),
    marginTop: isIPhoneX ? Unit(100) : Unit(60),
    marginLeft: Unit(30, false),
  },
  inputWrap: {
    width: Unit(620, false),
    height: Unit(80),
  },
  formInput: {
    width: Unit(620, false),
    height: Unit(76),
    paddingLeft: Unit(70),
    color: '#ffffffa0',
    fontSize: Unit(30),
    backgroundColor: 'transparent',
    borderRadius: Unit(10),
  },
  buttonSearch: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Unit(76),
    height: Unit(76),
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonClose: {
    position: 'absolute',
    top: 0,
    right: Unit(10),
    width: Unit(76, false),
    height: Unit(76),
    justifyContent: 'center',
    alignItems: 'center'
  },
  history: {
    position: 'relative',
    zIndex: 3,
    width: Unit(690, false),
    marginTop: Unit(30),
    marginLeft: Unit(30, false),
  },
  historyItem: {
    position: 'relative',
    width: Unit(690, false),
    height: Unit(80),
    borderBottomColor: "#ffffff30",
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  historyKeyword: {
    color: '#fff',
    fontSize: Unit(32),
    lineHeight: Unit(80),
    textAlign: 'left',
  },
  buttonSetKeyword: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: Unit(80),
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonClearHistory: {
    width: Unit(690, false),
    height: Unit(80),
  },
  buttonClearHistoryText: {
    color: '#ffffff70',
    fontSize: Unit(28),
    fontWeight: 'bold',
    lineHeight: Unit(80),
    textAlign: 'center'
  },
  blurView: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: Unit(750, false),
    height: screenHeight
  },
  fakeInput: {
    width: Unit(620, false),
    height: Unit(76),
    marginTop: isIPhoneX ? Unit(100) : Unit(60),
    marginLeft: Unit(30, false),
    backgroundColor: '#ffffff60',
    borderRadius: Unit(10),
  }
})