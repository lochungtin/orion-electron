import React from 'react';
import { Provider } from 'react-redux';

import { store } from './redux/store';
import AppNav from './navigation';

import './App.css';
import './css/device.css';
import './css/loading.css';
import './css/login.css';
import './css/main.css';
import './css/nav.css';
import 'react-circular-progressbar/dist/styles.css';

export default class App extends React.Component {

    render() {
        return (
            <Provider store={store}>
                <AppNav />
            </Provider>
        );
    }
}