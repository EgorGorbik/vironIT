import React, {Component} from 'react';
import {getIsLogin, getUser, getUsers} from "../../Redux/Selectors/users.selector";
import {getIsLoading} from "../../Redux/Selectors/loader.selector";
import {getNewToken, acceptRequestAddToFriend, deleteUserFromFriends, deleteQueryToAddToFriends, getPublicInfo} from "../../Redux/ThunkCreators/users.thunk";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {Button, ListGroup, Spinner} from "react-bootstrap";
import Header from '../Header';
import './styles/_index.scss';

export class Chats extends Component<any> {
    componentWillMount() {
        console.log(this.props)
        console.log(this.props.match)
    }


    render() {
        console.log(this.props.chats)
        console.log(this.props.authUser)
            if(this.props.isLoading || (this.props.authUser === undefined)) {
                return <Spinner animation="border" variant="success" />
            } else {
                if (this.props.chats[0] === undefined) {
                    return <div>
                        <Header/>
                        У вас пока нет диалогов
                    </div>
                } else {
                    return <div>
                        <Header/>
                        <ListGroup>
                            {this.props.chats.map((row: any) => {
                                if (row.messages.length === 0) return;
                                let to = row.members.filter((el: any) => el !== this.props.authUser._id);
                                to = to[0];
                                if(row.messages[0] !== null) {
                                return <div>
                                    <ListGroup.Item className='chat' onClick={() => {
                                        this.props.history.push(`/${sessionStorage.getItem('id')}/message/${to}`)
                                    }}>
                                        <strong className='name'>{row.name}</strong>
                                        {row.messages[0].text}
                                    </ListGroup.Item>
                                </div>}
                            })
                            }
                        </ListGroup>
                    </div>
                }
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
    getPublicInfo
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Chats));
