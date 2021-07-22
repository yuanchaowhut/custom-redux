import React from 'react';
import PropTypes from 'prop-types';

function App(props) {
    const {state, onIncrement, onDecrement, onRandom} = props;

    return (
        <div className="App">
            <h1>{state.counter}</h1>
            <h1>{state.random}</h1>
            <p>
                <button onClick={onIncrement}>Increase</button>
                <button onClick={onDecrement}>Decrease</button>
                <button onClick={onRandom}>Random</button>
            </p>
        </div>
    );
}

App.propTypes = {
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired,
    onRandom: PropTypes.func.isRequired
};

export default App;
