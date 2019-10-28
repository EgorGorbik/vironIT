import {User} from "../Interfaces/Users.interface";
const GET_USER = "GET_USER";

export interface userAction {
    user: User;
    type: string;
}

export default (state = {}, action: userAction) => {
    switch (action.type) {
        case GET_USER:
            return action.user;
        default:
            return state;
    }
};
