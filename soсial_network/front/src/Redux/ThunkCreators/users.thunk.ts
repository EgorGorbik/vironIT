import {
    acceptRequestAddToFriendQuery,
    addChatQuery,
    addToFriendQuery,
    createConnectToSocket,
    deleteQueryToAddToFriendsQuery,
    deleteUserFromFriendsQuery, getMessagesQuery,
    getNewTokenQuery,
    getPublicInfoQuery,
    getUserChatsQuery,
    getUsersByLettersQuery, getUsersFriendsQuery,
    getUsersQuery,
    sentMessageSocketQuery,
    sentQueryToAddToFriendsSocket,
} from "../../Services/user.service";
import {changeLoaderToFalse, changeLoaderToTrue} from "../ActionCreators/loading.action";
import {
    setAuthUser,
    setErrorAuthUser, setErrorFriends,
    setErrorUser, setErrorUserChats,
    setErrorUsers, setFriends, setMessages,
    setUser, setUserChats,
    setUsers
} from "../ActionCreators/users.action";
import {changeIsLoginToTrue} from "../ActionCreators/login.action";
import {connectSocket, createSocketRoom} from "./socket.thunk";
import {isAuthUser} from "./authorization.thunk";

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

export const getMessages = (id: any, n: any) => (dispatch: any) => {
    getMessagesQuery(id, n)
        .then((response: { json: () => void; }) => response.json())
        .then((data: any) => {
            console.log(data)
            dispatch(setMessages(data));
            dispatch(changeLoaderToFalse());
        })
        .catch((er: any) => {
            console.log('провальное получение чвтов')
            dispatch(setErrorUserChats(er.statusText))
            dispatch(changeLoaderToFalse());
        })
};


export const getNewToken = () => {
    console.log('get new token')
    return (dispatch: any) => {
        let user = {token: sessionStorage.getItem('refreshToken')};
        dispatch(changeLoaderToTrue());
        getNewTokenQuery(user)
            .then((response: { json: () => void; }) => response.json())
            .then((data: any) => {
                console.log('получили новый токен')
                console.log(data)
                setToLocalStorage(data.accessToken, sessionStorage.getItem('refreshToken') , sessionStorage.getItem('id') , data.time);
                dispatch(changeLoaderToFalse());
                dispatch(isAuthUser());
            })
            .catch((er: any) => {
                console.log('ошибка получения нового токена')
                alert('ошибка получения нового токена')
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
                dispatch(getUsersFriends());
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
                dispatch(getUsersFriends());
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
                dispatch(getUsersFriends());
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
                dispatch(getUsersFriends());
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
                dispatch(setErrorUser(er.statusText))
                dispatch(changeLoaderToFalse());
            })
    }
};

export const getUsersByLetters = (letters: any) => {
    return (dispatch: any) => {
        getUsersByLettersQuery(letters)
            .then((response: { json: () => void; }) => response.json())
            .then((data: any) => {
                dispatch(setUsers(data));
            })
            .catch((er: any) => {
                dispatch(setErrorUser(er.statusText))
                dispatch(changeLoaderToFalse());
            })
    }
};

export const getUsersFriends = () => {
    return (dispatch: any) => {
        dispatch(changeLoaderToTrue());
        getUsersFriendsQuery()
            .then((response: { json: () => void; }) => response.json())
            .then((data: any) => {
                dispatch(setFriends(data));
               dispatch(changeLoaderToFalse());
            })
            .catch((er: any) => {
                dispatch(setErrorFriends(er));
                dispatch(changeLoaderToFalse());
            })
    }
};

export const queryToAddToFriendsSocket = (id: any) => {
    return (dispatch: any) => {
        sentQueryToAddToFriendsSocket(id)
    }
};

export const sentMessageSocket = (id: any, message: any) => {
    console.log('sanki ', id)
    return (dispatch: any) => {
        sentMessageSocketQuery(id, message)
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
                dispatch(createSocketRoom(id2))
            })
            .catch((er: any) => {
                dispatch(changeLoaderToFalse());
            })
    }
};






