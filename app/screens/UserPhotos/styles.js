import { StyleSheet } from 'react-native'
import { Unit, isIPhoneX } from 'utils/ui'

export default StyleSheet.create({
  userPhotosScreen: {
    width: Unit(750, false),
    flex: 1,
    backgroundColor: '#000'
  },
  button: {
    width: Unit(80),
    height: Unit(80),
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatarImage: {
    width: Unit(60),
    height: Unit(60),
    borderRadius: Unit(30)
  },
  photoListWrap: {
    flex: 1,
  },
  photoList: {
    flex: 1,
  },
  photoListContent: {
    paddingBottom: isIPhoneX ? Unit(45) : Unit(25),
  }
})