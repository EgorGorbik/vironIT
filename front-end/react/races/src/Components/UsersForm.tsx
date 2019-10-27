import React, {ChangeEvent, Component} from 'react';
import {UserAdd} from "../Interfaces/UserAdd.interface";
import {User, Users} from "../Interfaces/Users.interface";
import {connect} from "react-redux";
import {addAsyncUser, getAsyncUser, getAsyncUsers} from '../Actions/user.action';


export class UserForm extends Component<UserAdd> {
    constructor(props: UserAdd) {
        super(props);
    }

    state = {
        name: '',
        surname: '',
        username: '',
        password: ''
    }

    componentWillMount(): void {
        if (!this.props.isAdd) {
            this.props.getUser(this.props.id);
        }
    }

    private form: object | undefined;
    sendData = (): object => {
        return this.state;
    }

    changeInputValue = (el: ChangeEvent<HTMLInputElement>): void => {
        this.setState({
            [el.target.id]: el.target.value,
        })
    }

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
                <button onClick={this.sendData}>Submit</button>
            </div>);
        } else {
            this.form = (<div>
                <p>edit user</p>
                <p>username</p>
                <input id='username' onChange={this.changeInputValue} value={(this.props.user as User).username}/>
                <p>name</p>
                <input id='name' onChange={this.changeInputValue} value={(this.props.user as User).name}/>
                <p>surname</p>
                <input id='surname' onChange={this.changeInputValue} value={(this.props.user as User).surname}/>
                <p>password</p>
                <input id='password' onChange={this.changeInputValue} value={(this.props.user as User).password}/>
                <p></p>
                <button onClick={this.sendData}>Submit</button>
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

const mapStateToProps = (state: {user: User; isLoading: boolean, users: Users}) => ({
    users: state.users,
    user: state.user,
    isLoading: state.isLoading
});

const mapDispatchToProps = (dispatch: any) => ({
    getUsers: () => {dispatch(getAsyncUsers());},
    getUser: (id: any) => {dispatch({type: 'CHANGE_TO_TRUE'}); dispatch(getAsyncUser(id));},
    //addUser: (user: any) => {dispatch(addAsyncUser(user));},
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserForm);
