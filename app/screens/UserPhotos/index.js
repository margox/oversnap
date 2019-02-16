/**
 * @providesModule screens/user/photos
 */

import React from 'react'
import { StatusBar, Image, FlatList, View, TouchableOpacity } from 'react-native'
import PhotoController from 'controllers/photo'
import NavBar from 'components/navbar'
import PhotoCell from 'components/photocell'
import ListHolder from 'components/listholder'
import Router from 'helpers/router'
import language from 'language'
import { Unit, isIPad } from 'utils/ui'
import styles from './styles'

const numColumns = isIPad ? 2 : 1

export default class UserPhotosScreen extends React.Component {

  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: '#000'
  }

  state = {
    photos: [],
    page: 1,
    pageSize: 20,
    orderBy: 'latest',
    loading: false
  }

  __listItemRefs = {}

  componentDidMount () {
    this.loadPhotos()
  }

  navigateBack = () => {
    Router.navigateBack()
  }

  viewProfile = () => {
    Router.navigateTo(this.props.user.links.html, {
      title: this.props.user.name
    })
  }

  extractKey = (item, index) => index + ''

  getItemLayout = (data, index) => {
    return {
      length: Unit(606),
      offset: Unit(606) * index,
      index: index
    }
  }

  handleViewableItemsChanged = ({ viewableItems }) => {

    viewableItems.forEach((item) => {
      if (this.__listItemRefs[`photo-${item.index}`]) {
        this.__listItemRefs[`photo-${item.index}`].componentDidAppear()
      }
    })

  }

  renderItem = ({ item, index }) => (
    <PhotoCell refererUser={this.props.user.username} ref={ref => this.__listItemRefs[`photo-${index}`] = ref} photo={item} index={index}/>
  )

  loadMorePhotos = () => {

    if (this.state.page > 1) {
      this.loadPhotos()
    }

  }

  loadPhotos = async () => {

    const { user } = this.props

    if (!user || !user.username) {
      return false
    }

    const { photos, page, pageSize, orderBy, loading } = this.state

    if (loading) {
      return false
    }

    this.setState({
      loading: true
    })

    try {

      const newPhotos = await PhotoController.getUserPhotos(user.username, page, pageSize, orderBy)

      if (!newPhotos instanceof Array) {
        throw {}
      }

      this.setState({
        photos: page === 1 ? newPhotos : [ ...photos, ...newPhotos ],
        page: newPhotos.length ? page + 1 : page,
        loading: false
      })

    } catch (error) {
      this.setState({
        loading: false
      })
    }

  }

  render () {

    const { user } = this.props
    const { photos, loading } = this.state

    return (
      <View style={styles.userPhotosScreen}>
        <StatusBar hidden={false} barStyle="light-content" />
        <NavBar
          leftComponent="back"
          title={user.name}
          rightComponent={
            <View style={styles.button}>
              <TouchableOpacity onPress={this.viewProfile}>
                <Image style={styles.avatarImage} source={{uri: user['profile_image']['large']}} />
              </TouchableOpacity>
            </View>
          }
        />
        <View style={styles.photoListWrap}>
          {photos.length ? (
            <FlatList
              data={photos}
              style={styles.photoList}
              contentContainerStyle={styles.photoListContent}
              initialNumToRender={4 * numColumns}
              numColumns={numColumns}
              horizontal={false}
              keyExtractor={this.extractKey}
              getItemLayout={this.getItemLayout}
              onEndReached={this.loadMorePhotos}
              onViewableItemsChanged={this.handleViewableItemsChanged}
              renderItem={this.renderItem}
            />
          ) : (
            loading ? (
              <ListHolder type="loading" text={language.loadingPhotos} />
            ) : (
              <ListHolder type="no-photo" text={language.noPhotos} />
            )
          )}
        </View>
      </View>
    )

  }

}
