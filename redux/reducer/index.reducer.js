import { combineReducers } from "redux";

import registerReducer from "./register.reducer";
import itemReducer from './home.reducer'
export default combineReducers({
    registerReducer,
    itemReducer
});