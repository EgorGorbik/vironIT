import {createConnectToSocket} from "../../Services/user.service";

export const connectSocket = (id: any) => {
    return (dispatch: any) => {
        createConnectToSocket(id)
    }
};


