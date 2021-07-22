import * as actions from './actionTypes';

const counter = (state = 0, action = {}) => {
    switch (action.type) {
        case actions.ACTION_TYPE_INCREMENT:
            return state + 1;
        case actions.ACTION_TYPE_DECREMENT:
            return state - 1;
        default:
            return state;
    }
};

export default counter;
