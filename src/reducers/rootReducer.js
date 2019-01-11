import { combineReducers } from 'redux';
import simpleReducer from './simpleReducer';
import itemReducer from './itemReducer';
export default combineReducers({
 simpleReducer,
 itemReducer
});
