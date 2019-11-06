import React, {Component} from 'react';
import {acceptRequestAddToFriend, loginUser, queryToAddToFriend} from "../Actions/user.action";
import {withRouter} from "react-router";
import {connect} from "react-redux";

class Guest extends Component<any> {
    render() {
        console.log(this)
        return(
            <div>ssdf</div>
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
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Guest));
