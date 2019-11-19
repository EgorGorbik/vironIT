import React, {Component} from 'react';
import Header from "../../Header";
import {getIsLogin, getUser, getUsers} from "../../../Redux/Selectors/users.selector";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {getAuthUser} from "../../../Redux/Selectors/authorization.selector";
import NotFound from "../../NotFound";
import '../styles/_index.scss';

export class NotAuthorized extends Component<any> {
    render() {
        if(this.props.user.name === undefined) {
            return (
                <NotFound />
            )
        }
        return(
            <div>
                <Header/>
                <strong>Profile</strong>
                <div>{this.props.user.name}</div>
                <div>{this.props.user.surname}</div>
                <div>{this.props.user.username}</div>
                <div className='link' onClick={() => {this.props.history.push(`/${this.props.match.params.id}/friends`)}}>показать друзей {this.props.user.name}</div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    authUser: getAuthUser(state),
    user: getUser(state)
});

const mapDispatchToProps =  ({
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(NotAuthorized));
