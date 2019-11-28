import React, {Component} from 'react';
import {getIsLogin, getUser, getUsers} from "../../../Redux/Selectors/users.selector";
import {getIsLoading} from "../../../Redux/Selectors/loader.selector";
import {
    acceptRequestAddToFriend, addChat,
    deleteQueryToAddToFriends,
    deleteUserFromFriends,
    getNewToken, getPublicInfo, getUsersByLetters, queryToAddToFriend, queryToAddToFriendsSocket
} from "../../../Redux/ThunkCreators/users.thunk";
import {setAuthUser} from "../../../Redux/ActionCreators/users.action";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {AllUsers} from "../index";

export class Input extends Component<any> {
    getUsers = (val: any) => {
        this.props.getUsersByLetters(val.target.value)
    }

    render() {
        return(
            <input onChange={(val) => this.getUsers(val)}/>
        )
    }
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps =  ({
    getUsersByLetters
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Input));
