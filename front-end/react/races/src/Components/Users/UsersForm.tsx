import React, {ChangeEvent, Component} from 'react';
import {UserAdd} from "../../Interfaces/UserAdd.interface";
import {User, Users} from "../../Interfaces/Users.interface";
import {connect} from "react-redux";
import {addAsyncUser, deleteAsyncUser, editAsyncUser, getAsyncUser, getAsyncUsers} from '../../Actions/user.action';
import "bootstrap/dist/css/bootstrap.css";
import {Form, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

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
            this.form = (
                <Form>
                    <Form.Group controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control id='username' type="text" placeholder="Enter username" onChange={this.changeInputValue} value={this.state.username}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control id='name' type="text" placeholder="Enter name" onChange={this.changeInputValue} value={this.state.name}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicSurname">
                        <Form.Label>Surname</Form.Label>
                        <Form.Control id='surname' type="text" placeholder="Enter ursname" onChange={this.changeInputValue} value={this.state.surname}/>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control id='password' type="password" placeholder="Password" onChange={this.changeInputValue} value={this.state.password}/>
                        <Form.Text className="text-muted">
                            We'll never share your password with anyone else.
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.sendData} >
                        Submit
                    </Button>
                </Form>
            );

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
