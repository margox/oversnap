/**
 * @providesModule decorators/screen
 */

import React from 'react'

export default class Screen extends React.Component {

  constructor (props) {
    super(props)
    props.navigator.setOnNavigatorEvent(this.handleNavigatorEvent)
  }

  __hasBeenAppeared = false

  handleNavigatorEvent = (event) => {

    switch (event.id) {
      case 'willAppear':
        this.screenWillAppear()
        if (!this.__hasBeenAppeared) {
          this.screenWillAppearFirst()
        }
      break
      case 'didAppear':
        this.screenDidAppear()
        if (!this.__hasBeenAppeared) {
          this.screenDidAppearFirst()
        }
        this.__hasBeenAppeared = true
      break
      case 'willDisappear':
        this.screenWillDisappear()
      break
      case 'didDisappear':
        this.screenDidAppear()
      break
      case 'willCommitPreview':
        this.screenWillCommitPreview()
      break
    }

  }

  screenWillAppear () {}
  screenDidAppear () {}
  screenWillAppearFirst () {}
  screenDidAppearFirst() {}
  screenWillDisappear () {}
  screenDidDisappear () {}
  screenWillCommitPreview() {}

}