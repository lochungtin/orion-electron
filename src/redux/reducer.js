import { combineReducers } from 'redux';

import { SET_CLIENT, SET_LOGIN, SET_LOGOUT, SET_SEPARATOR, SET_STORAGE, } from './action';

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

const fsInit = {
    separator: '/',
}
const fs = (fs = fsInit, action) => {
    let update = { ...fs };
    switch (action.type) {
        case SET_SEPARATOR:
            update.separator = action.payload;
            return update;
    }
    return update;
}

export default combineReducers({
    acc: acc,
    clt: clt,
    fs: fs,
});