import { StyleSheet } from 'react-native'
import { Unit, screenHeight, isIPhoneX } from 'utils/ui'

export default StyleSheet.create({
  photoScreen: {
    flex: 1,
    backgroundColor: '#000'
  },
  gestureBackHandler: {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    bottom: 0,
    left: 0,
    width: 10
  },
  header: {
    position: 'absolute',
    zIndex: 4,
    left: 0,
    top: 0,
    width: Unit(750, false),
    height: isIPhoneX ? Unit(160) : Unit(130)
  },
  headerContent: {
    position: 'absolute',
    zIndex: 2,
    left: 0,
    bottom: Unit(10),
    width: Unit(750, false),
    height: Unit(80)
  },
  headerBackground: {
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    left: 0,
    width: Unit(750, false),
    height: Unit(200)
  },
  buttonGoBack: {
    width: Unit(60),
    height: Unit(80),
    marginLeft: Unit(10),
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerButtons: {
    position: 'absolute',
    top: 0,
    right: Unit(10),
    width: Unit(260),
    height: Unit(80),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButton: {
    width: Unit(60),
    height: Unit(80),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: Unit(750, false),
    height: Unit(150)
  },
  pageLoading: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pageLoadingImage: {
    width: Unit(128),
    height: Unit(128),
  },
  photoImageWrapper: {
    position: 'relative',
    zIndex: 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000'
  },
  defaultPhotoImage: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    left: 0
  },
  photoImage: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
  },
  photoInfo: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: Unit(750, false),
    height: screenHeight
  },
  buttonClosePhotoInfo: {
    position: 'absolute',
    zIndex: 3,
    top: isIPhoneX ? Unit(70) : Unit(40),
    right: Unit(10),
    width: Unit(60),
    height: Unit(80),
    justifyContent: 'center',
    alignItems: 'center'
  },
  photoInfoContent: {
    position: 'relative',
    zIndex: 2,
    width: Unit(750, false),
  },
  photoMetas: {
    marginTop: isIPhoneX ? Unit(140) : Unit(100),
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  photoMeta: {
    position: 'relative',
    width: Unit(690, false),
    marginTop: Unit(30),
    marginLeft: Unit(30, false),
    paddingBottom: Unit(30),
    flexDirection: 'column',
    borderBottomColor: '#ffffff20',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  photoMetaName: {
    color: '#ffffff50',
    fontSize: Unit(24),
    fontWeight: 'bold'
  },
  photoMetaValue: {
    paddingTop: Unit(10),
    color: '#ffffffe0',
    fontSize: Unit(42),
    fontWeight: '700'
  },
  buttonViewPhotoPosition: {
    position: 'absolute',
    zIndex: 2,
    top: Unit(-70),
    right: Unit(-10, false),
    width: Unit(690, false),
    height: Unit(80),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  photoInfoBlurView: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    width: Unit(750, false),
    height: screenHeight
  },
  footer: {
    position: 'absolute',
    zIndex: 6,
    bottom: 0,
    width: Unit(750, false),
    height: isIPhoneX ? Unit(190) : Unit(150),
  },
  footerContent: {
    position: 'relative',
    zIndex: 2,
    width: Unit(750, false),
    height: Unit(160)
  },
  userAvatar: {
    width: Unit(100),
    height: Unit(100),
    marginLeft: Unit(20),
    marginTop: Unit(30),
    backgroundColor: '#000',
    borderRadius: Unit(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  userAvatarImage: {
    width: Unit(90),
    height: Unit(90),
    borderRadius: Unit(45),
  },
  userMeta: {
    position: 'absolute',
    top: Unit(45),
    left: Unit(140),
    width: Unit(320),
    height: Unit(80),
    flexDirection: 'column'
  },
  userName: {
    color: '#ffffffe0',
    fontSize: Unit(32),
    fontWeight: 'bold'
  },
  userAccountName: {
    color: '#ffffff50',
    fontSize: Unit(24),
    fontWeight: 'bold'
  },
  footerButtons: {
    position: 'absolute',
    top: Unit(30),
    right: Unit(20),
    width: Unit(220),
    height: Unit(100),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerButton: {
    width: Unit(100),
    height: Unit(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Unit(50),
  },
  likedButton: {
    paddingTop: Unit(10),
  },
  footerButtonImage: {
    width: Unit(100),
    height: Unit(100),
  },
  footerShadow: {
    position: 'absolute',
    zIndex: 1,
    width: Unit(750, false),
    height: isIPhoneX ? Unit(190) : Unit(150),
  },
  fakeButtonGroup: {
    position: 'absolute',
    top: Unit(20),
    right: Unit(10),
    width: Unit(240),
    height: Unit(120),
    backgroundColor: '#000',
    borderRadius: Unit(60)
  }
})