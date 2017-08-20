import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Card } from 'react-native-elements'
import { Rating } from 'react-native-elements';
import numeral from 'numeral';

import { CardHorizontal, CardSection } from '../common';


const CardWrapper = ({ thumbnail_image, foodName, restaurantName, tags, suggestion, rating, price, highlights, distance, onCardPress }) => {

    const { thumbnailStyle, thumbnailContainerStyle, contentContainerStyle, ratingSty, txtCardContainer } = styles;

    return (
            <Card containerStyle={{ flex: 1, padding: 0}} wrapperStyle={{ flex: 1, flexDirection: 'column' }}>
                <TouchableOpacity style={{flex:1}} onPress={onCardPress}>
                    <View flex={4} flexDirection={'row'}>
                        <View style={thumbnailContainerStyle}>
                            <Image
                                style={thumbnailStyle}
                                source={thumbnail_image}
                            />
                        </View>
                        <View style={contentContainerStyle}>
                            <Text style={{fontWeight:'bold'}}>{restaurantName}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                <Rating
                                    imageSize={20}
                                    readonly
                                    startingValue={rating}
                                    style={ratingSty}
                                />
                                <Text style={{color:'grey'}}>{`${numeral(distance).format('0.0')} mi`}</Text>
                            </View>
                            <Text style={{textAlign:'center'}}>{highlights.toString()}</Text>
                        </View>
                    </View>
                    <View flex={1} flexDirection={'row'} alignItems={'center'}>
                        <View style={txtCardContainer}>
                            <Text style={{color:'white'}}>{foodName}</Text>
                        </View>
                        <View style={txtCardContainer}>
                            <Text style={{color:'white'}}>{`$${price}`}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                
            </Card>
    );
};

const styles = {
    ratingSty: {

    },
    txtCardContainer: {
        backgroundColor: '#5b7',
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    bkgColor: {
        backgroundColor: '#bfa',
    },
    contentContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    thumbnailStyle: {
        height: 100,
        width: 150
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
}

export default CardWrapper;