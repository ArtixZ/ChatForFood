import React, { Component } from 'react';
import { View, Image, Text, Dimensions } from 'react-native';
import { Rating, Button, Header, Icon } from 'react-native-elements';
import numeral from 'numeral';

import BarChart from './BarChart';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

class FoodDetail extends Component {
    static navigationOptions = ({navigation}) => ({
        header: ({navigation}) => {
            return (<Header
                        outerContainerStyles={{ backgroundColor: '#fff' }}
                        leftComponent={<Icon 
                                            name='chevron-left'
                                            type='entypo'
                                            color='#43496A'
                                            onPress={()=>navigation.goBack()}
                                        />}
                        centerComponent={{ text: 'Food Profile', style: { fontFamily: 'System', color: '#43496A', fontSize: 20 } }} 
                    />)
        }
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
                    <View style = {abstractSty}>
                        <Text>This is a bowl of lively salad of grilled chicken. </Text>
                    </View>
                </View>
                <View style = {ingredientSty}>
                    <BarChart
                        ingredients = {ingredients}
                    />
                </View>

                <View style = {actionSty}>
                    <Button
                        large
                        iconRight
                        backgroundColor={'#159589'}
                        icon={{name: 'local-cafe'}}
                        title='HAVE IT' />
                </View>
            </View>
        )
    }
}

const styles = {
    detailContainerSty: {
        backgroundColor: '#fff',
        flex: 1
    },
    foodInfoSty: {
        flex: 5,
        flexDirection: 'column'
    },
    abstractSty: {
        marginLeft: 10,
        marginRight: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
        borderRadius: 10,
        height: SCREEN_WIDTH*0.7,
        width: SCREEN_WIDTH*0.8
    },
    contentContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
}

export default FoodDetail;