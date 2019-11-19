import React, {Component} from "react";
import {connect, Provider} from "react-redux";
import {store} from "../../Redux/Store/configureStore";
import {BrowserRouter, withRouter} from "react-router-dom";
import Router from "../Router";
import {socket} from "../../Socket/socket";
import {getIsLogin, getUser, getUsers} from "../../Redux/Selectors/users.selector";
import {isAuthUser} from '../../Redux/ThunkCreators/authorization.thunk';
import {getIsLoading} from "../../Redux/Selectors/loader.selector";
import {getNewToken, sentMessageSocket} from "../../Redux/ThunkCreators/users.thunk";
import {setAuthUser, setMessages} from "../../Redux/ActionCreators/users.action";
import {Header} from "../Header";

export class Initialization extends Component<any> {

    componentWillMount(): any {
        if(sessionStorage.getItem('id') === null) return;
        this.props.isAuthUser();

        socket.on('private_chat',(data: any) => {
            var id = data.username;
            var message = data.message;
            let user = this.props.authUser;
            user.friendRequests.push(id);
            this.props.setAuthUser(user);
            this.forceUpdate()
        });

        socket.on('chat',(data: any) => {
            console.log(data)
            let obj = {from: data.username, text: data.message};
            console.log(obj);
            let chat = this.props.chat;
            chat.push(obj);
            console.log(chat)
            this.props.setMessages(chat)
            this.forceUpdate()
        });
    }

    render() {
        return(
            <Router />
        )
    }
}

const mapStateToProps = (state: any) => ({
    user: getUser(state),
    users: getUsers(state),
    isLoading: getIsLoading(state),
    isLogin: getIsLogin(state),
    authUser: state.authUser,
    chats: state.chats,
    chat: state.chat,
});

const mapDispatchToProps =  ({
    isAuthUser,
    getNewToken,
    setAuthUser,
    sentMessageSocket,
    setMessages
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Initialization);
