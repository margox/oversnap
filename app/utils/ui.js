/**
 * @providesModule utils/ui
 */

import { Dimensions, PixelRatio } from 'react-native'

const { width, height } = Dimensions.get('window')
const uiWidthPx = 750

const screenTag = `${width}_${height}`
const specialScreenTags = ['414_896', '375_812']

export const pixelRadio = PixelRatio.get()
export const screenWidth = width
export const screenHeight = height
export const screenWidthPixel = screenWidth * pixelRadio
export const screenHeightPixel = screenHeight * pixelRadio
export const isIPhoneX = ~specialScreenTags.indexOf(screenTag)
export const isIPad = screenWidth >= 768
export const screenRate = screenWidth / uiWidthPx

export const Unit = (uiElementPx, asMax = true) => {
  return uiElementPx * (isIPad && asMax ? 0.5 : screenRate)
}