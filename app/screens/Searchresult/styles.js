import { StyleSheet } from 'react-native'
import { Unit, isIPhoneX } from 'utils/ui'

export default StyleSheet.create({
  searchResultScreen: {
    flex: 1,
    backgroundColor: '#000'
  },
  photoListWrap: {
    flex: 1,
  },
  photoList: {
    flex: 1
  },
  photoListContent: {
    paddingBottom: isIPhoneX ? Unit(45) : Unit(25),
  }
})