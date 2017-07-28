import React from 'react';
import { View, Text, Image } from 'react-native';
import { Card, ListItem, Button } from 'react-native-elements'
import { Rating } from 'react-native-elements';

import { CardHorizontal, CardSection } from '../common';


const CardWrapper = ({ thumbnail_image, foodName, tags, suggestion, rating, price, highlights, distance }) => {

    const { thumbnailStyle, thumbnailContainerStyle, contentContainerStyle, ratingSty, txtCardContainer } = styles;

    return (
        <Card containerStyle={{ flex: 1}} wrapperStyle={{ flex: 1, flexDirection: 'column' }}>
            <View flex={4} flexDirection={'row'}>
                <View style={thumbnailContainerStyle}>
                    <Image
                        style={thumbnailStyle}
                        source={{ uri: thumbnail_image }}
                        />
                </View>
                <View style={contentContainerStyle}>
                    <Text>{foodName}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Rating
                            imageSize={20}
                            readonly
                            startingValue={rating}
                            style={ratingSty}
                            />
                        <Text>{`${distance} mi`}</Text>
                    </View>
                    <Text>{highlights.toString()}</Text>
                </View>
            </View>
            <View flex={1} flexDirection={'row'} alignItems={'center'}>
                <View style={txtCardContainer}>
                    <Text>{suggestion}</Text>
                </View>
                <View style={txtCardContainer}>
                    <Text>{`$${price}`}</Text>
                </View>
            </View>
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