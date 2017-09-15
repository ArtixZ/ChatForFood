import { 
    CAMERA_IMAGE_URI,
    CAMERA_IMAGE_FOOD_IMG
 } from './types';

import { sendFoodClass } from './Chat';

const RESQUESTED_TYPES = "food_class_from_image";
 
export const selectCameraImg = (image) => {
    return (dispatch, getState) => {

        if (image.uri) {
            dispatch(cameraImg(image.uri));
        }
        if (image.base64) {
            let data = {
                "requested_types": [RESQUESTED_TYPES]
            }
            data['image'] = image.base64;

            fetch('http://34.201.144.15:18780/olive/classifier', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(res => {
                dispatch(imgFoodClass(res[RESQUESTED_TYPES]));
                dispatch(sendFoodClass(image.uri, image.base64, res[RESQUESTED_TYPES]));
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