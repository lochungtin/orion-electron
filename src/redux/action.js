export const SET_CLIENT = 'SET_CLIENT';
export const setClient = payload => ({
    type: SET_CLIENT,
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

