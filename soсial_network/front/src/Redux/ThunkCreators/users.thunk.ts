import {
    acceptRequestAddToFriendQuery, addChatQuery, addToFriendQuery, createConnectToSocket, deleteQueryToAddToFriendsQuery, deleteUserFromFriendsQuery,
    getNewTokenQuery, getPublicInfoQuery, getUserChatsQuery,
    getUsersQuery, sentMessageSocketQuery, sentQueryToAddToFriendsSocket,
} from "../../Services/user.service";
import {changeLoaderToFalse, changeLoaderToTrue} from "../ActionCreators/loading.action";
import {
    setAuthUser,
    setErrorAuthUser,
    setErrorUser, setErrorUserChats,
    setErrorUsers,
    setUser, setUserChats,
    setUsers
} from "../ActionCreators/users.action";
import {changeIsLoginToTrue} from "../ActionCreators/login.action";
import {connectSocket} from "./socket.thunk";

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



export const getAllUsers = () => (dispatch: any) => {
    getUsersQuery()
        .then((response: { json: () => void; }) => response.json())
        .then((data: any) => {
            dispatch(setUsers(data));
        })
        .catch((er: any) => {
            dispatch(setErrorUsers(er.statusText))
        })
};

export const getUserChats = (id: any) => (dispatch: any) => {
    getUserChatsQuery(id)
        .then((response: { json: () => void; }) => response.json())
        .then((data: any) => {
            dispatch(setUserChats(data));
            dispatch(changeLoaderToFalse());
        })
        .catch((er: any) => {
            console.log('провальное получение чвтов')
            dispatch(setErrorUserChats(er.statusText))
            dispatch(changeLoaderToFalse());
        })
};


export const getNewToken = () => {
    return (dispatch: any) => {
        let user = {token: sessionStorage.getItem('refreshToken')};
        dispatch(changeLoaderToTrue());
        getNewTokenQuery(user)
            .then((response: { json: () => void; }) => response.json())
            .then((data: any) => {
                setToLocalStorage(data.accessToken, sessionStorage.getItem('refreshToken') , sessionStorage.getItem('id') , data.time);
                dispatch(changeLoaderToFalse());
            })
            .catch((er: any) => {
                dispatch(setErrorAuthUser(er.statusText))
                dispatch(changeLoaderToFalse());
            })
    }
};

export const acceptRequestAddToFriend = (id: any, user: any) => {
    return (dispatch: any) => {
        delete user['_id'];
        delete user['__v'];
        acceptRequestAddToFriendQuery(id, user)
            .then((response: { json: () => void; }) => response.json())
            .then((data: any) => {
                dispatch(setAuthUser(data));
                dispatch(changeLoaderToFalse());
            })
            .catch((er: any) => {
                dispatch(setErrorAuthUser(er.statusText))
                dispatch(changeLoaderToFalse());
            })
}
};

export const deleteUserFromFriends = (id: any) => {
    return (dispatch: any) => {
        deleteUserFromFriendsQuery(id)
            .then((response: { json: () => void; }) => response.json())
            .then((data: any) => {
                dispatch(setAuthUser(data));
                dispatch(changeLoaderToFalse());
            })
            .catch((er: any) => {
                dispatch(setErrorAuthUser(er.statusText))
                dispatch(changeLoaderToFalse());
            })
    }
};


export const deleteQueryToAddToFriends = (id: any) => {
    return (dispatch: any) => {
        deleteQueryToAddToFriendsQuery(id)
            .then((response: { json: () => void; }) => response.json())
            .then((data: any) => {
                dispatch(setAuthUser(data));
                dispatch(changeLoaderToFalse());
            })
            .catch((er: any) => {
                dispatch(setErrorAuthUser(er.statusText))
                dispatch(changeLoaderToFalse());
            })
    }
};

export const queryToAddToFriend = (id: any, user: any) => {
    return (dispatch: any) => {
        console.log('dispatch')
        delete user['_id'];
        delete user['__v'];
        addToFriendQuery(id, user)
            .then((response: { json: () => void; }) => response.json())
            .then((data: any) => {
                dispatch(queryToAddToFriendsSocket(id))
                dispatch(setAuthUser(data));
                dispatch(changeLoaderToFalse());
            })
            .catch((er: any) => {
                dispatch(setErrorAuthUser(er.statusText))
                dispatch(changeLoaderToFalse());
            })
    }
};


export const getPublicInfo = (id: any) => {
    return (dispatch: any) => {
        dispatch(changeLoaderToTrue());
        getPublicInfoQuery(id)
            .then((response: { json: () => void; }) => response.json())
            .then((data: any) => {
                dispatch(setUser(data));
                dispatch(changeLoaderToFalse());
            })
            .catch((er: any) => {
                alert('финея давай всё по новой')
                dispatch(setErrorUser(er.statusText))
                dispatch(changeLoaderToFalse());
            })
    }
};

export const queryToAddToFriendsSocket = (id: any) => {
    return (dispatch: any) => {
        sentQueryToAddToFriendsSocket(id)
    }
};

export const sentMessageSocket = (id: any, message: any, chatId: any) => {
    console.log('sanki')
    return (dispatch: any) => {
        sentMessageSocketQuery(id, message, chatId)
    }
};


export const addChat = (id1: any, id2: any) => {
    return (dispatch: any) => {
        dispatch(changeLoaderToTrue());
        let chat = {members: [id1, id2], messages: []}
        addChatQuery(chat)
            .then((response: { json: () => void; }) => response.json())
            .then((data: any) => {
                dispatch(getUserChats(id1));
                dispatch(changeLoaderToFalse());
            })
            .catch((er: any) => {
                dispatch(changeLoaderToFalse());
            })
    }
};






