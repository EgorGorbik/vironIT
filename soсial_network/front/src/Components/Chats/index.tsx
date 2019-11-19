import React, {Component} from 'react';
import {getIsLogin, getUser, getUsers} from "../../Redux/Selectors/users.selector";
import {getIsLoading} from "../../Redux/Selectors/loader.selector";
import {getNewToken, acceptRequestAddToFriend, deleteUserFromFriends, deleteQueryToAddToFriends, getPublicInfo} from "../../Redux/ThunkCreators/users.thunk";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {Button, ListGroup} from "react-bootstrap";
import Header from '../Header';

export class Chats extends Component<any> {
    componentWillMount() {
        console.log(this.props)
        console.log(this.props.match)
    }


    render() {
        console.log(this.props.chats)
        let content;


            if(this.props.isLoading || (this.props.authUser === undefined) ) {
                content = <div>Loading...</div>
            } else {
                if (this.props.chats[0] === undefined) {
                    content = <div>
                        <Header/>
                        У вас пока нет диалогов
                    </div>
                } else {
                    content = <div>
                        <Header/>
                        <ListGroup>
                            {this.props.chats.map((row: any) => {
                                if (row.messages.length === 0) return;
                                let to = row.members.filter((el: any) => el !== this.props.authUser._id);
                                to = to[0];
                                console.log(to)
                                return <div>
                                    <ListGroup.Item onClick={() => {
                                        this.props.history.push(`/${sessionStorage.getItem('id')}/message/${to}`)
                                    }}>
                                        {row.name}
                                        <p>{row.messages[row.messages.length - 1].text}</p>
                                    </ListGroup.Item>
                                </div>
                            })
                            }
                        </ListGroup>
                    </div>
                }
            }

        return (
            <div>{content}</div>
        )
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
    getPublicInfo
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Chats));
