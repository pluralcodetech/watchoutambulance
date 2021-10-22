import {combineReducers} from 'redux';
import userDataReducer from './userData';

export default combineReducers({
  userData: userDataReducer,
});
