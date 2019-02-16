/**
 * @providesModule screens/photos
 */

import React from 'react'
import { FlatList, View } from 'react-native'
import PhotoCell from 'components/photocell'
import ListHolder from 'components/listholder'
import PhotoController from 'controllers/photo'
import Store from 'helpers/store'
import language from 'language'
import { Unit, isIPad } from 'utils/ui'
import styles from './styles'

const numColumns = isIPad ? 2 : 1

export default class PhotosScreen extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      photos: props.initialPhotos || [],
      page: 1,
      pageSize: 15,
      loading: false
    }
  }
  __listItemRefs = {}
  __scrollOffset = 0
  __scrollDirection = 'up'

  componentDidMount () {
    this.loadPhotos()
  }

  loadPhotos = async () => {

    const { photos, page, pageSize, loading } = this.state

    if (loading) {
      return false
    }

    this.setState({
      loading: true
    })

    try {

      const newPhotos = await PhotoController.getPhotos(page, pageSize, 'latest')

      if (!newPhotos instanceof Array) {
        throw {}
      }

      this.setState({
        photos: page === 1 ? newPhotos : [ ...photos, ...newPhotos ],
        page: newPhotos.length ? page + 1 : page,
        loading: false
      }, () => {

        if (page === 1) {
          Store.setLocalData('OVERSHAP_CACHED_PHOTOS', newPhotos)
        }

      })

    } catch (error) {
      this.setState({
        loading: false
      })
    }

  }

  renderItem = ({ item, index }) => (
    <PhotoCell ref={ref => this.__listItemRefs[`photo-${index}`] = ref} photo={item} index={index}/>
  )

  extractKey = (item, index) => index + ''

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

  handleViewableItemsChanged = ({ viewableItems }) => {

    viewableItems.forEach((item) => {
      if (this.__listItemRefs[`photo-${item.index}`]) {
        this.__listItemRefs[`photo-${item.index}`].componentDidAppear()
      }
    })

  }

  getItemLayout = (data, index) => {
    return {
      length: Unit(606),
      offset: Unit(606) * index,
      index: index
    }
  }

  render () {

    const { photos, orderBy } = this.state

    return (
      <View style={styles.photoListWrapper}>
        {photos.length ? (
          <FlatList
            style={styles.photoList}
            contentContainerStyle={styles.photoListContent}
            initialNumToRender={4 * numColumns}
            keyExtractor={this.extractKey}
            data={photos}
            onScroll={this.handleScroll}
            onEndReached={this.loadPhotos}
            horizontal={false}
            numColumns={numColumns}
            getItemLayout={this.getItemLayout}
            onViewableItemsChanged={this.handleViewableItemsChanged}
            renderItem={this.renderItem}
          />
        ) : (
          <View style={styles.listHolderWrapper}>
            <ListHolder type="loading" text={language.loadingPhotos} />
          </View>
        )}
      </View>
    )

  }

}
