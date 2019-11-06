import {
    acceptRequestAddToFriendQuery,
    addToFriendQuery,
    authUserQuery, deleteUserFromFriendsQuery, getNewTokenQuery,
    getUsersQuery,
    loginUserQuery,
    registerUserQuery
} from "../Services/user.service";


export const registerUser = (user: any) => {
    let success = (data: any, dispatch: any) => {
        dispatch({type: 'GET_USER', user: data.user});
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('refreshToken', data.refreshToken);
        let letter = data.time.slice(-1);
        switch (letter) {
            case 'm':
                let m = new Date().getTime() / 1000;
                m += parseInt(data.time)*60;
                sessionStorage.setItem('endTokenValidityTime', String(m));
                break;
            case 's':
                let s = new Date().getTime() / 1000;
                s += parseInt(data.time);
                s = Math.trunc(s);
                sessionStorage.setItem('endTokenValidityTime', String(s));
                break;
            default:
                alert( "Нет таких значений" );
        }
        dispatch({type: 'CHANGE_TO_FALSE'});
    }

    let faild = (er: any, dispatch: any) => {
        dispatch({type: 'CHANGE_TO_FALSE'});
        alert(er.statusText);
    }

    return (dispatch: any)  => {
        dispatch({type: 'CHANGE_TO_TRUE'});
        registerUserQuery(dispatch, user)
            .then(res => res.ok ? res.json() : Promise.reject(res))
            .then((data: any) => {
                success(data, dispatch);
            })
            .catch((er: any) => {
                faild(er, dispatch)
            })

    }
};


export const loginUser = (user: any) => {
    let success = (data: any, dispatch: any) => {
        dispatch({type: 'GET_USER', user: data.user});
        sessionStorage.setItem('accessToken', data.accessToken);
        sessionStorage.setItem('refreshToken', data.refreshToken);
        let letter = data.time.slice(-1);
        switch (letter) {
            case 'm':
                let m = new Date().getTime() / 1000;
                m += parseInt(data.time)*60;
                m = Math.trunc(m);
                sessionStorage.setItem('endTokenValidityTime', String(m));
                break;
            case 's':
                let s = new Date().getTime() / 1000;
                s += parseInt(data.time);
                s = Math.trunc(s);
                sessionStorage.setItem('endTokenValidityTime', String(s));
                break;
            default:
                alert( "Нет таких значений" );
        }
        dispatch({type: 'CHANGE_TO_FALSE'});
    }

    let faild = (er: any, dispatch: any) => {
        dispatch({type: 'CHANGE_TO_FALSE'});
    }

    return (dispatch: any)  => {
        dispatch({type: 'CHANGE_TO_TRUE'});
        loginUserQuery(dispatch, user)
            .then((response: { json: () => void; }) => response.json())
            .then((data: any) => {
                success(data, dispatch);
            })
            .catch((er: any) => {
                faild(er, dispatch)
            })
    }
};

export const authUser = (id: any) => {
    let success = (data: any, dispatch: any) => {
        dispatch({type: 'CHANGE_ISLOGIN_TO_TRUE'});
        dispatch({type: 'GET_USER', user: data.user});
        dispatch({type: 'CHANGE_TO_FALSE'});
    }

    let faild = (er: any, dispatch: any) => {
        dispatch({type: 'CHANGE_TO_FALSE'});
    }

    return (dispatch: any) => {
        dispatch({type: 'CHANGE_TO_TRUE'});
        authUserQuery(dispatch)
            .then((response: { json: () => void; }) => response.json())
            .then((data: any) => {
                if (data.user._id === id) {
                    getUsers(dispatch);
                    success(data, dispatch);
                } else {
                    dispatch({type: 'CHANGE_TO_FALSE'});
                }
            })
            .catch((er: any) => {
                faild(er, dispatch)
            })
    }
};

export const getUsers = (dispatch: any) => {
    let success = (data: any, dispatch: any) => {
        dispatch({type: 'GET_USERS', users: data});
    }

    let faild = (er: any) => {
    }

        getUsersQuery()
            .then((response: { json: () => void; }) => response.json())
            .then((data: any) => {
                success(data, dispatch);
            })
            .catch((er: any) => {
                faild(er)
            })
};

export const queryToAddToFriend = (id: any, user: any) => {
    console.log('queryToAddToFriend')
    let success = (data: any, dispatch: any) => {
        console.log(data)
        dispatch({type: 'GET_USER', user: data});
    }

    let faild = (er: any) => {
        alert(er)
    }

    return (dispatch: any) => {
        console.log('dispatch')
        delete user['_id'];
        delete user['__v'];
        addToFriendQuery(id, user)
            .then((response: { json: () => void; }) => response.json())
            .then((data: any) => {
                console.log(data)
                success(data, dispatch);
            })
            .catch((er: any) => {
                console.log(er)
                faild(er)
            })
    }
};


export const acceptRequestAddToFriend = (id: any, user: any) => {
    let success = (data: any, dispatch: any) => {
        console.log(data);
        dispatch({type: 'GET_USER', user: data});
    }

    let faild = (er: any) => {
    }

    return (dispatch: any) => {
        delete user['_id'];
        delete user['__v'];
        acceptRequestAddToFriendQuery(id, user)
            .then((response: { json: () => void; }) => response.json())
            .then((data: any) => {
                success(data, dispatch);
            })
            .catch((er: any) => {
                faild(er)
            })
    }
};

export const getNewToken = () => {
    let success = (data: any, dispatch: any) => {
        let letter = data.time.slice(-1);
        switch (letter) {
            case 'm':
                let m = new Date().getTime() / 1000;
                m += parseInt(data.time)*60;
                sessionStorage.setItem('endTokenValidityTime', String(m));
                break;
            case 's':
                let s = new Date().getTime() / 1000;
                s += parseInt(data.time);
                s = Math.trunc(s);
                sessionStorage.setItem('endTokenValidityTime', String(s));
                break;
            default:
                alert( "Нет таких значений" );
        }
        sessionStorage.setItem('accessToken', data.accessToken)
    }

    let faild = (er: any) => {
    }

    return (dispatch: any) => {
        let user = {token: sessionStorage.getItem('refreshToken')};
        getNewTokenQuery(user)
            .then((response: { json: () => void; }) => response.json())
            .then((data: any) => {
                success(data, dispatch);
            })
            .catch((er: any) => {
                faild(er)
            })
    }
};


export const deleteUserFromFriends = (id: any) => {
    let success = (data: any, dispatch: any) => {
        dispatch({type: 'GET_USER', user: data});
    }

    let faild = (er: any) => {
    }

    return (dispatch: any) => {
        let user = {token: sessionStorage.getItem('refreshToken')};
        deleteUserFromFriendsQuery(id)
            .then((response: { json: () => void; }) => response.json())
            .then((data: any) => {
                success(data, dispatch);
            })
            .catch((er: any) => {
                faild(er)
            })
    }
};
