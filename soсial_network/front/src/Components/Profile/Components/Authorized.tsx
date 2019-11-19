import React, {Component} from 'react';
import Header from "../../Header";
import {getIsLogin, getUser, getUsers} from "../../../Redux/Selectors/users.selector";
import {getIsLoading} from "../../../Redux/Selectors/loader.selector";
import {getNewToken, getPublicInfo} from "../../../Redux/ThunkCreators/users.thunk";
import {setAuthUser} from "../../../Redux/ActionCreators/users.action";
import {withRouter} from "react-router";
import {connect} from "react-redux";

export class Authorized extends Component<any> {
    render() {
        return(
            <div>
                <Header/>
                <strong>Profile</strong>
                <div>name: {this.props.authUser.name}</div>
                <div>surname: {this.props.authUser.surname}</div>
                <div>username: {this.props.authUser.username}</div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    authUser: state.authUser,
});

const mapDispatchToProps =  ({
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Authorized));
