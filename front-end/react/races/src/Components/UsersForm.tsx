import React, {ChangeEvent, Component} from 'react';
import {UserAdd} from "../Interfaces/UserAdd.interface";
import {User, Users} from "../Interfaces/Users.interface";
import {connect} from "react-redux";
import {addAsyncUser, editAsyncUser, getAsyncUser, getAsyncUsers} from '../Actions/user.action';
import "bootstrap/dist/css/bootstrap.css";

interface Props {
    user: User;
    isAdd: boolean;
    editUser(id: string, user: User): void;
    getUser(id: string): void;
    addUser(user: User): void;
    id: string;
    isLoading: boolean;
}

interface State {
    name: string;
    surname: string;
    username: string;
    password: string;
    [key: string]: string;
}

export class UserForm extends Component<Props, State> {
    constructor(props: any) {
        super(props);
    }

    state = {
        name: '',
        surname: '',
        username: '',
        password: ''
    }

    componentWillMount() {
        if (!this.props.isAdd) {
            this.props.getUser(this.props.id);
        }
    }

    componentWillReceiveProps(nextProps: Readonly<UserAdd>) {
        this.setState({
            name: this.props.user.name!,
            surname: this.props.user.surname!,
            username: this.props.user.username!,
            password: this.props.user.password!,
        })
    }

    sendData = () => {
        let user = {
            name: this.state.name,
            surname: this.state.surname,
            username: this.state.username,
            password: this.state.password,
        }
        if(this.props.isAdd) {
            this.props.addUser(user)
        } else {
            this.props.editUser(this.props.id, user)
        }

    }

    changeInputValue = (el: ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            [el.target.id]: el.target.value,
        })
    }

    private form: object | undefined;

    render() {
        const {isAdd, id, user} = this.props;
        if(isAdd) {
            this.form = (<div>
                <p>Add new user</p>
                <p>username</p>
                <input id='username' onChange={this.changeInputValue}/>
                <p>name</p>
                <input id='name' onChange={this.changeInputValue}/>
                <p>surname</p>
                <input id='surname' onChange={this.changeInputValue}/>
                <p>password</p>
                <input id='password' onChange={this.changeInputValue}/>
                <p></p>
                <button className="btn btn-primary" onClick={this.sendData}>Submit</button>
            </div>);
        } else {
            this.form = (<div>
                <p>edit user</p>
                <p>username</p>
                <input id='username' onChange={this.changeInputValue} value={this.state.username}/>
                <p>name</p>
                <input id='name' onChange={this.changeInputValue} value={this.state.name}/>
                <p>surname</p>
                <input id='surname' onChange={this.changeInputValue} value={this.state.surname}/>
                <p>password</p>
                <input id='password' onChange={this.changeInputValue} value={this.state.password}/>
                <p></p>
                <button className="btn btn-primary" onClick={this.sendData}>Submit</button>
            </div>);
        }
        let spinner = (<div>Loading...</div>);
        let display = (!this.props.isLoading)? this.form : spinner;
        return (
            <div>
                {display}
            </div>
        )
    }
}

export interface StateProps {
    users: Users,
    user: User,
    isLoading: boolean
}

export interface DispatchProps {
    getUsers(y: any): any,
    getUSer(u: any): any,
    editUser(u: any, k: any): any
}

const mapStateToProps = (state: {user: User; isLoading: boolean, users: Users}, ownProps: any) => ({
    users: state.users,
    user: state.user,
    isLoading: state.isLoading
});

const mapDispatchToProps = (dispatch: any) => ({
    getUsers: () => {dispatch(getAsyncUsers());},
    getUser: (id: any) => {dispatch({type: 'CHANGE_TO_TRUE'}); dispatch(getAsyncUser(id));},
    addUser: (user: any) => {dispatch({type: 'CHANGE_TO_TRUE'}); dispatch(addAsyncUser(user));},
    editUser: (id: string, user: any) => {dispatch({type: 'CHANGE_TO_TRUE'}); dispatch(editAsyncUser(id, user));},
});




export default connect (
    mapStateToProps,
    mapDispatchToProps
)(UserForm);
