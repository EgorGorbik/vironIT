import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import {Route, RouteProps} from 'react-router';
import auth from './Auth';
import {authUser, loginUser} from "./Actions/user.action";
import {connect} from "react-redux";

export interface ProtectedRouteProps extends RouteProps {
    authUser(): any,
    authenticationPath: string;
}

export class ProtectedRoute extends Route<any> {
    componentWillMount(): void {
        this.props.authUser();
    }

    render() {
        let {component: Component, ...rest} = this.props;
        return (
            <Route
                {...rest}
                render={(props: any) => {
                    if (auth.isAuthencicated()) {
                        return <Component  {...props}/>
                    } else {
                        return <div>нет доступа</div>
                    }
                }}
            />
        )
    }
}

const mapStateToProps = (state: any) => ({

});

const mapDispatchToProps = (dispatch: any) => ({
    loginUser: (user: any) => {dispatch(loginUser(user)) },
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ProtectedRoute));
