import React  from 'react';
import CardWrapper from '../wrappers/CardWrapper';
import SwipCard from '../wrappers/SwipCard';
import FoodClassCard from '../wrappers/FoodClassCard';
import { Text, Divider } from 'react-native-elements'
import { FileSystem } from 'expo';


const MessageBubble = ({ id, outOrIn, timestamp, body, navigation }) => {

    const { textStyle, dividerStyle } = styles;
    const { type } = body;
    const leftOrRight = outOrIn === 'outgoing' ? 'flex-end' : 'flex-start';
    switch (type) {
        case 'txt': 
            return (
                <Text
                    key={id}
                    style={{ ...textStyle, alignSelf: leftOrRight }}
                >
                    {body.msg}
                </Text>
            );
        case 'img':
            console.log(type);
        case 'card':
            const { payload } = body;
            return (
                <SwipCard
                    key={id}
                    cards = {payload}
                    navigation={navigation}
                />
            );
        case 'divider':
            return <Divider style={dividerStyle} />
        case 'imgRecognition':
            const { picURI, foodClass, picBase64 } = body.payload;
            // FileSystem.readDirectoryAsync(
            //     FileSystem.documentDirectory + 'photos'
            // )
            return (
                <FoodClassCard 
                    picURI = {picURI}
                    picBase64 = {picBase64}
                    foodClass = {foodClass}
                />)
        default:
            console.log(type);
    }
}

const styles = {
    textStyle: {
        alignItems:'center',
        marginTop: 10,
        marginLeft:30,
        marginRight:30,        
        minHeight: 40,
        fontSize: 22
    },
    dividerStyle: {
        backgroundColor: '#999',
        height:2,
        marginTop:40,

    }
};

export { MessageBubble };
