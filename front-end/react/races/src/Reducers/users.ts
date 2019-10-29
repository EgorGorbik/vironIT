import {User} from "../Interfaces/Users.interface";
import {ADD_USER, DELETE_USER, GET_USERS, UPDATE_USER} from "../Constants/users";

export interface usersAction {
    type: string;
    users: Array<User>;
    user: User;
}

export default (state = [{
    _id: undefined
}], action: usersAction) => {
    switch (action.type) {
        case ADD_USER:
            return [...state, action.user];
        case GET_USERS:
            return action.users;
        case DELETE_USER:
            return state.filter((el: any) => {if(el._id !== action.user._id) return true;});
        case UPDATE_USER:
            let newstate:any = [];
            state.forEach((el: any) => {if(el._id !== action.user._id) {newstate.push(el) } else {newstate.push(action.user)}});
            console.log(newstate)
            return newstate;
        default:
            return state;
    }
};
