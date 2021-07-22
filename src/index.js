import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import {createStore} from 'redux';
// import {Provider} from 'react-redux';
import {createStore} from './lib/redux';
import {Provider} from './lib/react-redux';
import rootReducer from './store';

const store = createStore(rootReducer);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('root'));
