import {addUser, deleteUser, editUser, getUser, getUsers} from "../Services/user.service";

export const getAsyncUsers = () => {
    return (dispatch: (arg0: { type: string; users?: any }) => void) => {
        getUsers(dispatch);
    }
};

export const getAsyncUser = (id: any) => {
    return (dispatch: (arg0: { type: string; user?: object }) => void) => {
        getUser(dispatch, id);
    }
};


export const editAsyncUser = (id: string, user: any) => {
    return (dispatch: (arg0: { type: string; users?: any }) => void) => {
        editUser(dispatch, id, user);
    }
};

export const addAsyncUser = (user: any) => {
    return (dispatch: (arg0: { type: string; users?: any }) => void) => {
            addUser(dispatch, user);
    }
};

export const deleteAsyncUser = (id: string) => {
    return (dispatch: (arg0: { type: string;}) => void) => {
        deleteUser(dispatch, id);
    }
};
