import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import ChatMessageReducer from './ChatMessageReducer';
import CameraReducer from './CameraReducer';

export default combineReducers({
  auth: AuthReducer,
  messages: ChatMessageReducer,
  cameraImg: CameraReducer
});
