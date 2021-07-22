// import {combineReducers} from "redux";
import {combineReducers} from "../lib/redux";
import counter from './counterRed';
import random from './randomRed';


const rootReducer = combineReducers({
    counter,
    random
});

export default rootReducer;
