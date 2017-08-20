import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    Dimensions
} from 'react-native';
import Swiper from 'react-native-swiper';
import CardWrapper from './CardWrapper';

const { width } = Dimensions.get('window');
// const loading = require('./img/loading.gif');


// const Slide = (props) => {
//     return (<View style={styles.slide}>
//         <Image onLoad={props.loadHandle.bind(null, props.i)} style={styles.image} source={{ uri: props.uri }} />
//         {
//             !props.loaded && <View style={styles.loadingView}>
//                 <Image style={styles.loadingImage} source={loading} />
//             </View>
//         }
//     </View>
        
//   )
// }

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    onCardPress(card) {
        const {navigation} = this.props;
        navigation.navigate('foodDetail', {foodInfo: card});
    }

    render() {
        const {cards} = this.props;

        return (
            <View>
                <Swiper
                    showsPagination={false}
                    style={styles.wrapper}
                    height={165}
                    loop={false}
                >
                    {
                        cards.map((card, i) => {
                            const { pic, name, restaurantName, tags, distance, highlights, suggestion, rating, price } = card;
                            return (<CardWrapper
                                        key={i}
                                        thumbnail_image={pic}
                                        foodName={name}
                                        restaurantName={restaurantName}
                                        distance={distance}
                                        highlights={highlights}
                                        tags={tags}
                                        suggestion={suggestion}
                                        rating={rating}
                                        price={price}
                                        onCardPress={this.onCardPress.bind(this, card)}
                                    />)
                            })
                    }
                </Swiper>
            </View>
        )
    }
}

const styles = {
    wrapper: {
    },

    // slide: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     backgroundColor: 'transparent'
    // },
    // image: {
    //     width,
    //     flex: 1,
    //     backgroundColor: 'transparent'
    // },

    // loadingView: {
    //     position: 'absolute',
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     left: 0,
    //     right: 0,
    //     top: 0,
    //     bottom: 0,
    //     backgroundColor: 'rgba(0,0,0,.5)'
    // },

    // loadingImage: {
    //     width: 60,
    //     height: 60
    // }
}
