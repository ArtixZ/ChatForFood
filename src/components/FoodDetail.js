import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { Rating } from 'react-native-elements';
import numeral from 'numeral';

import BarChart from './BarChart';

class FoodDetail extends Component {
    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.foodInfo.name,
        headerTintColor: 'white',
            headerStyle: {
            backgroundColor: 'lightseagreen', 
            elevation: null
        },
    });
    constructor(props) {
        super(props);

    }
    render() {
        const ingredients = {Calories: 19, Fat: 22, Sodium: 31, Carbs: 13, Sugars: 17, Protein: 17}

        const { thumbnailStyle, thumbnailContainerStyle, contentContainerStyle, detailContainerSty, foodInfoSty, abstractSty, ingredientSty, actionSty } = styles;
        
        const { navigation } = this.props;
        const { foodInfo } = navigation.state.params;
        const { pic, name, restaurantName, highlights, rating, tags, distance, price } = foodInfo;
        return(
            <View style = {detailContainerSty}>

                <View style = {foodInfoSty}>
                    <View style={thumbnailContainerStyle}>
                        <Image
                            style={thumbnailStyle}
                            source={pic}
                        />
                    </View>
                    <View style={contentContainerStyle}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Text style={{fontWeight:'bold'}}>{restaurantName}</Text>
                        </View>
                        <Text style={{color:'grey'}}>{`${numeral(distance).format('0.0')} mi`}</Text>
                        <Rating
                            imageSize={20}
                            readonly
                            startingValue={rating}
                        />
                        <Text style={{textAlign:'center'}}>{highlights.toString()}</Text>
                    </View>
                </View>

                <View style = {abstractSty}>
                    <Text>Strips of Strips of Strips of Strips of Strips of Strips of Strips of Strips of Strips of Strips of Strips of Strips of Strips of Strips of Strips of Strips of </Text>
                </View>

                <View style = {ingredientSty}>
                    <BarChart
                        ingredients = {ingredients}
                    />
                </View>

                <View style = {actionSty}>
                </View>
            </View>
        )
    }
}

const styles = {
    detailContainerSty: {
        flex: 1
    },
    foodInfoSty: {
        flex: 3,
        flexDirection: 'row'
    },
    abstractSty: {
        flex: 1,
        
    },
    ingredientSty: {
        flex: 5,
    },
    actionSty: {
        flex: 1
    },
    thumbnailContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
    thumbnailStyle: {
        height: 130,
        width: 200
    },
    contentContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
}

export default FoodDetail;