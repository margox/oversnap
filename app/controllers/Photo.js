/**
 * @providesModule controllers/photo
 */

import { CameraRoll, Share, NativeEventEmitter } from 'react-native'
import iCloudStorage from 'react-native-icloudstore'
import RNFS from 'react-native-fs'
import Eventer from 'helpers/eventer'
import Router from 'helpers/router'
import Store from 'helpers/store'
import language from 'language'

const apiBase = 'https://margox.cn/api/oversnap'

const resolveResponse = async (response) => {

  try {

    if (response.headers && response.headers.map) {
      Store.set('ratelimit-limit', response.headers.map['x-ratelimit-limit'][0])
      Store.set('ratelimit-remaining', response.headers.map['x-ratelimit-remaining'][0])
    }

    if (response.headers.map['x-ratelimit-remaining'][0] == '0') {
      throw {message: 'RATE_LIMIT_EXCEEDED'}
    }

    return await response.json()

  } catch (error) {
    if (response.status === 403) {
      throw {message: 'RATE_LIMIT_EXCEEDED'}
    } else {
      throw error
    }
  }

}

const resolveError = (error) => {

  if (error && error.message === 'RATE_LIMIT_EXCEEDED') {
    setTimeout(() => {
      Router.showDialog({
        iconName: 'emoticon-dead',
        text: language.apiRateLimitedTip,
        cancelText: language.understand
      })
    }, 0)
  } else {
    setTimeout(() => {
      Router.showMessage({
        type: 'error',
        title: error.message || language.unknowError,
        duration: 2
      })
    }, 0)
  }

}

const iCloudEventEmitter = new NativeEventEmitter(iCloudStorage)

iCloudEventEmitter.addListener('iCloudStoreDidChangeRemotely', async ({ changedKeys }) => {

  console.log(changedKeys)

  if (changedKeys && changedKeys.includes('OVERSNAP_FAVORITE_PHOTOS')) {
    const photos = await PhotoController.getFavoritePhotos(true)
    Eventer.emit('favorites-change', photos)
  }

})

let favoritePhotos = []

export default PhotoController = {

  async getPhoto (id) {

    try {

      const response = await fetch(`${apiBase}/photos/${id}`)
      return await resolveResponse(response)

    } catch (error) {
      resolveError(error)
    }

  },

  async getPhotos (page = 1, pageSize = 30, orderBy = 'latest') {

    try {

      const response = await fetch(`${apiBase}/photos?page=${page}&per_page=${pageSize}&order_by=${orderBy}`)
      return await resolveResponse(response)

    } catch (error) {
      resolveError(error)
    }

  },

  async getCuratedPhotos (page = 1, pageSize = 30, orderBy = 'latest') {

    try {

      const response = await fetch(`${apiBase}/photos/curated?page=${page}&per_page=${pageSize}&order_by=${orderBy}`)
      return await resolveResponse(response)

    } catch (error) {
      resolveError(error)
    }

  },

  async getUserPhotos (username, page = 1, pageSize = 30, orderBy = 'latest') {

    try {

      const response = await fetch(`${apiBase}/users/${username}/photos?page=${page}&per_page=${pageSize}&order_by=${orderBy}`)
      return await resolveResponse(response)

    } catch (error) {
      resolveError(error)
    }

  },

  async searchPhoto (keyword, page = 1, pageSize = 30) {

    try {

      const response = await fetch(`${apiBase}/search/photos?query=${keyword}&page=${page}&per_page=${pageSize}`)
      return await resolveResponse(response)

    } catch (error) {
      resolveError(error)
    }

  },

  async getFavoritePhotos (syncCloud = false) {

    if (!syncCloud) {
      return favoritePhotos
    }

    try {

      const response = await Store.getCloudData('OVERSNAP_FAVORITE_PHOTOS')

      if (response && response.length) {
        favoritePhotos = response
      }

      return favoritePhotos

    } catch (error) {
      resolveError(error)
    }

  },

  isLiked (photoId) {
    return !!favoritePhotos.find(photo => photo.id === photoId)
  },

  async likePhoto (photo) {

    const { id, width, height, color, likes, user, urls, links } = photo
    const newPhoto = {
      id, width, height, color, likes, urls, links,
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        location: user.location,
        profile_image: {
          large: user.profile_image.large
        },
        links: user.links
      }
    }

    if (favoritePhotos.find(photo => photo.id === id)) {
      return favoritePhotos
    }

    try {

      favoritePhotos.unshift(newPhoto)
      await Store.setCloudData('OVERSNAP_FAVORITE_PHOTOS', favoritePhotos)
      Eventer.emit('favorites-change', [...favoritePhotos])
      return favoritePhotos

    } catch (error) {
      resolveError(error)
    }

  },

  async unlikePhoto (photo) {

    if (!favoritePhotos.find(item => item.id === photo.id)) {
      return favoritePhotos
    }

    try {

      favoritePhotos = favoritePhotos.filter(item => item.id !== photo.id)
      await Store.setCloudData('OVERSNAP_FAVORITE_PHOTOS', favoritePhotos)
      Eventer.emit('favorites-change', [...favoritePhotos])
      return favoritePhotos

    } catch (error) {
      resolveError(error)
    }

  },

  async getRandomPhoto () {

    try {

      const response = await fetch(`${apiBase}/photos/random`)
      return await resolveResponse(response)

    } catch (error) {
      resolveError(error)
    }

  },

  async sharePhoto (url) {

    const fileData = await RNFS.readFile(url, 'base64')
    return await Share.share({url: `data:image/jpg;base64,${fileData}`})

  },

  async removePhoto (path) {
    return await CameraRoll.deletePhotos([path])
  },

  async downloadPhoto (photo, quality, photoDataURI) {

    const imageURL = quality === 'data-uri' ? photoDataURI : (photo.urls[quality] || photo.urls.full)

    await fetch(`${apiBase}/photos/${photo.id}/download`)
    return await CameraRoll.saveToCameraRoll(imageURL, 'photo')

  }

}