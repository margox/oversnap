/**
 * @providesModule components/photocell
 */

import React from 'react'
import styles from './styles'
import Router from 'helpers/router'
import Store from 'helpers/store'
import PhotoController from 'controllers/photo'
import language from 'language'
import { Unit } from 'utils/ui'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Animated, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import FastImage from 'react-native-fast-image'
import baseStyles from 'configs/styles'

export default class PhotoCell extends React.Component {

  constructor (props) {

    super(props)

    const { photo } = props
    const renderedPhotoCells = Store.get('rendered_photos') || {}

    this.state = {
      liked: false,
      liking: false,
      showPhoto: (photo && photo.id) ? renderedPhotoCells[photo.id] : false
    }

    renderedPhotoCells[photo.id] = true
    Store.set('rendered_photos', renderedPhotoCells)

    this.__photoVisibility = new Animated.Value(0)
    this.__componentAppeared = false
    this.__pressStartAt = 0

  }

  static getDerivedStateFromProps (nextProps, prevState) {

    return {
      liked: PhotoController.isLiked(nextProps.photo.id)
    }

  }

  componentDidMount () {
    this.__mounted = true
  }

  componentWillUnmount () {
    this.__mounted = false
  }

  componentDidAppear () {

    if (this.__componentAppeared || this.state.showPhoto) {
      return false
    }

    this.__componentAppeared = true

    const liked = PhotoController.isLiked(this.props.photo.id)

    this.setState({
      showPhoto: true,
      liked: liked
    })

  }

  viewPhoto = () => {

    if (!this.__pressStartAt || (new Date().getTime() - this.__pressStartAt > 200)) {
      return false
    }

    this.__pressStartAt = 0

    Router.navigateTo('photo', {
      photo: this.props.photo,
      refererUser: this.props.refererUser
    })

  }

  previewPhoto = (event) => {

    this.__pressStartAt = new Date().getTime()

    Router.push({
      screen: 'photo',
      passProps: {
        photo: this.props.photo,
        refererUser: this.props.refererUser
      },
      previewView: this.previewView,
      previewCommit: false,
      previewActions: [
        {
          id: 'view',
          title: language.view,
        }, {
          id: 'download',
          title: language.download,
        }, {
          id: 'cancel',
          title: language.cancel,
          style: 'destructive',
        }
      ],
    })

  }

  viewUserPhotos = () => {

    if (this.props.refererUser) {
      return false
    }

    Router.navigateTo('user/photos', {
      user: this.props.photo.user
    })

  }

  toggleLike = async () => {

    const { photo, listRef } = this.props
    const { liked, liking } = this.state

    if (!photo || !photo.id || liking) {
      return false
    }

    this.setState({ liking: true })

    try {

      await PhotoController[liked ? 'unlikePhoto' : 'likePhoto'](photo)
      this.__mounted && this.setState({ liking: false, liked: !liked })

      if (liked && listRef && listRef === 'favorites') {
        Router.showMessage({
          title: language.photoUnliked,
          action: () => {
            Router.dismissMessage()
            PhotoController.likePhoto(photo)
          },
          actionText: language.relikePhoto,
          actionTextColor: baseStyles.colors.primary,
          duration: 3
        })
      }

    } catch (error) {
      this.__mounted && this.setState({ liking: false })
    }

  }

  handleImageLoad = () => {

    Animated.timing(this.__photoVisibility, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true
    }).start()

  }

  render () {

    const { photo } = this.props
    const { showPhoto, liked } = this.state

    if (!photo || !photo.id || !showPhoto) {
      return (
        <View style={styles.photoCell}></View>
      )
    }

    const photoAnimatedStyle = {
      opacity: this.__photoVisibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1]
      }),
      transform: [
        {
          translateY: this.__photoVisibility.interpolate({
            inputRange: [0, 1],
            outputRange: [Unit(50), 0],
          })
        }
      ]
    }

    return (
      <View style={[styles.photoCell]}>
        <TouchableWithoutFeedback onPressIn={this.previewPhoto} onPress={this.viewPhoto}>
          <Animated.View ref={ref => this.previewView = ref} style={[styles.photoImageWrapper, photoAnimatedStyle]}>
            <FastImage onLoad={this.handleImageLoad} source={{uri: photo.urls['regular'], cache: 'force-cache'}} style={styles.photoImage}/>
          </Animated.View>
        </TouchableWithoutFeedback>
        <View style={[styles.backgroundHolder, {backgroundColor: photo.color}]}></View>
        <View style={styles.infoPanel}>
          <TouchableOpacity onPress={this.viewUserPhotos}>
            {photo.user['profile_image'] ? (
              <FastImage style={styles.userAvatar} source={{uri: photo.user['profile_image']['large']}}/>
            ) : (
              <View style={styles.userAvatar}></View>
            )}
            <Text style={styles.userName}>{photo.user.name}</Text>
          </TouchableOpacity>
          <View style={styles.likeButton}>
            <TouchableOpacity onPress={this.toggleLike}>
              <Icon style={styles.likeButtonIcon} name={liked ? 'heart' : 'heart-outline'} size={24} color={liked ? '#f15151' : '#fff'}/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )

  }

}