import {Redirect, Route, withRouter} from "react-router";
import React from 'react'
import {connect} from "react-redux";
import {getAuthUser} from "../Redux/Selectors/authorization.selector";

export const PrivateRoute = ({ component: Component, authUser, ...rest }: any) => (
    <Route {...rest} render={(props) => {
        if(props.match.params.id === authUser._id) {
            return (<Component/>)
        } else {
            return <Redirect to="/login"/>
        }

    }} />
)

const mapStateToProps = (state: any) => ({
    authUser: getAuthUser(state),

});

const mapDispatchToProps =  ({
});

export default (connect(
    mapStateToProps,
    mapDispatchToProps
)(PrivateRoute));
