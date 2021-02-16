import { combineReducers } from 'redux';

import HomeReducer from './HomeReducer';

export default combineReducers({
    home_reducer: HomeReducer,
});
