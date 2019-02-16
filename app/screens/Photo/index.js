/**
 * @providesModule screens/photo
 */

import React from 'react'
import styles from './styles'
import { BlurView } from 'react-native-blur'
import { captureRef } from "react-native-view-shot"
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/Feather'
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import PhotoController from 'controllers/photo'
import Router from 'helpers/router'
import language from 'language'
import FastImage from 'react-native-fast-image'
import { Unit, isIPhoneX, screenWidth, screenHeight } from 'utils/ui'
import { StatusBar, ActivityIndicator, View, Text, Animated, ScrollView, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'

export default class PhotoScreen extends React.Component {

  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: '#000'
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent)
  }

  state = {
    isReady: false,
    showStatusBar: false,
    showHeaderAndFooter: false,
    showPhotoInfo: false,
    image: null,
    photoLoading: true,
    maximumScale: 1,
    minimumScale: 1,
    initialWidth: screenWidth,
    initialHeight: screenHeight,
    showDefaultPhoto: true,
    liking: false,
    liked: false,
    sharing: false,
    downloading: false,
    photoDetailLoading: false,
    photoDetail: {
      id: null,
      location: {},
      exif: {}
    }
  }

  isReady = false

  __regularPhotoLocalPath = null
  __fullPhotoLocalPath = null
  __headerVisibility = new Animated.Value(0)
  __footerVisibility = new Animated.Value(0)
  __photoInfoVisibility = new Animated.Value(0)

  navigateBack = () => {
    Router.navigateBack()
  }

  static getDerivedStateFromProps (nextProps, prevState) {

    if (nextProps === prevState) {
      return null
    }

    return {
      liked: PhotoController.isLiked(nextProps.photo.id)
    }

  }

  onNavigatorEvent = (event) => {

    if (event && event.type === 'PreviewActionPress') {
      if (event.id === 'download') {
        this.downloadPhoto('regular')
      } else if (event.id === 'view') {
        Router.navigateTo('photo', {
          photo: this.props.photo,
          refererUser: this.props.refererUser
        })
      }
    }

  }

  loadPhotoDetail = async () => {

    this.setState({
      photoDetailLoading: true
    })

    try {

      const photoDetail = await PhotoController.getPhoto(this.props.photo.id)

      if (photoDetail && photoDetail.id && this.isReady) {
        this.isReady && this.setState({ photoDetail, photoDetailLoading: false })
      }

    } catch (error) {
      this.isReady && this.setState({
        photoDetailLoading: false
      })
    }

  }

  showPhotoInfo = async () => {

    if (this.state.photoDetailLoading) {
      return false
    }

    if (!this.state.photoDetail.exif) {
      await this.loadPhotoDetail()
    }

    this.setState({
      showPhotoInfo: true
    })

    this.isReady && Animated.timing(this.__photoInfoVisibility, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start()

  }

  hidePhotoInfo = () => {

    Animated.timing(this.__photoInfoVisibility, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true
    }).start(() => {
      this.setState({
        showPhotoInfo: false
      })
    })

  }

  toggleHeaderAndFooter = () => {

    const { showHeaderAndFooter, showStatusBar } = this.state

    // 0: show no footer
    // 1: show small footer

    const nextFooterState = showHeaderAndFooter ? 0 : 1

    Animated.timing(this.__footerVisibility, {
      toValue: nextFooterState,
      duration: 400,
      useNativeDriver: true
    }).start()

    this.setState({
      showHeaderAndFooter: !showHeaderAndFooter,
      showStatusBar: !showStatusBar
    })

    Animated.timing(this.__headerVisibility, {
      toValue: showHeaderAndFooter ? 0 : 1,
      duration: 400,
      useNativeDriver: true
    }).start()

  }

  toggleLike = async () => {

    const { photo } = this.props
    const { liked, liking } = this.state

    if (!photo || !photo.id || liking) {
      return false
    }

    this.setState({ liking: true })

    try {

      await PhotoController[liked ? 'unlikePhoto' : 'likePhoto'](photo)
      this.setState({ liking: false, liked: !liked })

    } catch (error) {
      this.setState({ liking: false })
    }

  }

  showDownloadMenu = () => {

    const { photo } = this.props

    if (!photo || !photo.id || this.state.downloading) {
      return false
    }

    Router.showActionSheet({
      title: language.downloadPhoto,
      buttons: [
        {
          text: language.screenShot,
          onPress: () => setTimeout(() => this.downloadPhoto('screenshot'), 200)
        }, {
          text: language.regularFormat,
          onPress: () => setTimeout(() => this.downloadPhoto('regular'), 200)
        }, {
          text: language.highQualityFormat,
          onPress: () => setTimeout(() => this.downloadPhoto('full'), 200)
        }, {
          text: language.rawFormat,
          onPress: () => setTimeout(() => this.downloadPhoto('raw'), 200)
        }
      ]
    })

  }

  removePhoto = async (path) => {

    Router.dismissMessage()

    try {
      await PhotoController.removePhoto(path)
    } catch (error) {

      Router.showMessage({
        type: 'error',
        title: language.photoDeleteFailed,
        action: () => this.removePhoto(path),
        actionText: language.retry,
        duration: 3.5
      })

    }

  }

  downloadPhoto = async (quality) => {

    const { photo } = this.props

    if (!photo || !photo.id || this.state.downloading) {
      return false
    }

    this.setState({ downloading: true })

    try {

      let path = null

      if (quality === 'regular' && this.__regularPhotoLocalPath) {
        path = await PhotoController.downloadPhoto(photo, 'data-uri', this.__regularPhotoLocalPath)
      } else if (quality === 'full' && this.__fullPhotoLocalPath) {
        path = await PhotoController.downloadPhoto(photo, 'data-uri', this.__fullPhotoLocalPath)
      } else if (quality === 'screenshot') {
        let screenshotResult = await captureRef(this.scrollViewRef, {format: 'png', quality: 1.0, result: 'data-uri'})
        path = await PhotoController.downloadPhoto(photo, 'data-uri', screenshotResult)
      } else {
        path = await PhotoController.downloadPhoto(photo, quality)
      }

      Router.showMessage({
        title: language.photoSaved,
        action: () => this.removePhoto(path),
        actionText: language.undo,
        actionTextColor: '#e74c3c',
        duration: 3.5
      })

      this.isReady && this.setState({ downloading: false })

    } catch (error) {

      Router.showMessage({
        type: 'error',
        title: language.photoSaveFailed,
        actionText: language.undo,
        duration: 1
      })

      this.isReady && this.setState({ downloading: false })

    }

  }

  sharePhoto = async () => {

    if (this.state.sharing) {
      return false
    }

    this.setState({ sharing: true })

    try {
      await PhotoController.sharePhoto(this.__fullPhotoLocalPath || this.__regularPhotoLocalPath)
      this.setState({ sharing: false })
    } catch (error) {
      this.setState({ sharing: false })
    }

  }

  viewUserPhotos = () => {

    const { photo, refererUser } = this.props

    if (refererUser && refererUser === photo.user.username) {
      Router.navigateBack()
    } else {
      Router.navigateTo('user/photos', {
        user: photo.user
      })
    }

  }

  centerPhoto = (event) => {

    this.__regularPhotoLocalPath = event.nativeEvent.source || null

    const { initialWidth, initialHeight } = this.state
    const centerX = initialWidth > screenWidth ? (initialWidth - screenWidth) / 2 : 0
    const centerY = initialHeight > screenHeight ? (initialHeight - screenHeight) / 2 : 0

    this.scrollViewRef && this.scrollViewRef.scrollTo({
      x: centerX,
      y: centerY,
      animated: true,
      duration: 3000
    })

    this.setState({
      photoLoading: false
    })

  }

  setPhotoScale = () => {

    let scale = 1
    let initialHeight = 0
    let initialWidth = 0
    let maximumScale = 1
    let minimumScale = 1
    const { width, height } = this.props.photo

    if (width > height) {
      maximumScale = height / screenHeight
      initialWidth = width / maximumScale
      initialHeight = screenHeight
    } else {
      maximumScale = width / screenWidth
      initialHeight = height / maximumScale
      initialWidth = screenWidth
    }

    if (initialHeight < screenHeight) {
      maximumScale = screenHeight / initialHeight * maximumScale
      initialWidth = screenHeight / initialHeight * initialWidth
      initialHeight = screenHeight
    }

    minimumScale = initialWidth > screenWidth ? screenWidth / initialWidth : screenHeight / initialHeight

    const isReady = true

    this.setState({ maximumScale, minimumScale, initialWidth, initialHeight, isReady })

  }

  hideDefaultPhoto = (event) => {

    this.__fullPhotoLocalPath = event.nativeEvent.source || null

    setTimeout(() => {
      this.isReady && this.setState({
        showDefaultPhoto: false,
        photoLoading: false
      })
    }, 500)

  }

  viewPhotoPosition = () => {

    if (this.state.photoDetail.location.position && this.state.photoDetail.location.position.longitude && this.state.photoDetail.location.position.latitude) {
      Router.showLightBox('mapview', {
        coordinate: this.state.photoDetail.location.position
      })
    }

  }

  rescalePhoto = () => {

    const { initialWidth, initialHeight } = this.state
    const centerX = initialWidth > screenWidth ? (initialWidth - screenWidth) / 2 : 0
    const centerY = initialHeight > screenHeight ? (initialHeight - screenHeight) / 2 : 0

    this.scrollViewResponderRef.scrollResponderZoomTo({
      x: centerX,
      y: centerY,
      width: screenWidth,
      height: screenHeight,
      animated: true
    })

  }

  componentDidMount () {

    const { photo, isPreview } = this.props

    this.isReady = true

    if (!photo || !photo.id) {
      return false
    }

    this.setState({
      photoDetail: {
        ...this.state.photoDetail,
        ...photo,
        exif: null
      },
    })

    this.setPhotoScale()
    !isPreview && this.toggleHeaderAndFooter()

  }

  componentWillUnmount () {
    this.isReady = false
  }

  render () {

    const { photo, isPreview } = this.props

    if (!photo || !photo.id) {
      return null
    }

    const {
      photoLoading, photoDetail, photoDetailLoading, downloading, showDefaultPhoto, showPhotoInfo,
      maximumScale, minimumScale, initialWidth, initialHeight, showStatusBar, isReady, liked, sharing
    } = this.state

    if (!isReady) {
      return (
        <View style={styles.photoScreen}></View>
      )
    }

    const headerAnimatedStyle = {
      transform: [{
        translateY: this.__headerVisibility.interpolate({
          inputRange: [0, 1],
          outputRange: [isIPhoneX ? Unit(-200) : Unit(-180), 0]
        })
      }]
    }

    const footerAnimatedStyle = {
      transform: [{
        translateY: this.__footerVisibility.interpolate({
          inputRange: [0, 1],
          outputRange: [Unit(200), 0]
        })
      }]
    }

    const photoInfoAnimatedStyles = {
      opacity: this.__photoInfoVisibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      }),
      transform: [{
        translateY: this.__photoInfoVisibility.interpolate({
          inputRange: [0, 1],
          outputRange: [Unit(500), 0]
        })
      }]
    }

    return (
      <View style={[styles.photoScreen]}>
        {!isPreview ? <StatusBar hidden={!showStatusBar} barStyle="light-content" animated={true}/> : null}
        <View style={styles.gestureBackHandler}></View>
        {!isPreview ? (
          <Animated.View style={[styles.header, headerAnimatedStyle]}>
            <View style={styles.headerContent}>
              <View style={styles.buttonGoBack}>
                <TouchableOpacity onPress={this.navigateBack}>
                  <Icon name="arrow-left" size={24} color="#fff"/>
                </TouchableOpacity>
              </View>
              <View style={styles.headerButtons}>
                <View style={styles.headerButton}>
                  {showDefaultPhoto ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : null}
                </View>
                <TouchableOpacity onPress={this.rescalePhoto}>
                  <View style={styles.headerButton}>
                    <Icon name="maximize" size={20} color="#fff"/>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.sharePhoto}>
                  <View style={styles.headerButton}>
                    {sharing ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Icon name="share" size={20} color="#fff"/>
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.showPhotoInfo}>
                  <View style={styles.headerButton}>
                    {photoDetailLoading ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <Icon name="info" size={20} color="#fff"/>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <LinearGradient colors={['#00000050', '#00000000']} style={styles.headerShadow} />
          </Animated.View>
        ) : null}
        <View style={styles.photoImageWrapper}>
          {photoLoading ? (
            <View style={styles.pageLoading}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          ) : null}
          <ScrollView
            horizontal={true}
            ref={instance => {
              if (instance) {
                this.scrollViewRef = instance
                this.scrollViewResponderRef = instance.getScrollResponder()
              }
            }}
            maximumZoomScale={maximumScale}
            minimumZoomScale={minimumScale}
            contentInset={{top: 0}}
            centerContent={true}
            automaticallyAdjustContentInsets={false}
            contentInsetAdjustmentBehavior="scrollableAxes"
            style={{flex: 1, padding: 0, margin: 0}}
            contentContainerStyle={{width: initialWidth, height: initialHeight}}
          >
            {showDefaultPhoto ? (
              <TouchableWithoutFeedback onPress={this.toggleHeaderAndFooter}>
                <FastImage
                  onLoad={this.centerPhoto}
                  ref={instance => this.defaultPhotoInstance = instance}
                  source={{uri: photo.urls['regular'], cache: 'force-cache'}}
                  style={[styles.defaultPhotoImage, { width: initialWidth, height: initialHeight }]}   
                />
              </TouchableWithoutFeedback>
            ) : null}
            {!isPreview ? (
              <TouchableWithoutFeedback onPress={this.toggleHeaderAndFooter}>
                <FastImage
                  onLoad={this.hideDefaultPhoto}
                  source={{uri: photo.urls['full'], cache: 'force-cache'}}
                  style={[styles.photoImage, { width: initialWidth, height: initialHeight }]}   
                />
              </TouchableWithoutFeedback>
            ) : null}
          </ScrollView>
        </View>
        <Animated.View style={[styles.photoInfo, photoInfoAnimatedStyles, {zIndex: showPhotoInfo ? 5 : 1}]}>
          <View style={styles.buttonClosePhotoInfo}>
            <TouchableOpacity onPress={this.hidePhotoInfo}>
              <Icon name="x" size={24} color="#fff"/>
            </TouchableOpacity>
          </View>
          <View style={styles.photoInfoContent}>
            {photoDetail.exif ? (
              <View style={styles.photoMetas}>
                <View style={styles.photoMeta}>
                  <Text style={styles.photoMetaName}>{language.dimensions}</Text>
                  <Text style={styles.photoMetaValue}>{photoDetail.width + ' x ' + photoDetail.height}</Text>
                </View>
                <View style={styles.photoMeta}>
                  <Text style={styles.photoMetaName}>{language.camera}</Text>
                  <Text style={styles.photoMetaValue} adjustsFontSizeToFit={true} numberOfLines={1}>{photoDetail.exif.make && photoDetail.exif.model ? `${photoDetail.exif.make} / ${photoDetail.exif.model}` : '-'}</Text>
                </View>
                <View style={styles.photoMeta}>
                  <Text style={styles.photoMetaName}>{language.focalLength}</Text>
                  <Text style={styles.photoMetaValue}>{photoDetail.exif.focal_length || '-'}</Text>
                </View>
                <View style={styles.photoMeta}>
                  <Text style={styles.photoMetaName}>{language.aperture}</Text>
                  <Text style={styles.photoMetaValue}>{photoDetail.exif.aperture || '-'}</Text>
                </View>
                <View style={styles.photoMeta}>
                  <Text style={styles.photoMetaName}>{language.exposureTime}</Text>
                  <Text style={styles.photoMetaValue}>{photoDetail.exif.exposure_time || '-'}</Text>
                </View>
                <View style={styles.photoMeta}>
                  <Text style={styles.photoMetaName}>{language.iso}</Text>
                  <Text style={styles.photoMetaValue}>{photoDetail.exif.iso || '-'}</Text>
                </View>
                <View style={[styles.photoMeta, {borderBottomWidth: 0}]}>
                  <Text style={styles.photoMetaName}>{language.photoLocation}</Text>
                  <Text style={[styles.photoMetaValue, {fontSize: Unit(32)}]}>{photoDetail.location ? (`${photoDetail.location.city ? photoDetail.location.city + ' ' : ''}${photoDetail.location.country || ''}` || '-') : '-'}</Text>
                  {photoDetail.location && photoDetail.location.position ? (
                    <TouchableOpacity onPress={this.viewPhotoPosition}>
                      <View style={styles.buttonViewPhotoPosition}>
                        <Icon name="chevron-right" size={22} color="#fff" />
                      </View>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            ) : null}
          </View>
          <BlurView style={styles.photoInfoBlurView} blurType="dark"/>
        </Animated.View>
        {!isPreview ? (
          <Animated.View style={[styles.footer, footerAnimatedStyle]}>
            <View style={styles.footerContent}>
              <View style={styles.userAvatar}>
                <TouchableOpacity activeOpacity={0.8} onPress={this.viewUserPhotos}>
                  <FastImage style={styles.userAvatarImage} source={{uri: photo.user['profile_image']['large']}}/>
                </TouchableOpacity>
              </View>
              <View style={styles.userMeta}>
                <Text numberOfLines={1} style={styles.userName}>{photo.user.name}</Text>
                <Text numberOfLines={1} style={styles.userAccountName}>@{photo.user.username}</Text>
              </View>
              <View style={styles.footerButtons}>
                <TouchableOpacity activeOpacity={0.8} onPress={this.showDownloadMenu}>
                  {downloading ? (
                    <BlurView blurType="dark" style={styles.footerButton}>
                      <ActivityIndicator style={styles.downloading} size="small" color="#fff" />
                    </BlurView>
                  ) : (
                    <BlurView blurType="dark" style={styles.footerButton}>
                      <Icon name="arrow-down" color="#fff" size={24}/>
                    </BlurView>
                  )}
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={this.toggleLike}>
                  <BlurView blurType="dark" style={[styles.footerButton, styles.likedButton]}>
                    <MaterialIcon name={liked ? "heart" : "heart-outline"} color={liked ? "#f15151" : "#fff"} size={22}/>
                  </BlurView>
                </TouchableOpacity>
              </View>
            </View>
            <LinearGradient style={styles.footerShadow} colors={['#00000000', '#00000090']}/>
          </Animated.View>
        ) : null}
      </View>
    )

  }

}
