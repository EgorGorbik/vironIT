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
        let friends;
        if (this.props.user.name !== undefined) {
            friends = this.props.users.filter((el: any) => this.props.user.friends.includes(el._id));
        }

        console.log(this.props.user.name)
        console.log(this.props.isLoading)
        if (this.props.isLoading || (this.props.user.name === undefined)) {
            return <Spinner animation="border" variant="success" />
        } else {
            return (<div>
                <Header/>
                <p>друзья</p>
                <ListGroup>
                    {friends.map((row: any) => (
                        <div>
                            <ListGroup.Item>{row.username}
                                <Button className='float-right'>написать</Button>
                            </ListGroup.Item>
                        </div>
                    ))}
                </ListGroup>
            </div>)
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
    acceptRequestAddToFriend,
    deleteUserFromFriends,
    deleteQueryToAddToFriends,
    getPublicInfo
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Authorized));
