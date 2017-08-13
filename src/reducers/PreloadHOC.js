import React, {Component} from 'react';
import Expo from 'expo';
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
            this._loadAssetsAsync();
        }

        async _loadAssetsAsync() {
            const imageAssets = cacheImages(Object.values(IMAGES));

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