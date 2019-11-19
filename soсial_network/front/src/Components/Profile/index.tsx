import React, {Component} from 'react';
import {getPublicInfo} from "../../Redux/ThunkCreators/users.thunk";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {getNewToken} from "../../Redux/ThunkCreators/users.thunk";
import {getIsLogin, getUser, getUsers} from "../../Redux/Selectors/users.selector";
import {getIsLoading} from "../../Redux/Selectors/loader.selector";
import {Spinner} from "react-bootstrap";
import Authorized from "./Components/Authorized";
import NotAuthorized from "./Components/NotAuthorized";

class Profile extends Component<any> {

    componentDidMount() {
        if(this.props.match.params.id !== this.props.authUser._id) {
            this.props.getPublicInfo(this.props.match.params.id);
        }
       /* let date = new Date().getTime() / 1000;
        let deadLine = sessionStorage.getItem('endTokenValidityTime');
        let leftTime = (Number(deadLine) - date) * 1000 ;*/
    }

    render() {
        if(this.props.isLoading ) {
            return <Spinner animation="border" variant="success" />
        } else {
            if(this.props.match.params.id === this.props.authUser._id) {
                return <Authorized/>;
            }  else {
                return(
                    <NotAuthorized/>
                )
            }
        }
    }
}

const mapStateToProps = (state: any) => ({
    isLoading: getIsLoading(state),
    isLogin: getIsLogin(state),
    authUser: state.authUser,
});

const mapDispatchToProps =  ({
    getPublicInfo
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile));
