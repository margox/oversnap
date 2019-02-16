/**
 * @providesModule app/screens
 */

import { Navigation } from 'react-native-navigation'
import Router from 'helpers/router'

export const registerScreens = () => Object.keys(Router.routes).forEach((route) => {
  Navigation.registerComponent(route, () => Router.routes[route])
})