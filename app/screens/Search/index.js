/**
 * @providesModule screens/search
 */

import React from 'react'
import styles from './styles'
import Screen from 'decorators/screen'
import Icon from 'react-native-vector-icons/Feather'
import { VibrancyView } from 'react-native-blur'
import { StatusBar, TextInput, View, Text, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import Router from 'helpers/router'
import Store from 'helpers/store'
import language from 'language'

export default class SearchScreen extends Screen {

  static navigatorStyle = {
    navBarHidden: true,
    screenBackgroundColor: 'transparent'
  }

  state = {
    keyword: '',
    searchHistory: [],
    readyForFocus: false,
  }

  screenWillDisappear () {
    Keyboard.dismiss()
  }

  async componentDidMount () {

    this.autoFocusTimer = setTimeout(() => {
      this.setState({ readyForFocus: true })
    }, 300)

    try {
      const searchHistory = await Store.getLocalData('search_history') || []
      this.setState({ searchHistory })
    } catch (error) {}

  }

  componentWillUnmount () {
    clearTimeout(this.autoFocusTimer)
  }

  closeSearchScreen = () => {
    Keyboard.dismiss()
    Router.dismissLightBox()
  }

  render () {

    const { keyword, searchHistory, readyForFocus } = this.state

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.searchScreen}>
          <StatusBar hidden={false} barStyle="light-content"/>
          <View style={styles.form}>
            <View style={styles.inputWrap}>
              {readyForFocus ? <TextInput
                style={styles.formInput}
                value={keyword}
                maxLength={25}
                autoFocus={true}
                clearButtonMode={'never'}
                placeholder={language.searchPlaceHolder}
                placeholderTextColor="#ffffff70"
                returnKeyType="search"
                keyboardType="web-search"
                keyboardAppearance="dark"
                onSubmitEditing={() => this.handleSearch()}
                onChangeText={this.handleInput}
              /> : null}
            </View>
            <View style={styles.buttonSearch} >
              <TouchableOpacity>
                <Icon name="search" size={20} color="#ffffffa0" />
              </TouchableOpacity>
            </View>
            <View style={styles.buttonClose}>
              <TouchableOpacity onPress={this.closeSearchScreen}>
                <Icon name="x" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>  
          <View style={styles.history}>
            {searchHistory.map((value, index) => (
              <View key={index} style={styles.historyItem}>
                <TouchableOpacity onPress={() => this.handleSearch(value)}>
                  <Text style={styles.historyKeyword}>{value}</Text>
                </TouchableOpacity>
                <View style={styles.buttonSetKeyword}>
                  <TouchableOpacity onPress={() => this.handleInput(value)}>
                    <Icon name="arrow-up-right" size={20} color="#ffffff70"/>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
            {searchHistory.length ? (
              <View style={styles.buttonClearHistory}>
                <TouchableOpacity onPress={this.clearSearchHistory}>
                  <Text style={styles.buttonClearHistoryText}>{language.clearSearchHistory}</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <VibrancyView blurAmount={20} style={styles.blurView}>
            <View style={styles.fakeInput} />
          </VibrancyView>
        </View>
      </TouchableWithoutFeedback>
    )

  }

  handleInput = (keyword) => {
    this.setState({
      keyword: keyword.trim()
    })
  }

  handleSearch = async (_keyword) => {

    let { searchHistory, keyword } = this.state

    if (_keyword) {
      keyword = _keyword
    }

    if (!keyword || keyword.length === 0) {
      return false
    }

    let newSearchHistory = [ ...searchHistory ].filter(item => item !== keyword).slice(0, 5)
    newSearchHistory.unshift(keyword)

    Store.setLocalData('search_history', newSearchHistory)

    this.closeSearchScreen()
    Router.navigateTo('search/result', { keyword })
    Keyboard.dismiss()

  }

  clearSearchHistory = () => {

    this.setState({
      searchHistory: []
    }, () => {
      Store.removeLocalData('search_history')
    })

  }

}