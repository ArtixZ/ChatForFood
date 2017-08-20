import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import { StackNavigator } from 'react-navigation';

import reducers from './src/reducers';
// import AppNavigator from './src/AppNavigator';
import ChatUI from './src/components/ChatUI';
import FoodDetail from './src/components/FoodDetail';

class App extends Component {
  componentWillMount() {
  //   const config = {
  //     apiKey: 'AIzaSyBzehv41oIPsUuHD1-BbCPVwyn2nCr9hbc',
  //     authDomain: 'rbproject-c4d55.firebaseapp.com',
  //     databaseURL: 'https://rbproject-c4d55.firebaseio.com',
  //     projectId: 'rbproject-c4d55',
  //     storageBucket: 'rbproject-c4d55.appspot.com',
  //     messagingSenderId: '37222483306'
  //   };

  //   firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    const MainNavigator = StackNavigator({
      chatUI: {screen: ChatUI},
      foodDetail: {screen: FoodDetail}
    });

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

export default App;
