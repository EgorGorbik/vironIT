import {changeLoaderToFalse, changeLoaderToTrue} from "../ActionCreators/loading.action";
import {loginUserQuery} from "../../Services/authorization.service";
import {setAuthUser, setErrorAuthUser} from "../ActionCreators/users.action";
import {getAllUsers, getUserChats} from "./users.thunk";
import {registerUserQuery} from "../../Services/authorization.service";
import {authUserQuery} from "../../Services/authorization.service";
import {connectSocket} from "./socket.thunk";
import {changeIsLoginToTrue} from "../ActionCreators/login.action";

const setToLocalStorage = (accessToken: any, refreshToken: any, id: any, time: any) => {
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
    sessionStorage.setItem('id', id);
    sessionStorage.setItem('time', time);
    let letter = time.slice(-1);
    switch (letter) {
        case 'm':
            let m = new Date().getTime() / 1000;
            m += parseInt(time)*60;
            m = Math.trunc(m);
            sessionStorage.setItem('endTokenValidityTime', String(m));
            break;
        case 's':
            let s = new Date().getTime() / 1000;
            s += parseInt(time);
            s = Math.trunc(s);
            sessionStorage.setItem('endTokenValidityTime', String(s));
            break;
        default:
            alert( "Нет таких значений" );
    }
}


export const loginUser = (user: any) => {
    return (dispatch: any)  => {
        dispatch(changeLoaderToTrue());
        loginUserQuery(user)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then((data: any) => {
                dispatch(setAuthUser(data.user));
                dispatch(getAllUsers());
                dispatch(getUserChats(data.user._id));
                setToLocalStorage(data.accessToken, data.refreshToken, data.user._id, data.time);
                dispatch(changeIsLoginToTrue());
            })
            .catch((er: any) => {
                alert(er.statusText);
                dispatch(setErrorAuthUser(er.statusText));
                dispatch(changeLoaderToFalse());
            })
    }
};

export const registerUser = (user: any) => {
    return (dispatch: any)  => {
        dispatch(changeLoaderToTrue());
        registerUserQuery(user)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then((data: any) => {
                dispatch(setAuthUser(data.user));
                dispatch(getAllUsers());
                dispatch(getUserChats(data.user._id));
                setToLocalStorage(data.accessToken, data.refreshToken, data.user._id, data.time);
                dispatch(changeIsLoginToTrue());
                dispatch(changeLoaderToFalse());
            })
            .catch((er: any) => {
                dispatch(setErrorAuthUser(er.statusText))
            })
    }
};

export const isAuthUser = () => {
    return (dispatch: any) => {
        dispatch(changeLoaderToTrue());
        dispatch(getAllUsers());
        authUserQuery()
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then((data: any) => {
                dispatch(getUserChats(data.user._id));
                dispatch(setAuthUser(data.user));
                dispatch(connectSocket(data.user._id));
                dispatch(changeIsLoginToTrue());
            })
            .catch((er: any) => {
                dispatch(setErrorAuthUser(er.statusText))
                dispatch(changeLoaderToFalse());
            })
    }
};
