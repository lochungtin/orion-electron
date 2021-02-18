export const SET_CLIENT = 'SET_CLIENT';
export const setClient = payload => ({
    type: SET_CLIENT,
    payload,
});

export const SET_DEVICE = 'SET_DEVICE';
export const setDevice = payload => ({
    type: SET_DEVICE,
    payload,
});

export const SET_FS = 'SET_FS';
export const setFS = payload => ({
    type: SET_FS,
    payload,
});

export const SET_LOGIN = 'SET_LOGIN';
export const setLogin = payload => ({
    type: SET_LOGIN,
    payload,
});

export const SET_LOGOUT = 'SET_LOGOUT';
export const setLogout = () => ({
    type: SET_LOGOUT,
});

export const SET_SEPARATOR = 'SET_SEPARATOR';
export const setSeparator = payload => ({
    type: SET_SEPARATOR,
    payload,
});
