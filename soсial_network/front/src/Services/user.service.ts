import {socket} from "../Socket/socket";

const defaultHeaders = {
    'Accept': 'application/json', 
    'Content-Type': 'application/json'
};

const headerWithAuthorization = () => ({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
});


export const getUsersQuery = () => {
    return fetch(`/users`, {
        method: 'GET',
        headers: defaultHeaders,
    })
}

export const getUsersByLettersQuery = (letters: any) => {
    return fetch(`/usersByLetters/${letters}`, {
        method: 'GET',
        headers: defaultHeaders,
    })
}

export const getUserChatsQuery = (id: any) => {
    return fetch(`/chats/${id}`, {
        method: 'GET',
        headers: defaultHeaders,
    })
}

export const getMessagesQuery = (id: any, n :any) => {
    return fetch(`/messages/${id}/${n}`, {
        method: 'GET',
        headers: headerWithAuthorization(),
    })
}

export const getUsersFriendsQuery = () => {
    return fetch(`/getUsersFriends`, {
        method: 'GET',
        headers: headerWithAuthorization(),
    })
}

export const addToFriendQuery = (id: any, user: any) => {
    console.log('и в сервисы попали')
    return fetch(`/friendRequest/${id}`, {
        body: JSON.stringify(user),
        method: 'PUT',
        headers: headerWithAuthorization(),
    })
}

export const acceptRequestAddToFriendQuery = (id: any, user: any) => {
    return fetch(`/acceptFriendRequest/${id}`, {
        body: JSON.stringify(user),
        method: 'PUT',
        headers: headerWithAuthorization(),
    })
}

export const getNewTokenQuery = (user: any) => {
    console.log('user ', user)
    return fetch(`/token`, {
        body: JSON.stringify(user),
        method: 'POST',
        headers: defaultHeaders,
    })
}


export const deleteUserFromFriendsQuery = (id: any) => {
    return fetch(`/deleteFriend/${id}`, {
        method: 'PUT',
        headers: headerWithAuthorization(),
    })
}

export const deleteQueryToAddToFriendsQuery = (id: any) => {
    return fetch(`/cancelFriendRequest/${id}`, {
        method: 'PUT',
        headers: headerWithAuthorization(),
    })
}

export const getPublicInfoQuery = (id: any) => {
    return fetch(`/userPublicInfo//${id}`, {
        method: 'GET',
        headers: defaultHeaders,
    })
}

export const addChatQuery = (body: any) => {
    return fetch(`/messages`, {
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(body)
    })
}


export const createConnectToSocket = (id: any) => {
    console.log('2')
    socket.emit('register', id);
}

export const createSocketRoomQuery = (id: any, id2: any) => {
    console.log('2')
    socket.emit('createRoom', id, id2);
}

export const sentQueryToAddToFriendsSocket = (id: any) => {
    socket.emit('private_chat',{
        to : id,
        message : 'hello world'
    });
}

export const sentMessageSocketQuery = (id: any, message: any) => {
    console.log('id ', id);
    socket.emit('messageFromClient',{
        to : id,
        message : message,
        from: sessionStorage.getItem('id')
    });
}
