/**
 * @providesModule screens/favorites
 */

import React from 'react'
import { FlatList, View, Text, TouchableOpacity } from 'react-native'
import PhotoController from 'controllers/photo'
import PhotoCell from 'components/photocell'
import ListHolder from 'components/listholder'
import Eventer from 'helpers/eventer'
import language from 'language'
import { Unit, isIPad } from 'utils/ui'
import styles from './styles'

const numColumns = isIPad ? 2 : 1

export default class FavoritesScreen extends React.Component {

  state = {
    photos: [],
    loading: false,
    refreshing: false
  }

  __listItemRefs = {}
  __scrollOffset = 0
  __scrollDirection = 'up'

  async componentDidMount () {

    const photos = await PhotoController.getFavoritePhotos(true)
    this.setState({ photos })

    Eventer.on('favorites-change', photos => {
      this.setState({ photos })
    })

  }

  reloadPhotos = async () => {

    this.setState({ refreshing: true })

    try {

      const photos = await PhotoController.getFavoritePhotos(true)

      setTimeout(() => {
        this.setState({ photos, refreshing: false })
      }, 2000)

    } catch (error) {
      this.setState({ refreshing: false })
    }

  }

  handleScroll = (event) => {

    const currentOffset = Math.max(0, event.nativeEvent.contentOffset.y)
    const direction = currentOffset > this.__scrollOffset ? 'down' : 'up'

    if (Math.abs(currentOffset - this.__scrollOffset) < Unit(140)) {
      return false
    }

    if (direction !== this.__scrollDirection) {
       if (direction === 'down') {
        this.props.onScrollDown && this.props.onScrollDown()
      } else {
        this.props.onScrollUp && this.props.onScrollUp()
      }
    }

    this.__scrollOffset = currentOffset
    this.__scrollDirection = direction

  }

  extractKey = (item) => item.id

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
    <PhotoCell id={item.id} listRef="favorites" ref={ref => this.__listItemRefs[`photo-${index}`] = ref} photo={item} index={index}/>
  )

  render () {

    const { photos, loading, refreshing } = this.state

    return (
      <View style={styles.photoListWrap}>
        {photos.length ? (
          <FlatList
            data={photos}
            style={styles.photoList}
            extraData={photos}
            contentContainerStyle={styles.photoListContent}
            onScroll={this.handleScroll}
            initialNumToRender={4 * numColumns}
            keyExtractor={this.extractKey}
            numColumns={numColumns}
            horizontal={false}
            getItemLayout={this.getItemLayout}
            onViewableItemsChanged={this.handleViewableItemsChanged}
            renderItem={this.renderItem}
          />
        ) : (
          loading ? (
            <ListHolder type="loading" text={language.loadingFavorites} />
          ) : (
            <ListHolder type="no-photo" text={language.noFavoritedPhotos} />
          )
        )}
      </View>
    )

  }

}
