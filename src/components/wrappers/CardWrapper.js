import React from 'react';
import { View, Text, Image } from 'react-native';

import { CardHorizontal, CardSection } from '../common';
import { Card, ListItem, Button } from 'react-native-elements'


const CardWrapper = ({ thumbnail_image, foodName, tags, suggestion, rating, price, highlights, distance }) => {

    const { thumbnailStyle, thumbnailContainerStyle, contentStyle } = styles;

    return (
        <Card flexDirection={'row'}>
            <Card style={{flex:1}}>
                <View style={thumbnailContainerStyle}>
                    <Image
                        style={thumbnailStyle}
                        source={{ uri: thumbnail_image }}
                    />
                </View>
                <Text>{suggestion}</Text>
            </Card>
            <Card style={{flex:1}}>
                <View style={contentStyle}>
                    <Text>{foodName}</Text>
                    <Text>{rating}</Text>
                    <Text>{highlights.toString()}</Text>
                    <Text>{`${distance} mi`}</Text>
                    <Text>{`$${price}`}</Text>
                </View>     
            </Card>
        </Card>
    );
};

const styles = {
    contentStyle: {
        flexDirection: 'column',
        justifyContent: 'center'
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