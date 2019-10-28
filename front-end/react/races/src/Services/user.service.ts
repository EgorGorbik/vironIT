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
            dispatch({type: 'CHANGE_TO_FALSE'});
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
        })
}


