import { StyleSheet } from 'react-native'
import { Unit, isIPad, screenWidthPixel } from 'utils/ui'

const cellWidth = isIPad ? Unit(screenWidthPixel / 2 - 6) : Unit(744)
const cellMargin = Unit(3)//isIPad ? Unit(3) : 0

export default StyleSheet.create({
  photoCell: {
    width: cellWidth,
    height: Unit(600),
    marginRight: cellMargin,
    marginBottom: Unit(6),
    marginLeft: cellMargin,
    overflow: 'hidden',
    backgroundColor: '#000',
  },
  photoImageWrapper: {
    position: 'relative',
    zIndex: 2,
  },
  photoImage: {
    width: cellWidth,
    height: Unit(600),
  },
  backgroundHolder: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: cellWidth,
    height: Unit(600),
    opacity: .2
  },
  infoPanel: {
    position: 'absolute',
    zIndex: 2,
    bottom: 0,
    left: 0,
    width: cellWidth,
    height: Unit(100),
  },
  userAvatar: {
    width: Unit(64),
    height: Unit(64),
    marginTop: Unit(18),
    marginLeft: Unit(20),
    backgroundColor: '#333',
    borderColor: '#000',
    borderWidth: Unit(4),
    borderRadius: Unit(32),
    shadowColor: '#000',
    shadowOffset: {
      width:1,
      height: 1
    },
    shadowRadius: 3,
  },
  userName: {
    position: 'absolute',
    top: Unit(19),
    left: Unit(100),
    color: '#fff',
    fontSize: Unit(28),
    fontWeight: 'bold',
    lineHeight: Unit(64),
    textShadowColor: '#00000050',
    textShadowOffset: {
      width:1,
      height: 1
    },
    textShadowRadius: 3
  },
  userAccount: {
    position: 'absolute',
    top: Unit(54),
    left: Unit(100),
    color: '#fff',
    fontSize: Unit(22),
    fontWeight: 'bold'
  },
  likeButton: {
    position: 'absolute',
    top: Unit(21),
    right: Unit(20),
    width: Unit(64),
    height: Unit(64),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Unit(10)
  },
  likeButtonIcon: {
    textShadowColor: '#00000050',
    textShadowOffset: {
      width:1,
      height: 1
    },
    textShadowRadius: 3
  }
})