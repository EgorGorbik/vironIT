import React, {Component} from 'react';
import {authUser, getNewToken, loginUser} from "../Actions/user.action";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {ProtectedRoute} from "../Protected";
import Table from "./Table";
import {Button} from "react-bootstrap";
import Guest from "./Guest";

class User extends Component<any> {
    componentWillMount() {
        this.props.authUser(this.props.match.params.id);
        let date = new Date().getTime() / 1000;
        let deadLine = sessionStorage.getItem('endTokenValidityTime');
        let leftTime = (Number(deadLine) - date) * 1000 - 10000;
        setTimeout(() => {
           // alert('полетел запрос ')
            this.props.getNewToken();
        }, leftTime)
    }

    render() {
console.log(this.props.isLoading)

        let content;
        if(this.props.isLoading) {
            content = <div>Loading...</div>
        } else {
            if(this.props.isLogin) {
                content = (<div>
                    <Table/>
                </div>)
            }  else {
                console.log('neeed')
                content = (<div>
                    <Guest />
                </div>)
            }
        }
        console.log(content)

        return(
            <div>{content}</div>
        )
    }
}

const mapStateToProps = (state: any) => ({
    isLogin: state.isLogin,
    isLoading: state.isLoading,
    user: state.user,
    users: state.users
});

const mapDispatchToProps = (dispatch: any) => ({
    loginUser: (user: any) => {dispatch(loginUser(user)) },
    authUser: (id: any) => {dispatch(authUser(id))},
    getNewToken: () => {dispatch(getNewToken())},

});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(User));
