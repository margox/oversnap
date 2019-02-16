import { StyleSheet } from 'react-native'
import { Unit, isIPhoneX } from 'utils/ui'

const headerHeight = isIPhoneX ? Unit(170) : Unit(140)

export default StyleSheet.create({
  photoListWrapper: {
    flex: 1,
    overflow: 'hidden'
  },
  photoList: {
    flex: 1,
  },
  listHolderWrapper: {
    flex: 1,
  },
  photoListContent: {
    paddingTop: headerHeight
  }
})