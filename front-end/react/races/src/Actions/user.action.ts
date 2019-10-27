export const getAsyncUsers = () => {
    return (dispatch: (arg0: { type: string; users?: any }) => void) => {
        fetch("http://localhost:3000/users/")
            .then(response => response.json())
            .then(data => {
                dispatch({type: 'GET_USERS', users: data});
                dispatch({type: 'CHANGE_TO_FALSE'});
            })
    }
};

export const getAsyncUser = (id: any) => {
    return (dispatch: (arg0: { type: string; user?: object }) => void) => {
        fetch(`http://localhost:3000/users/${id}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                dispatch({type: 'GET_USER', user: data});
                dispatch({type: 'CHANGE_TO_FALSE'});
            })
    }
};

export const addAsyncUser = (user: any) => {
    return (dispatch: (arg0: { type: string; users?: any }) => void) => {
        fetch('http://localhost:3000/users/', {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                dispatch({type: 'CHANGE_TO_FALSE'});
            })
    }
};
