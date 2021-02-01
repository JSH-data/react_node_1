import { combineReducers } from 'redux'; // 흩어져 있는 리듀스들을 하나로 모아줍니다. 
import user from './user_reducer';

const rootReducer = combineReducers({
    user
})

export default rootReducer;