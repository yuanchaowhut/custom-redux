import * as actions from './actionTypes';

const random = (state = 0, action = {}) => {
    switch (action.type) {
        case actions.ACTION_TYPE_RANDOM:
            return Math.random();
        default:
            return state;
    }
};

export default random;
