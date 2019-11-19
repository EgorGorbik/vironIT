import React, {Component} from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import {getIsLogin, getUser, getUsers} from "../../Redux/Selectors/users.selector";
import {getIsLoading} from "../../Redux/Selectors/loader.selector";
import {
    acceptRequestAddToFriend, deleteQueryToAddToFriends,
    deleteUserFromFriends,
    getNewToken, getPublicInfo, queryToAddToFriend, queryToAddToFriendsSocket, addChat
} from "../../Redux/ThunkCreators/users.thunk";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Header from "../Header";
import {Button, ListGroup} from "react-bootstrap";
import {setAuthUser} from "../../Redux/ActionCreators/users.action";


export class AllUsers extends Component<any> {
    addToFriend = (id: any) => {
        let user = this.props.authUser;
        user.sentFriendRequests.push(id);
        this.props.queryToAddToFriend(id, user);
    }

    write = (id: any) => {
        let chat;
        if(this.props.chats[0] === undefined) {
            chat = undefined;
        } else {
            chat = this.props.chats.filter((el: any) => el.members.includes(id));
            chat = chat[0];
        }

        if(chat === undefined) {
            confirmAlert({
                title: 'У вас нет сообщений с этим пользователем',
                message: 'Начать диалог?',
                buttons: [
                    {
                        label: 'Да',
                        onClick: () => {
                            this.props.addChat(this.props.authUser._id, id);
                            this.props.history.push(`/${this.props.authUser._id}/message/${id}`)
                        }
                    },
                    {
                        label: 'Нет',
                        onClick: () => alert('Click No')
                    }
                ]
            });
        } else {
            this.props.history.push(`/${this.props.authUser._id}/message/${id}`)
        }
    }

    render() {
        if(this.props.isLoading || (this.props.authUser.name === undefined)) {
            return <div>Loading...</div>
        } else {
            return <div>
                <Header/>
                <ListGroup>
                    {this.props.users.map((row: any) => {
                        let isOnline;
                        if(row.isOnline) {
                            isOnline = (<div>Online</div>)
                        };

                        if (this.props.authUser.friends.includes(row._id)) {
                            return <div>
                                <ListGroup.Item>{row.username}
                                    <Button className='float-right' onClick={() => this.write(row._id)}>написать</Button>
                                    <Button onClick={()=> {this.props.deleteUserFromFriends(row._id)}} variant="danger" className='float-right'>удалить из друзей</Button>
                                    {isOnline}
                                </ListGroup.Item>
                            </div>
                        }
                        if (this.props.authUser.friendRequests.includes(row._id)) {
                            return <div>
                                <ListGroup.Item>{row.username}
                                    <Button className='float-right' onClick={() => this.write(row._id)}>написать</Button>
                                    <Button onClick={() => this.props.acceptRequestAddToFriend(row._id, this.props.user)} variant="danger" className='float-right'>принять запрос</Button>
                                    {isOnline}
                                </ListGroup.Item>
                            </div>
                        }
                        if (this.props.authUser.sentFriendRequests.includes(row._id)) {
                            return <div>
                                <ListGroup.Item>{row.username}
                                    <Button className='float-right' onClick={() => this.write(row._id)}>написать</Button>
                                    <Button onClick={()=> {this.props.deleteQueryToAddToFriends(row._id)}} variant="danger" className='float-right'>отменить запрос</Button>
                                </ListGroup.Item>
                            </div>
                        } else {
                            return <div>
                                <ListGroup.Item>{row.username}
                                    <Button className='float-right' onClick={() => this.write(row._id)}>написать</Button>
                                    <Button onClick={() => this.addToFriend(row._id)} className='float-right'>добавить в друзья</Button>
                                    {isOnline}
                                </ListGroup.Item>
                            </div>
                        }
                    })}

                </ListGroup>
            </div>
        }
    }
}

const mapStateToProps = (state: any) => ({
    user: getUser(state),
    users: getUsers(state),
    isLoading: getIsLoading(state),
    isLogin: getIsLogin(state),
    authUser: state.authUser,
    chats: state.chats
});

const mapDispatchToProps =  ({
    getNewToken,
    acceptRequestAddToFriend,
    deleteUserFromFriends,
    deleteQueryToAddToFriends,
    getPublicInfo,
    queryToAddToFriend,
    setAuthUser,
    queryToAddToFriendsSocket,
    addChat
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(AllUsers));
