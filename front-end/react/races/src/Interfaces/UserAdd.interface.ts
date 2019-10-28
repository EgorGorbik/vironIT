import {User, Users} from "./Users.interface";

export interface UserAdd {
    name?: any;
    isAdd: boolean;
    id?: string;
    user?: User;
    users?: Users | undefined;
    getUsers? :any;
    isLoading?: any;
    getUser?: any;
    editUser?: any;
}


