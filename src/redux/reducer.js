import { combineReducers } from 'redux';

import { SET_ACTION, SET_CLIENT, SET_DEVICE, SET_DEVICE_LOCAL, SET_LOCAL_BACKUP_PLAN, SET_LOCAL_FS, SET_LOGIN, SET_LOGOUT, SET_REMOTE_FS, SET_SEPARATOR, } from './action';

const acc = (acc = null, action) => {
    switch (action.type) {
        case SET_LOGIN:
            return action.payload;
        case SET_LOGOUT:
            return null;
        default:
            return acc;
    }
}

const act = (act = '', action) => action.type === SET_ACTION ? action.payload : act;

const dev = (dev = {}, action) => action.type === SET_DEVICE ? action.payload : dev;

const clt = (clt = {}, action) => action.type === SET_CLIENT ? action.payload : clt;

const fsInit = {
    root: {
        local: [],
        remote: [],
    },
    separator: '/',
}
const fs = (fs = fsInit, action) => {
    let update = { ...fs };
    switch (action.type) {
        case SET_LOCAL_FS:
            update.root.local = action.payload;
            return update;
        case SET_REMOTE_FS:
            update.root.remote = action.payload;
            return update;
        case SET_SEPARATOR:
            update.separator = action.payload;
            return update;
        default:
            return update;
    }
}


const lclInit = {
    device: '',
    plan: [],
}
const lcl = (lcl = lclInit, action) => {
    let update = { ...lcl }
    switch (action.type) {
        case SET_DEVICE_LOCAL:
            update.device = action.payload;
            return update;
        case SET_LOCAL_BACKUP_PLAN:
            update.plan = action.payload;
            return update;
        default:
            return update;
    }
}

export default combineReducers({
    acc: acc,
    act: act,
    clt: clt,
    dev: dev,
    fs: fs,
    lcl: lcl,
});