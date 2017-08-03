import moment from 'moment';
import {
    TXT_CHAT_MESSAGE,
    TXT_RESPONSE_MESSAGE,
} from '../actions/types';

import data from './data';
import numeral from 'numeral';

const IMG_BASE = './food_photos';
const IMAGES = {
    'antipastosalad': require('./food_photos/antipastosalad/1.jpg'),
    'blackbeanburger': require('./food_photos/blackbeanburger/1.jpg'),
    'caesarsalad': require('./food_photos/caesarsalad/1.jpg'),
    'frenchonionsoup': require('./food_photos/frenchonionsoup/1.jpg'),
    'greekchickenwrap': require('./food_photos/greekchickenwrap/1.jpg'),
    'greencurryfriedrice': require('./food_photos/greencurryfriedrice/1.jpg'),
    'grilledchickencaesarwrap': require('./food_photos/grilledchickencaesarwrap/1.jpg'),
    'grilledsalmon': require('./food_photos/grilledsalmon/1.jpg'),
    'housesalad': require('./food_photos/housesalad/1.jpg'),
    'italianbeefsandwich': require('./food_photos/italianbeefsandwich/1.jpg'),
    'italiancalzone': require('./food_photos/italiancalzone/1.jpg'),
    'lentilsoup': require('./food_photos/lentilsoup/1.jpg'),
    'papayasalad': require('./food_photos/papayasalad/1.jpg'),
    'peachandstrawberrywithsoymilksmoothie': require('./food_photos/peachandstrawberrywithsoymilksmoothie/1.jpg'),
    'ranchfriedchickensalad': require('./food_photos/ranchfriedchickensalad/1.jpg'),
    'sesamegreenbeans': require('./food_photos/sesamegreenbeans/1.jpg'),
    'steamedbroccoli': require('./food_photos/steamedbroccoli/1.jpg'),
    'steamedchickenwithvegetables': require('./food_photos/steamedchickenwithvegetables/1.jpg'),
    'sweetandsourshrimp': require('./food_photos/sweetandsourshrimp/1.jpg'),
    'sweetheartroll': require('./food_photos/sweetheartroll/1.jpg'),
    'sweetpotatotempuraroll': require('./food_photos/sweetpotatotempuraroll/1.jpg'),
    'tunasalad': require('./food_photos/tunasalad/1.jpg'),
    'vegetariandelight': require('./food_photos/vegetariandelight/1.jpg'),
}

const PAYLOADS = data.map((item, index) => {
    const folderName = item.food_name.replace(/\s/g, '').toLowerCase();
    return {
        pic: IMAGES[folderName],
        name: item.food_name,
        restaurantName: item.restaurant_name,
        highlights: item.tags.slice(0,2),
        rating: item.restaurant_rating,
        tags: item.tags,
        distance: Math.random() * 10,
        price: numeral(Math.random() * 30).format('0.00')
    }
});

const m = Math.ceil(PAYLOADS.length / 3);
const n = Math.ceil(2 * PAYLOADS.length / 3);

const INIT_STATE = [
    {
        msg_id: `temp_${generateGuuId()}`,
        timeStamp: moment().toISOString(),
        direction: 'ingoing',
        body: {
            type: 'card',
            payload: PAYLOADS.slice(0, m)
        }
    }, {
        msg_id: `temp_${generateGuuId()}`,
        timeStamp: moment().toISOString(),
        direction: 'ingoing',
        body: {
            type: 'card',
            payload: PAYLOADS.slice(m, n)
        }
    }, {
        msg_id: `temp_${generateGuuId()}`,
        timeStamp: moment().toISOString(),
        direction: 'ingoing',
        body: {
            type: 'card',
            payload: PAYLOADS.slice(n)
        }
    }
];



// const INIT_STATE = [{
//     msg_id: `temp_${generateGuuId()}`,
//     timeStamp: moment().toISOString(),
//     direction: 'ingoing',
//     body: {
//         type: 'card',
//         payload: [
//             {
//                 "pic": "https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg",
//                 "name": "Smith & Wollensky Rib-eye",
//                 'highlights': ['Healthy', 'Salad'],
//                 "suggestion": "Rich in Protein",
//                 "rating": 4,
//                 "tags": ['Healthy', 'Salad'],
//                 "distance": 4.1,
//                 "price": 24.99
//             }, {
//                 "pic": "https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg",
//                 "name": "Smith & Wollensky Rib-eye",
//                 'highlights': ['Healthy', 'Salad'],
//                 "suggestion": "Rich in Protein",
//                 "rating": 4,
//                 "tags": ['healthy', 'protein'],
//                 "distance": 4.1,
//                 "price": 24.99
//             }, {
//                 "pic": "https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg",
//                 "name": "Smith & Wollensky Rib-eye",
//                 'highlights': ['Healthy', 'Salad'],
//                 "suggestion": "Rich in Protein",
//                 "rating": 4,
//                 "tags": [],
//                 "distance": 4.1,
//                 "price": 24.99
//             }, {
//                 "pic": "https://static.pexels.com/photos/46239/salmon-dish-food-meal-46239.jpeg",
//                 "name": "Smith & Wollensky Rib-eye",
//                 'highlights': ['Healthy', 'Salad'],
//                 "suggestion": "Rich in Protein",
//                 "rating": 4,
//                 "tags": [],
//                 "distance": 4.1,
//                 "price": 24.99
//             }
//         ]
//     },
// }]

export default (state = INIT_STATE, action) => {

    let message;
    switch (action.type) {
        case TXT_CHAT_MESSAGE:
            message = generateTxtMsg(action.payload);
            return [...state, message];
        case TXT_RESPONSE_MESSAGE:
            const {positive, something} = action.payload;
            const txtMessage = generateTxtResponse(positive, something);
            const cardMessage = generateCardResponse(PAYLOADS, positive, something);
            if(cardMessage) {
                const divider = generateDivider();
                const lastTxt = state.splice(state.length-1, 1);
                return [...state, divider, ...lastTxt, txtMessage, ...cardMessage];
            }
            return [...state];
        default: 
            return state;
    }
};


function generateGuuId() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
}

const generateTxtMsg = (msg) => {
    const id = `temp_${generateGuuId()}`;
    const timeStamp = moment().toISOString();
    return {
        msg_id: id,
        timeStamp,
        direction: 'outgoing',
        body: {
            type: 'txt',
            msg
        }
    };
};

const generateTxtResponse = (positive, something) => {
    const id = `temp_${generateGuuId()}`;
    const timeStamp = moment().toISOString();
    const modal = positive ? 'with' : 'without';

    return {
        msg_id: id,
        timeStamp,
        direction: 'ingoing',
        body: {
            type: 'txt',
            msg: `Suggesting something ${modal} "${something.toString()}" for you.`
        }
    }
}

const generateCardResponse = (msgs, positive, filters) => {
    let resPayload = [];

    const res = msgs.filter( item => {
        for(let val of filters) {
            if(item.tags.map(item => item.toLowerCase()).includes(val.toLowerCase())) return positive;
            return !positive;
        }
    } )

    resPayload = [...resPayload, ...res];

    const m = Math.ceil(resPayload.length / 3);
    const n = Math.ceil(2 * resPayload.length / 3);

    return resPayload.length === 0 ? null : 
    [{
        msg_id: `temp_${generateGuuId()}`,
        timeStamp: moment().toISOString(),
        direction: 'ingoing',
        body: {
            type: 'card',
            payload: resPayload.slice(0,m)
        }
    }, {
        msg_id: `temp_${generateGuuId()}`,
        timeStamp: moment().toISOString(),
        direction: 'ingoing',
        body: {
            type: 'card',
            payload: resPayload.slice(m,n)
        }
    }, {
        msg_id: `temp_${generateGuuId()}`,
        timeStamp: moment().toISOString(),
        direction: 'ingoing',
        body: {
            type: 'card',
            payload: resPayload.slice(n)
        }
    }]
}

function generateDivider () {
    return {
        msg_id: 'divider',
        timeStamp: moment().toISOString(),
        direction: 'ingoing',
        body: {
            type: 'divider',
        }
    }
}