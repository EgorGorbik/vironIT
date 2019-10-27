import {User} from "../Interfaces/Users.interface";
const GET_USER = "GET_USER";

export default (state = {}, action: { user: User; type: string}) => {
    switch (action.type) {
        case GET_USER:
            return action.user;
        default:
            return state;
    }
};
