export const registerUserQuery = (dispatch: any, user: any) => {
    return fetch(`/api/registration`, {
        body: JSON.stringify(user),
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
}

export const loginUserQuery = (dispatch: any, user: any) => {
    return fetch(`/api/login`, {
        body: JSON.stringify(user),
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
}

export const authUserQuery = (dispatch: any) => {
    return fetch(`/api/posts`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
        },
    })
}

export const getUsersQuery = () => {
    console.log('мы тут')
    return fetch(`/users`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
    })
}

export const addToFriendQuery = (id: any, user: any) => {
    console.log('и в сервисы попали')
    return fetch(`/friendRequest/${id}`, {
        body: JSON.stringify(user),
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
        },
    })
}

export const acceptRequestAddToFriendQuery = (id: any, user: any) => {
    return fetch(`/acceptFriendRequest/${id}`, {
        body: JSON.stringify(user),
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
        },
    })
}

export const getNewTokenQuery = (user: any) => {
    return fetch(`/token`, {
        body: JSON.stringify(user),
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
}


export const deleteUserFromFriendsQuery = (id: any) => {
    return fetch(`/deleteFriend/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('accessToken')
        },
    })
}
