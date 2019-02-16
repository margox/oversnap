/**
 * @providesModule screens/search/result
 */

import React from 'react'
import styles from './styles'
import { StatusBar, View, FlatList } from 'react-native'
import PhotoController from 'controllers/photo'
import NavBar from 'components/navbar'
import PhotoCell from 'components/photocell'
import ListHolder from 'components/listholder'
import { Unit, isIPad } from 'utils/ui'
import language from 'language'

const numColumns = isIPad ? 2 : 1

export default class SearchResultScreen extends React.Component {

  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: '#000'
  }

  state = {
    photos: [],
    page: 1,
    total: 0,
    totalPages: 0,
    pageSize: 20,
    searching: false,
    hasMore: true,
  }

  __listItemRefs = {}

  componentDidMount () {
    this.loadPhotos()
  }

  updateList = (photo) => {

    const { photos } = this.state

    this.setState({
      photos: [...photos.map(item => item.id === photo.id ? { ...item, ...photo } : item)]
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
    <PhotoCell ref={ref => this.__listItemRefs[`photo-${index}`] = ref} photo={item} index={index} onChange={this.updateList}/>
  )

  loadMorePhotos = () => {

    if (this.state.page > 1) {
      this.loadPhotos()
    }

  }

  loadPhotos = async () => {

    const { keyword } = this.props
    const { searching, photos, page, pageSize } = this.state

    if (searching) {
      return false
    }

    this.setState({
      searching: true
    })

    try {

      const { total, total_pages, results } = await PhotoController.searchPhoto(keyword, page, pageSize)

      this.setState({
        total: total,
        totalPages: total_pages,
        photos: page === 1 ? results : [ ...photos, ...results ],
        page: results.length ? page + 1 : page,
        hasMore: results.length === 0,
        searching: false
      })

    } catch (error) {
      this.setState({
        searching: false
      })
    }

  }

  render () {

    const { keyword } = this.props
    const { photos, searching } = this.state

    return (
      <View style={styles.searchResultScreen}>
        <StatusBar hidden={false} barStyle="light-content" />
        <NavBar leftComponent="back" title={keyword} />
        <View style={styles.photoListWrap}>
          {photos.length ? (
            <FlatList
              data={photos}
              style={styles.photoList}
              contentContainerStyle={styles.photoListContent}
              initialNumToRender={4 * numColumns}
              keyExtractor={this.extractKey}
              numColumns={numColumns}
              horizontal={false}
              getItemLayout={this.getItemLayout}
              onEndReached={this.loadMorePhotos}
              onViewableItemsChanged={this.handleViewableItemsChanged}
              renderItem={this.renderItem}
              onReach
            />
          ) : (
            searching ? (
              <ListHolder type="searching" text={language.searchingPhotos} />
            ) : (
              <ListHolder type="no-result" text={language.noSearchResults.replace('__KEYWORD__', keyword)} />
            )
          )}
        </View>
      </View>
    )

  }

}