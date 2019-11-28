import React, {Component} from 'react';
import {getIsLogin, getUser, getUsers} from "../../Redux/Selectors/users.selector";
import {getIsLoading} from "../../Redux/Selectors/loader.selector";
import {getNewToken, acceptRequestAddToFriend, deleteUserFromFriends, deleteQueryToAddToFriends, getPublicInfo} from "../../Redux/ThunkCreators/users.thunk";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import Authorized from "./components/Authorized";
import NotAuthorized from "./components/NotAuthorized";
import {getAuthUser} from "../../Redux/Selectors/authorization.selector";

export class Friends extends Component<any> {
    componentWillMount() {
        this.props.getPublicInfo(this.props.match.params.id);
    }

    render() {
        console.log(this.props.friends)
        if(this.props.match.params.id === this.props.authUser._id) {
             return <Authorized />
        } else {
            return <NotAuthorized />
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
)(Friends));
