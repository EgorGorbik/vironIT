export interface Users {
    users?: any;
    getUsers?: any;
    isLoading?: any;
    rows?: Array<{
        id?: string;
        username: string | undefined;
        name: string | undefined;
        surname: string | undefined;
        password: string | undefined;
    }>
}

export interface User {
    _id?: string;
    username: string | undefined;
    name: string | undefined;
    surname: string | undefined;
    password: string | undefined;
}
