import React from 'react';
import {Route, withRouter} from "react-router";
import auth from "./Auth";
import {authUser, loginUser} from "./Actions/user.action";
import {connect} from "react-redux";
import {ProtectedRoute} from "./Protected";

class TempProtected extends Route<any> {
    render() {
        let {component: Component, ...rest} = this.props;
        return (
            <Route
                {...rest}
                render={(props: any) => {
                    if (auth.isAuthencicated()) {
                        return <Component />
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
)(TempProtected));
