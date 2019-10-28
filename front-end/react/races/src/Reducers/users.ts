import {User} from "../Interfaces/Users.interface";
import {ADD_USER, GET_USERS} from "../Constants/users";

export interface usersAction {
    type: string;
    users: Array<User>;
}

export default (state = [{}], action: usersAction) => {
    switch (action.type) {
        case ADD_USER:
            return [...state, action.users];
        case GET_USERS:
            return action.users;
        default:
            return state;
    }
};
