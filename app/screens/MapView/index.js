/**
 * @providesModule screens/mapview
 */

import React from 'react'
import { StatusBar, View, Text, TouchableOpacity, Linking } from 'react-native'
import { BlurView } from 'react-native-blur'
import MapView, { Marker } from 'react-native-maps'
import Icon from 'react-native-vector-icons/Feather'
import Router from 'helpers/router'
import language from 'language'
import styles from './styles.js'

export default class MapViewScreen extends React.Component {

  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: '#fff'
  }

  state = {
    mapType: 'standard'
  }

  closeMapView = () => {
    Router.dismissLightBox()
  }

  viewViaGoogleMap = () => {
    const { longitude, latitude } = (this.props.coordinate || { longitude:0, latitude:0 })
    Linking.openURL(`https://www.google.com/maps/@?api=1&map_action=map&center=${latitude},${longitude}`)
  }

  switchToStandardMap = () => {
    this.setState({
      mapType: 'standard'
    })
  }

  switchToSatelliteMap = () => {
    this.setState({
      mapType: 'satellite'
    })
  }

  render () {

    const { mapType } = this.state
    const { coordinate } = this.props
    const { longitude, latitude } = (coordinate || { longitude:0, latitude:0 })

    return (
      <View style={styles.mapViewScreen}>
        <StatusBar hidden={true}/>
        <MapView
          style={styles.mapView}
          mapType={mapType}
          initialRegion={{
            longitude, latitude,
            latitudeDelta: 5,
            longitudeDelta: 5
          }}
        >
          <Marker coordinate={{longitude, latitude}} />
        </MapView>
        <View style={styles.roundButtonLeft}>
          <TouchableOpacity onPress={this.closeMapView}>
            <BlurView blurType="dark" style={styles.roundButton}>
              <Icon name="x" color="#fff" size={18}/>
            </BlurView>
          </TouchableOpacity>
        </View>
        <BlurView blurType="dark" style={styles.mapTypeSwitcher}>
          <TouchableOpacity onPress={this.switchToStandardMap}>
            <View style={[styles.buttonSwitchMapType, {backgroundColor: mapType === 'standard' ? '#ffffff20' : 'transparent'}]}>
              <Text style={styles.buttonSwitchMapTypeText}>{language.mapTypeStandard}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.switchToSatelliteMap}>
            <View style={[styles.buttonSwitchMapType, {backgroundColor: mapType === 'satellite' ? '#ffffff20' : 'transparent'}]}>
              <Text style={styles.buttonSwitchMapTypeText}>{language.mapTypeSatellite}</Text>
            </View>
          </TouchableOpacity>
        </BlurView>
        <View style={styles.roundButtonRight}>
          <TouchableOpacity onPress={this.viewViaGoogleMap}>
            <BlurView blurType="dark" style={styles.roundButton}>
              <Icon name="arrow-up-right" color="#fff" size={18}/>
            </BlurView>
          </TouchableOpacity>
        </View>
      </View>
    )

  }

}