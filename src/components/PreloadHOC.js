import React, {Component} from 'react';
import Expo, { Font } from 'expo';
import firebase from 'firebase';


import {IMAGES} from '../reducers/data';

function cacheImages(images) {
    return images.map(image => {
        if (typeof image === 'string') {
            return Image.prefetch(image);
        } else {
            return Expo.Asset.fromModule(image).downloadAsync();
        }
    });
}

export default function PreloadHOC(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                appIsReady: false,
            }
        }

        componentWillMount() {
            this._initFirebase();
            this._loadAssetsAsync();
        }


        _initFirebase() {
            const config = {
                apiKey: "AIzaSyCzhEJV07MC8QWW2bQtttEA2fuXTq6AEhc",
                authDomain: "chatforfood-b4819.firebaseapp.com",
                databaseURL: "https://chatforfood-b4819.firebaseio.com",
                projectId: "chatforfood-b4819",
                storageBucket: "chatforfood-b4819.appspot.com",
                messagingSenderId: "445326614913"
              };
              if (!firebase.apps.length) {
                firebase.initializeApp(config);
              } else {
                firebase.app().delete().then(function() {
                    firebase.initializeApp(config);
                });
              }
        }

        async _loadAssetsAsync() {
            const imageAssets = cacheImages(Object.values(IMAGES));
            // await Font.loadAsync({
            //     'Montserrat': require('../assets/fonts/Montserrat-Regular.ttf'),
            // });
            

            await Promise.all([
                ...imageAssets,
            ]);

            this.setState({appIsReady: true});
        }

        render() {
            if (!this.state.appIsReady) {
                return <Expo.AppLoading />;
            }
            return <WrappedComponent {...this.props}/>
        }
    }
};