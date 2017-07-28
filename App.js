import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
// import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import reducers from './src/reducers';
// import Router from './src/Router';
import ChatUI from './src/components/ChatUI';

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

    return (
      <Provider store={store}>
        <ChatUI />
      </Provider>
    );
  }
}

export default App;
