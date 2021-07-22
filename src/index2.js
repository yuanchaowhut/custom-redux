import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as actions from './store/actionTypes';
import { createStore } from './lib/redux';
import reducer from './store';

const store = createStore(reducer);

const render = () => {
    ReactDOM.render(
        <App
            onIncrement={ () => store.dispatch({ type: actions.ACTION_TYPE_INCREMENT }) }
            onDecrement={ () => store.dispatch({ type: actions.ACTION_TYPE_DECREMENT }) }
            onRandom={ () => store.dispatch({ type: actions.ACTION_TYPE_RANDOM }) }
            state={ store.getState() }
        />, document.getElementById('root'));
};

render();

store.subscribe(render);
