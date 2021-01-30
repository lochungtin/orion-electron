import { combineReducers } from 'redux';

import { SET_CLIENT, SET_LOGIN, SET_LOGOUT } from './action';

const acc = (acc = null, action) => {
    switch (action.type) {
        case SET_LOGIN:
            return action.payload;
        case SET_LOGOUT:
            return null;
    }
    return acc;
}

const clt = (clt = {}, action) => {
    switch (action.type) {
        case SET_CLIENT:
            return action.payload;
    }
    return clt;
}

export default combineReducers({
    acc: acc,
    clt: clt,
});