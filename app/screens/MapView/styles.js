import { StyleSheet } from 'react-native'
import { Unit, isIPhoneX, screenHeight } from 'utils/ui'

export default StyleSheet.create({
  mapViewScreen: {
    ...StyleSheet.absoluteFillObject,
    position: 'relative',
    width: Unit(750, false),
    height: screenHeight,
    backgroundColor: '#fff'
  },
  mapTypeSwitcher: {
    position: 'absolute',
    zIndex: 3,
    top: isIPhoneX ? Unit(80) : Unit(20),
    left: '50%',
    transform: [
      {
        translateX: Unit(-200)
      }
    ],
    width: Unit(400),
    height: Unit(80),
    overflow: 'hidden',
    flexDirection: 'row',
    borderRadius: Unit(40)
  },
  buttonSwitchMapType: {
    width: Unit(200),
    height: Unit(80)
  },
  buttonSwitchMapTypeText: {
    color: '#fff',
    fontSize: Unit(28),
    textAlign: 'center',
    lineHeight: Unit(80)
  },
  roundButtonLeft: {
    position: 'absolute',
    zIndex: 3,
    top: isIPhoneX ? Unit(80) : Unit(20),
    left: Unit(20),
    width: Unit(80),
    height: Unit(80),
  },
  roundButtonRight: {
    position: 'absolute',
    zIndex: 3,
    top: isIPhoneX ? Unit(80) : Unit(20),
    right: Unit(20),
    width: Unit(80),
    height: Unit(80),
  },
  roundButton: {
    width: Unit(80),
    height: Unit(80),
    borderRadius: Unit(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapView: {
    ...StyleSheet.absoluteFillObject,
    flex: 1
  },
  locationMarker: {
    
  }
})