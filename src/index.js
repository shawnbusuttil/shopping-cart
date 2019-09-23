import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from "react-redux";
import { compose, combineReducers, createStore } from "redux";

import cartReducer from "./store/cart/reducer";
import productsReducer from "./store/products/reducer";

import './index.scss';

import App from './App';

const appReducer = combineReducers({
    cart: cartReducer,
    products: productsReducer
});

const appState = createStore(appReducer);

const appWithStore = (
    <Provider store={appState}>
        <App />
    </Provider>
) 

ReactDOM.render(appWithStore, document.getElementById('root'));