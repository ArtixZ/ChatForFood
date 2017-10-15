import { 
    CAMERA_IMAGE_URI,
    CAMERA_IMAGE_FOOD_IMG
 } from './types';

 import {
    FOOD_CLASS_FROM_IMAGE,
 } from './urls'
import { callAPI } from './utils';
import { sendFoodClass } from './Chat';

 
export const selectCameraImg = (image) => {
    return (dispatch, getState) => {

        if (image.uri) {
            dispatch(cameraImg(image.uri));
        }
        if (image.base64) {
            
            const data = {'image': image.base64};

            
            callAPI('POST', FOOD_CLASS_FROM_IMAGE, data)
            .then(res => {
                dispatch(imgFoodClass(res[FOOD_CLASS_FROM_IMAGE.requestedType[0]]));
                dispatch(sendFoodClass(image.uri, image.base64, res[FOOD_CLASS_FROM_IMAGE.requestedType[0]]));
            })
        }
    }
}

const cameraImg = (uri) => {
    return {
        type: CAMERA_IMAGE_URI,
        payload: uri
    }
}

const imgFoodClass = (foodClass) => {
    return {
        type: CAMERA_IMAGE_FOOD_IMG,
        payload: foodClass
    }
}