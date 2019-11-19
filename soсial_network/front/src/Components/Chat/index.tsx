import React, {Component} from 'react';
import {getIsLogin, getUser, getUsers} from "../../Redux/Selectors/users.selector";
import {getIsLoading} from "../../Redux/Selectors/loader.selector";
import {
    getNewToken,
    acceptRequestAddToFriend,
    deleteUserFromFriends,
    deleteQueryToAddToFriends,
    getPublicInfo,
    sentMessageSocket
} from "../../Redux/ThunkCreators/users.thunk";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {Button, ListGroup} from "react-bootstrap";
import Header from '../Header';
import {setMessages} from "../../Redux/ActionCreators/users.action";
import {socket} from "../../Socket/socket";

export class Chat extends Component<any> {
    private chat: any;
    private id: any;

    state = {
        inputVal: ""
    }

    componentWillMount() {
        console.log(this.props)
        console.log(this.props.match)
        //this.props.isAuthUser(this.props.match.params.id);
    }

    changeInput = (val: any) => {
        this.setState({
            inputVal: val.target.value
        })
    }

    sendMessage = () => {
        console.log(this.id)
        console.log(this.state.inputVal);
        console.log(this.chat);

        let obj = {from: this.props.auutUser, text: this.state.inputVal};
        console.log(obj);
        let chat = this.props.chat;
        chat.push(obj);
        console.log(chat)
        this.props.setMessages(chat)
        this.props.sentMessageSocket(this.id, this.state.inputVal, this.chat._id);
        this.setState({
            inputVal: ''
        })
    }

    render() {
        console.log(this.props.chat)
        console.log(this.props.chats[0])
        let content;
        console.log(this.chat)
        if(this.props.chats[0] !== undefined) {
            console.log(this.props.chats)
            this.chat = this.props.chats.find((x: any) => x.members.includes(this.props.match.params.id2));
            this.props.setMessages(this.chat.messages)
            this.id = this.chat.members.filter((el:any) => el !== sessionStorage.getItem('id'));
            this.id = this.id[0];
        }


            if(this.props.isLoading || (this.props.chats[0] === undefined) ) {
                content = <div>Loading...</div>
            } else {
                console.log(this.props.chats)
                console.log(this.props.match.params.chatId)
              let chat = this.props.chats.find((x: any) => {console.log(x._id); return (x._id === this.props.match.params.chatId)});
                console.log(this.chat)
                content = <div>
                    <Header/>
                    <ListGroup>
                        {this.chat.messages.map((row: any) => {
                            if(row.from === sessionStorage.getItem('id')) {
                                return <div>
                                    you: {row.text}
                                </div>
                            } else {
                                return <div>
                                    {row.text}
                                </div>
                            }

                        })
                        }
                    </ListGroup>
                    <input onChange={this.changeInput} value={this.state.inputVal}></input>
                    <button onClick={this.sendMessage}>Отправить</button>
                </div>
            }

        return (
            <div>{content}</div>
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
    getNewToken,
    acceptRequestAddToFriend,
    deleteUserFromFriends,
    deleteQueryToAddToFriends,
    getPublicInfo,
    sentMessageSocket,
    setMessages
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat));
