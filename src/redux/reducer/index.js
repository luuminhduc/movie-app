import {combineReducers} from 'redux';
import themeReducer from './themeReducer';
import movieReducer from './movieReducer';
export default combineReducers({
    themeReducer,
    movieReducer,
})