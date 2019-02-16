/**
 * @providesModule screens/webview
 */

import React from 'react'
import { StatusBar, View, WebView } from 'react-native'
import NavBar from 'components/navbar'
import ListHolder from 'components/listholder'
import language from 'language'
import styles from './styles.js'

export default class WebViewScreen extends React.Component {

  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: '#fff'
  }

  state = {
    pageTitle: ''
  }

  renderLoading = () => <ListHolder type="loading" text={language.loadingWebPage}/>

  navigateBack = () => {
    this.props.navigator.pop()
  }

  handleMessage = (message) => {

    const messageData = message.nativeEvent.data

    if (messageData.indexOf('web-page-title-') === 0) {
      this.setState({
        pageTitle: messageData.replace('web-page-title-', '')
      })
    }

  }

  render () {

    const { url, title } = this.props
    const { pageTitle } = this.state

    return (
      <View style={styles.webViewScreen}>
        <StatusBar hidden={false}  barStyle="dark-content" />
        <NavBar style={styles.navBar} barStyle="light" leftComponent="back" title={pageTitle || title}/>
        <WebView
          startInLoadingState={true}
          renderLoading={this.renderLoading}
          source={{uri: url}}
          style={styles.webWiew}
          onMessage={this.handleMessage}
          injectedJavaScript="window.postMessage('web-page-title-' + document.title)"
        />
      </View>
    )

  }

}