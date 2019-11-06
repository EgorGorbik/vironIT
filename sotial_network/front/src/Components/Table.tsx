import React, {Component} from 'react';
import {
    acceptRequestAddToFriend,
    authUser,
    deleteUserFromFriends,
    loginUser,
    queryToAddToFriend
} from "../Actions/user.action";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {Navbar, Nav, Form, FormControl, Button, ListGroup} from "react-bootstrap";
import io from 'socket.io-client';

const socket = io('http://localhost:5000');


class Table extends Component<any> {
    private table: Array<any>;
    constructor(props: any) {
        super(props);
        this.table = [];
    }

    state = {
        isQueryToFriend: false,
        isSentQueryToFriend: false,
        queryToFriendLength: 0

    }

    componentWillMount(): void {
        socket.emit('register', this.props.user._id);
        let socketChange = (id: any) => {
            let user = this.props.user;
            user.friendRequests.push(id);
            console.log(user)
            this.props.socketQuery(user);
            this.forceUpdate();
        }
        socket.on('private_chat',(data: any) => {
            var username = data.username;
            var message = data.message;
           // alert(username+': '+message);
            socketChange(username);
        });
    }

    addToFriend = (id: any) => {
        socket.emit('private_chat',{
            to : id,
            message : 'hello world'
        });
        let user = this.props.user;
        user.sentFriendRequests.push(id);
        this.props.queryToAddToFriend(id, user);
    }

    render() {
        console.log(this.props.users)
        let queryToFriend = this.props.users.filter((el: any) => this.props.user.friendRequests.includes(el._id));
        let sentQueryToFriend = this.props.users.filter((el: any) => this.props.user.sentFriendRequests.includes(el._id));
        let friends = this.props.users.filter((el: any) => this.props.user.friends.includes(el._id));
        console.log('истина');
        console.log(this.props.user)

       // this.props.users.forEach((el: any) => {this.table.push(<button>{el.username}</button>)})
        console.log(queryToFriend.length);



        let countQueryToFriend;
        if(queryToFriend.length !== 0) {
            countQueryToFriend = <span className='newEvent'>{queryToFriend.length}</span>;
        }
        return(
            <div>
                <Navbar bg="green" variant="dark">
                    <Navbar.Brand href="#home">{this.props.user.name}</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link>Home</Nav.Link>
                        <Nav.Link onClick={() => {this.setState({isQueryToFriend: !this.state.isQueryToFriend})}}>Друзья{countQueryToFriend}</Nav.Link>
                        <Nav.Link onClick={() => {this.setState({isSentQueryToFriend: !this.state.isSentQueryToFriend})}}>Вы запросили дружить</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light">Search</Button>
                    </Form>
                </Navbar>

                <div>
                    {this.props.users.map((row: any) => (
                        <div>
                            <span>{row.username}</span>
                            <span><button onClick={() => this.addToFriend(row._id)}>Добавить в друзья</button></span>
                        </div>
                    ))}
                </div>
                {
                    this.state.isQueryToFriend &&
                    <div className='friends'>
                        <p>запросы в друзья</p>
                        <ListGroup>
                            {queryToFriend.map((row: any) => (
                                <div>
                                    <ListGroup.Item>{row.username}<Button onClick={() => this.props.acceptRequestAddToFriend(row._id, this.props.user)} className='float-right'>принять</Button></ListGroup.Item>
                                </div>
                            ))}
                        </ListGroup>
                        <p>друзья</p>
                        <ListGroup>
                            {friends.map((row: any) => (
                                <div>
                                    <ListGroup.Item>{row.username}
                                        <Button className='float-right'>написать</Button>
                                        <Button onClick={()=> {this.props.deleteUserFromFriends(row._id)}} variant="danger" className='float-right'>удалить из друзей</Button>
                                    </ListGroup.Item>
                                </div>
                            ))}
                        </ListGroup>
                    </div>
                }
                {
                    this.state.isSentQueryToFriend &&
                    <div>
                        <p>запросы, которые вы отправили</p>
                        {sentQueryToFriend.map((row: any) => (
                            <div>
                                <span>{row.username}</span>
                            </div>
                        ))}
                    </div>
                }


            <div>

            </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    isLogin: state.isLogin,
    user: state.user,
    users: state.users
});

const mapDispatchToProps = (dispatch: any) => ({
    loginUser: (user: any) => {dispatch(loginUser(user)) },
    queryToAddToFriend: (id: any, user: any) => {dispatch(queryToAddToFriend(id, user)) },
    acceptRequestAddToFriend: (id: any, user: any) => {dispatch(acceptRequestAddToFriend(id, user)) },
    deleteUserFromFriends: (id: any) => {dispatch(deleteUserFromFriends(id)) },
    socketQuery: (data: any) => {dispatch({type: "GET)USER", user: data})}
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Table));
