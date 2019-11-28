import React, {Component, ReactDOM} from 'react';
import {getIsLogin, getUser, getUsers} from "../../Redux/Selectors/users.selector";
import {getIsLoading} from "../../Redux/Selectors/loader.selector";
import {
    getNewToken,
    acceptRequestAddToFriend,
    deleteUserFromFriends,
    deleteQueryToAddToFriends,
    getPublicInfo,
    sentMessageSocket, getMessages
} from "../../Redux/ThunkCreators/users.thunk";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {Button, ListGroup, Spinner} from "react-bootstrap";
import Header from '../Header';
import {delMessages, setMessage, setMessages} from "../../Redux/ActionCreators/users.action";
import './styles/_index.scss';

export class Chat extends Component<any> {
    private chat: any;
    private id: any;
    private messagesEnd: any = React.createRef();


    state = {
        inputVal: "",
        numberMessagesPart: 1
    }

    changeInput = (val: any) => {
        this.setState({
            inputVal: val.target.value
        })
    }

    sendMessage = () => {
        console.log('sernt Message')
        if(this.state.inputVal === '') return;
        let obj = {from: this.props.auutUser, text: this.state.inputVal};
        console.log(obj);
        let chat = this.props.chat;
        chat.push(obj);
        console.log(chat)
        //this.props.setMessages(chat)
        //this.props.setMessage(obj)
        console.log('this.id ', sessionStorage.getItem('id'));
        this.props.sentMessageSocket(this.props.match.params.id2, this.state.inputVal);
        this.setState({
            inputVal: ''
        })
        console.log(this.props.chat)
    }

    componentDidMount(): void {
        this.scrollToBottom();
    }

    componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<{}>, snapshot?: any): void {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        console.log(this.messagesEnd);
        console.log(this.messagesEnd.scrollTop);
        console.log(this.messagesEnd.scrollHeight);
        if((this.messagesEnd.scrollTop !== undefined) && (this.messagesEnd.scrollHeight !== undefined)) {
            this.messagesEnd.scrollTop = this.messagesEnd.scrollHeight;
            this.messagesEnd.addEventListener('scroll',  (e: any) => {
                if(this.messagesEnd.scrollTop === 0) {
                    this.props.getMessages(this.props.match.params.id2, this.state.numberMessagesPart+1);
                    this.setState({
                        numberMessagesPart: this.state.numberMessagesPart+1
                    })
                }
            });
        }
        console.log(this.messagesEnd.current);
       /* if(this.messagesEnd.current !== null && (this.messagesEnd.current !== undefined)) {
            console.log(this.messagesEnd)
            console.log(this.messagesEnd.current)
            this.messagesEnd.scrollIntoView({ behavior: 'smooth' })
        }*/
    }

    componentWillMount(): void {
        this.props.getMessages(this.props.match.params.id2, this.state.numberMessagesPart)
    }

    componentWillUnmount(): void {
        console.log('delete!');
        this.props.delMessages();
    }

    render() {
        /*if(this.props.chats[0] !== undefined && (!this.props.isLoading)) {
            this.chat = this.props.chats.find((x: any) => x.members.includes(this.props.match.params.id2));
            //this.id = this.props.match.params.id2;
        }*/

            console.log(this.props.chat)
            if(this.props.isLoading ) {
                return <Spinner animation="border" variant="success" />
            } else {
                console.log(this.props.chat);
                return <div>
                    <Header/>
                    <div className='chatArea'>
                        <div className='messages' ref={(el: any) => {if(el !== null) {this.messagesEnd = el;}}}>

                    <ListGroup>
                        {this.props.chat.map((row: any) => {
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
                            <div className='bottom'></div>
                        </div>
                        <div className='input'>
                            <input onChange={this.changeInput} value={this.state.inputVal}></input>
                            <Button className='button' onClick={this.sendMessage}>Отправить</Button>
                        </div>

                    </div>
                </div>
            }
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
    setMessages,
    setMessage,
    getMessages,
    delMessages
});

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Chat));
