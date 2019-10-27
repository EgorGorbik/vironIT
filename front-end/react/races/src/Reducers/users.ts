import {User} from "../Interfaces/Users.interface";
const ADD_USER = "ADD_USER";
const GET_USERS = "GET_USERS";

export default (state = [{}], action: { type: string; users: Array<User>}) => {
    switch (action.type) {
        case ADD_USER:
            return [...state, action.users];
        case GET_USERS:
            return action.users;
        default:
            return state;
    }
};
