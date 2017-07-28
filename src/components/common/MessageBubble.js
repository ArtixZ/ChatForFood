import React  from 'react';
import CardWrapper from '../wrappers/CardWrapper';
import SwipCard from '../wrappers/SwipCard';
import { Text, Divider } from 'react-native-elements'


const MessageBubble = ({ id, outOrIn, timestamp, body }) => {

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
                    cards = {payload}
                />
            );
        case 'divider':
            return <Divider style={dividerStyle} />
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
