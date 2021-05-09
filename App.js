import React, { Component } from 'react'
import { createAppContainer, NavigationActions } from 'react-navigation';
import { AppNavigator } from './component/Navigation'

export default class App extends Component {

  render() {
    return (
        <>
          <AppContainer 
            ref={nav => { this.navigator = nav; }}
          />
        </>

    )
  }
}

const AppContainer = createAppContainer(AppNavigator)