import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { TabNavigator, StackNavigator } from 'react-navigation';

import reducers from './src/reducers';
// import AppNavigator from './src/AppNavigator';
import FBAuth from './src/components/FBAuth';
import ChatUI from './src/components/ChatUI';
import FoodDetail from './src/components/FoodDetail';
import PreloadHOC from './src/components/PreloadHOC';

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    const MainNavigator = TabNavigator({
      auth: { screen: FBAuth },
      main: {
        screen: StackNavigator({
          chatUI: {screen: ChatUI},
          foodDetail: {screen: FoodDetail}
        })
      }
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    });

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}

export default PreloadHOC(App);
