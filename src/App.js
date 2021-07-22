import React from 'react';
// import {connect} from 'react-redux';
import {connect} from './lib/react-redux';
import * as actions from './store/actionTypes';

function App(props) {
    const {counter, random, increase, decrease, genRandom} = props;

    return (
        <div className="App">
            <h1>{counter}</h1>
            <h1>{random}</h1>
            <p>
                <button onClick={increase}>Increase</button>
                <button onClick={decrease}>Decrease</button>
                <button onClick={genRandom}>Random</button>
            </p>
        </div>
    );
}


const mapStateToProps = (state) => {
    return {
        counter: state.counter,
        random: state.random
    };
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         increase: () => {
//             dispatch({type: actions.ACTION_TYPE_INCREMENT});
//         },
//         decrease: () => {
//             dispatch({type: actions.ACTION_TYPE_DECREMENT});
//         },
//         genRandom: () => {
//             dispatch({type: actions.ACTION_TYPE_RANDOM});
//         }
//     }
// };

const increase = () => {
    return {type: actions.ACTION_TYPE_INCREMENT};
};

const decrease = () => {
    return {type: actions.ACTION_TYPE_DECREMENT};
};

const genRandom = () => {
    return {type: actions.ACTION_TYPE_RANDOM};
};

export default connect(mapStateToProps, /*mapDispatchToProps*/ {increase, decrease, genRandom})(App);
