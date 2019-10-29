import {User} from "../Interfaces/Users.interface";

export const getUsers = (dispatch: any) => {
    fetch("http://localhost:3000/users/")
        .then(response => response.json())
        .then(data => {
            dispatch({type: 'GET_USERS', users: data});
            dispatch({type: 'CHANGE_TO_FALSE'});
        })
}

export const getUser = (dispatch: any, id: string) => {
    fetch(`http://localhost:3000/users/${id}`)
        .then(response => response.json())
        .then(data => {
            dispatch({type: 'GET_USER', user: data});
            dispatch({type: 'CHANGE_TO_FALSE'});
        })
}

export const editUser = (dispatch: any, id: string, user: User) => {
    fetch(`/users/${id}`, {
        body: JSON.stringify(user),
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            setTimeout(() => {
                dispatch({type: 'CHANGE_TO_FALSE'});
                dispatch({type: 'UPDATE_USER', user: data});
            }, 2000)
        })
}

export const addUser = (dispatch: any, user: User) => {
    fetch(`/users/`, {
        body: JSON.stringify(user),
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            dispatch({type: 'CHANGE_TO_FALSE'});
            dispatch({type: 'ADD_USER', user: data});
        })
}

export const deleteUser = (dispatch: any, id: string) => {
    fetch(`/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            dispatch({type: 'DELETE_USER', user: data});
            dispatch({type: 'CHANGE_TO_FALSE'});
        })
}


