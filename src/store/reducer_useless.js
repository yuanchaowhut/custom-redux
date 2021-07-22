import {combineReducers} from "../lib/redux";

const counter = (state = 0, action = {}) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
};


const random = (state = 0, action = {}) => {
    switch (action.type) {
        case 'RANDOM':
            return Math.random();
        default:
            return state;
    }
};

export default combineReducers({
    counter,
    random
});
