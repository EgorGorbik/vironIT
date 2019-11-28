import React, {Component} from 'react';
import Header from "../../Header";
import {Button, ListGroup, Spinner} from "react-bootstrap";
import {getIsLogin, getUser, getUsers} from "../../../Redux/Selectors/users.selector";
import {getIsLoading} from "../../../Redux/Selectors/loader.selector";
import {
    acceptRequestAddToFriend,
    deleteQueryToAddToFriends,
    deleteUserFromFriends,
    getNewToken, getPublicInfo
} from "../../../Redux/ThunkCreators/users.thunk";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {Friends} from "../index";
import {getAuthUser} from "../../../Redux/Selectors/authorization.selector";

export class Authorized extends Component<any> {
    render() {
        /*console.log(this.props.friends.sentFriendRequests);
        console.log(this.props.friends)
        let queryToFriend;
        let sentQueryToFriend;
        let friends;
        let count;
            console.log(this.props.users)
            queryToFriend = this.props.users.filter((el: any) => this.props.authUser.friendRequests.includes(el._id));
            console.log(queryToFriend)
            sentQueryToFriend = this.props.users.filter((el: any) => this.props.authUser.sentFriendRequests.includes(el._id));
            friends = this.props.users.filter((el: any) => this.props.authUser.friends.includes(el._id));
            count = queryToFriend.length*/

        if (this.props.isLoading || (this.props.authUser.name === undefined) || (this.props.friends.friends === undefined)) {
            return <Spinner animation="border" variant="success" />
        } else {
            return (
                <div>
                <Header/>
                <div className='friends'>
                    <p>запросы в друзья</p>
                    <ListGroup>
                        {this.props.friends.friendRequests.map((row: any) => (
                            <div>
                                <ListGroup.Item>{row.username}<Button
                                    onClick={() => this.props.acceptRequestAddToFriend(row._id, this.props.user)}
                                    className='float-right'>принять</Button></ListGroup.Item>
                            </div>
                        ))}
                    </ListGroup>
                    <p>друзья</p>
                    <ListGroup>
                        {this.props.friends.friends.map((row: any) => (
                            <div>
                                <ListGroup.Item>{row.username}
                                    <Button className='float-right'>написать</Button>
                                    <Button onClick={() => {
                                        this.props.deleteUserFromFriends(row._id)
                                    }} variant="danger" className='float-right'>удалить из друзей</Button>
                                </ListGroup.Item>
                            </div>
                        ))}
                    </ListGroup>
                    <p>запросы, которые вы отправили</p>
                    <ListGroup>
                        {this.props.friends.sentFriendRequests.map((row: any) => (
                            <div>
                                <ListGroup.Item>{row.username}
                                    <Button onClick={() => {
                                        this.props.deleteQueryToAddToFriends(row._id)
                                    }} variant="danger" className='float-right'>отменить запрос</Button>
                                </ListGroup.Item>
                            </div>
                        ))}
                    </ListGroup>
                </div>
            </div>
            )
        }
    }
}

const mapStateToProps = (state: any) => ({
    user: getUser(state),
    users: getUsers(state),
    isLoading: getIsLoading(state),
    isLogin: getIsLogin(state),
    authUser: getAuthUser(state),
    friends: state.friends
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
)(Authorized));
