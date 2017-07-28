import { TXT_CHAT_MESSAGE, TXT_RESPONSE_MESSAGE } from './types';
import {phraseParser} from '../utils/PhraseParser';

export const messageSent = (message) => {
    return {
        type: TXT_CHAT_MESSAGE,
        payload: message
    };
};

export const getResponse = (message) => {
    const response = phraseParser(message);

    return {
        type: TXT_RESPONSE_MESSAGE,
        payload: response
    };
};
