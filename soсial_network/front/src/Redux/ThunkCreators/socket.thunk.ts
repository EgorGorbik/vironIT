import {createConnectToSocket, createSocketRoomQuery} from "../../Services/user.service";

export const connectSocket = (id: any) => {
    console.log('1 ', id)
    return (dispatch: any) => {
        createConnectToSocket(id)
    }
};

export const createSocketRoom = (id: any) => {
    console.log('1 ', id)
    return (dispatch: any) => {
        createSocketRoomQuery(id, sessionStorage.getItem('id'))
    }
};

