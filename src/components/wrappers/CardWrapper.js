import React from 'react';
import { View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { Card } from 'react-native-elements'
import { Rating } from 'react-native-elements';
import numeral from 'numeral';

import { CardHorizontal, CardSection } from '../common';


const CardWrapper = ({ thumbnail_image, foodName, restaurantName, tags, suggestion, rating, price, highlights, distance, onCardPress }) => {

    const { cardContainerSty, thumbnailStyle, thumbnailContainerStyle, contentContainerStyle, ratingSty, txtCardContainer } = styles;

    return (
            <Card containerStyle={cardContainerSty} wrapperStyle={{ flex: 1, flexDirection: 'row' }}>
                <TouchableOpacity style={{flex:1, flexDirection: 'row'}} onPress={onCardPress}>
                    <View flex={3} flexDirection={'column'}>
                        <View style={thumbnailContainerStyle}>
                            <Image
                                style={thumbnailStyle}
                                source={thumbnail_image}
                            />
                        </View>
                        <View style={txtCardContainer}>
                            <Text style={{color:'white'}}>{foodName}</Text>
                        </View>
                    </View>


                    <View flex={2} flexDirection={'column'}>
                        <View style={contentContainerStyle}>
                            <Text style={{fontFamily: 'System', fontSize: 17}}>{restaurantName}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                <Rating
                                    type='custom'
                                    ratingImage={require('../../assets/pics/rating_dot_grey.png')}
                                    ratingColor='#F98324'
                                    ratingBackgroundColor='#979797'
                                    imageSize={15}
                                    readonly
                                    startingValue={rating}
                                    style={ratingSty}
                                />
                                <Text style={{color:'#979797', fontSize: 11}}>{`${numeral(rating).format('0.0')}/5.0`}</Text>
                            </View>
                            <Text style={{color:'#979797', fontSize: 11}}>{`${numeral(distance).format('0.0')} miles`}</Text>                            
                            <Text style={{textAlign:'center'}}>{highlights.toString()}</Text>
                            <Text style={{color:'white'}}>{`$${price}`}</Text>                            
                        </View>
                        

                    </View>
                </TouchableOpacity>
                
            </Card>
    );
};

const styles = {
    cardContainerSty: {
        flex: 1, 
        padding: 0,
        paddingRight: 4,
        marginLeft:20,
        marginRight:20,
        borderRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0,0,0, .2)',
                shadowOffset: { height: 0, width: 0 },
                shadowOpacity: 6,
                shadowRadius: 1,
            },
            android: {
                elevation: 1,
            },
        }),
    },
    ratingSty: {

    },
    txtCardContainer: {
        backgroundColor: '#F98324',
        flex: 1,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 10
    },
    bkgColor: {
        backgroundColor: '#bfa',
    },
    contentContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    thumbnailStyle: {
        borderTopLeftRadius: 10,
        width: 170,
        height: 115
    },
    thumbnailContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10
    },
}

export default CardWrapper;