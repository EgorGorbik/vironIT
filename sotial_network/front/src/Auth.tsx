import {Component} from "react";

class Auth extends Component<any> {
    private authenticated: boolean;
    private static authenticated: boolean;
    constructor(props: any) {
        super(props);
        this.authenticated = false;
    }


    static login(cb: any) {
        this.authenticated = true;
        cb();
    }

    logout(cb: () => void) {
        this.authenticated = false;
        cb();
    }


    static isAuthencicated() {
        return this.authenticated;
    }
}

export default Auth;
