import { StyleSheet } from 'react-native'
import { Unit, isIPhoneX } from 'utils/ui'

export default StyleSheet.create({
  messageView: {
    position: 'relative',
    zIndex: 9999,
    width: Unit(710),
  },
  content: {
    position: 'relative',
    zIndex: 2,
    width: Unit(710),
    height: Unit(120),
    marginTop: isIPhoneX ? Unit(80) : Unit(50),
    borderRadius: Unit(30),
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: Unit(20),
    shadowOffset: {
      x: 0,
      y: Unit(10)
    }
  },
  titleView: {
    width: Unit(500),
    marginLeft: Unit(30),
    height: Unit(120),
  },
  title: {
    color: '#fff',
    fontSize: Unit(30),
    lineHeight: Unit(120)
  },
  actionButton: {
    position: 'absolute',
    top: Unit(30),
    right: Unit(30),
    height: Unit(60)
  },
  actionText: {
    color: '#fff',
    fontSize: Unit(30),
    fontWeight: 'bold',
    lineHeight: Unit(60)
  },
  blurView: {
    position: 'absolute',
    zIndex: 1,
    top: isIPhoneX ? Unit(80) : Unit(50),
    width: Unit(710),
    height: Unit(120),
    borderRadius: Unit(30),
  }
})