import React, {Component} from 'react';
import {Button, Form, FormControl, Nav, Navbar} from "react-bootstrap";
import {withRouter} from "react-router";
import './styles/_index.scss';
import {getIsLogin, getUser, getUsers} from "../../Redux/Selectors/users.selector";
import {getIsLoading} from "../../Redux/Selectors/loader.selector";
import {getAuthUser} from "../../Redux/Selectors/authorization.selector";
import {getNewToken} from "../../Redux/ThunkCreators/users.thunk";
import {setAuthUser} from "../../Redux/ActionCreators/users.action";
import logo from '../../images/logo.png';
import {connect} from "react-redux";

export class Header extends Component<any> {

    logOut = () => {
        sessionStorage.clear();
        this.props.history.push('/login');
    }

    render() {
        console.log(this.props.isLogin)
        let countOfQuery;
        if(this.props.isLogin) {
            if(this.props.authUser.friendRequests.length !== 0) {
                countOfQuery = <span className='newEvent'>{this.props.authUser.friendRequests.length}</span>
            }
        }

        if(this.props.isLogin){
            return(
                <Navbar bg="green" variant="dark">
                    <Navbar.Brand onClick={() => {this.props.history.push(`/${sessionStorage.getItem('id')}`)}}>{this.props.authUser.name}</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link onClick={() => {this.props.history.push(`/${sessionStorage.getItem('id')}/friends`)}}>Друзья{countOfQuery}</Nav.Link>
                        <Nav.Link onClick={() => {this.props.history.push(`/${sessionStorage.getItem('id')}/users`)}}>Люди</Nav.Link>
                        <Nav.Link onClick={() => {this.props.history.push(`/${sessionStorage.getItem('id')}/message`)}}>Сообщения</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light" onClick={() => this.logOut()}>Log Out</Button>
                    </Form>
                </Navbar>
            )
        } else {
            return(
                <Navbar bg="green" variant="dark">
                    <Navbar.Brand onClick={() => {this.props.history.push(`/${sessionStorage.getItem('id')}`)}}><img width='45px' height='45px' src={logo}/></Navbar.Brand>
                </Navbar>
            )
        }
    }
}

const mapStateToProps = (state: any) => ({
    user: getUser(state),
    users: getUsers(state),
    isLoading: getIsLoading(state),
    isLogin: getIsLogin(state),
    authUser: getAuthUser(state)
});

const mapDispatchToProps =  ({
    getNewToken,
    setAuthUser
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header));
