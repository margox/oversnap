/**
 * @providesModule screens/index
 */

import React from 'react'
import Screen from 'decorators/screen'
import { Animated, StatusBar, View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import RNShakeEvent from 'react-native-shake-event'
import Swiper from 'react-native-swiper'
import NavBar from 'components/navbar'
import Router from 'helpers/router'
import IndexPhotos from 'screens/photos'
import FavoritePhotos from 'screens/favorites'
import PhotoController from 'controllers/photo'
import language from 'language'
import { Unit, isIPhoneX } from 'utils/ui'
import styles from './styles'

export default class PhotosScreen extends Screen {

  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: '#000'
  }

  state = {
    swipeIndex: 0,
    showStatusBar: true
  }

  __headBarVisibility = new Animated.Value(1)
  __indexTitleVisibility = new Animated.Value(0)

  showPageMenu = () => {
    Router.showActionSheet({
      buttons: [
        {
          text: language.settings,
          onPress: () => {
            Router.navigateTo('settings')
          }
        }
      ]
    })
  }

  navigateToSearchScreen = () => {
    Router.showLightBox('search')
  }

  handleSwipeIndexChange = (swipeIndex) => {

    this.setState({ swipeIndex })

    Animated.timing(this.__indexTitleVisibility, {
      toValue: swipeIndex,
      duration: 200,
      useNativeDriver: true
    }).start()

  }

  hideHeadBar = () => {

    this.setState({ showStatusBar: false })

    Animated.timing(this.__headBarVisibility, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true
    }).start()

  }

  showHeadBar = () => {

    this.setState({ showStatusBar: true })

    Animated.timing(this.__headBarVisibility, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true
    }).start()

  }

  screenWillAppear () {
    this.__screenVisibile = true
    Router.bindNavigator(this.props.navigator)
  }

  screenWillDisappear () {
    this.__screenVisibile = false
  }

  screenDidAppearFirst () {

    this.__screenVisibile = true

    RNShakeEvent.addEventListener('shake', async () => {

      if (!this.__screenVisibile) {
        return false
      }

      try {

        const photo = await PhotoController.getRandomPhoto()

        if (this.__screenVisibile) {
          Router.navigateTo('photo', { photo })
        }

      } catch (error) {
        // ...
      }

    })

  }

  render () {

    const { showStatusBar } = this.state

    const headerBarAnimatedStyle = {
      transform: [{
        translateY: this.__headBarVisibility.interpolate({
          inputRange: [0, 1],
          outputRange: [isIPhoneX ? Unit(-170) : Unit(-140), 0],
        })
      }]
    }

    const indexTitleAnimatedStyle = {
      transform: [{
        translateY: this.__indexTitleVisibility.interpolate({
          inputRange: [0, 1],
          outputRange: [0, Unit(-60)],
        })
      }]
    }

    const indexTitle = (
      <View style={styles.indexTitleWrapper}>
        <Animated.View style={[styles.indexTitleTextView, indexTitleAnimatedStyle]}>
          <Text style={styles.indexTitleText}>OVERSNAP</Text>
          <Text style={styles.indexTitleText}>{language.favorites}</Text>
        </Animated.View>
      </View>
    )

    return (
      <View style={styles.indexScreen}>
        <StatusBar hidden={!showStatusBar} barStyle="light-content" animated={true}/>
        <View style={styles.photoListWrapper}>
          <Swiper
            loop={false}
            scrollEnabled={true}
            showsPagination={false}
            onScrollBeginDrag={this.showHeadBar}
            onIndexChanged={this.handleSwipeIndexChange}
            ref={instance => this.__listSwiperInstance = instance}
            style={styles.photoListSwiper}
          >
            <IndexPhotos initialPhotos={this.props.initialPhotos} onScrollUp={this.showHeadBar} onScrollDown={this.hideHeadBar}/>
            <FavoritePhotos onScrollUp={this.showHeadBar} onScrollDown={this.hideHeadBar}/>
          </Swiper>
        </View>
        <Animated.View style={[styles.headerBar, headerBarAnimatedStyle]}>
          <NavBar
            style={styles.navBar}
            title={indexTitle}
            leftComponent={
              <View style={styles.headerButton}>
                <TouchableOpacity onPress={this.showPageMenu}>
                  <Icon name="menu" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            }
            rightComponent={
              <View style={styles.headerButton}>
                <TouchableOpacity onPress={this.navigateToSearchScreen}>
                  <Icon name="magnify" size={24} color="#fff" />
                </TouchableOpacity>
              </View>
            }
            addonComponent={null}
          />
        </Animated.View>
      </View>
    )

  }

}
