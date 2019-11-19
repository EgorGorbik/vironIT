import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router";
import Login from "./Login/";
import Registration from "./Registration/";
import Profile from "./Profile/";
import NotFound from "./NotFound/";
import Friends from "./Friends/";
import Chats from "./Chats";
import Chat from "./Chat";
import Users from './Users';
import PrivateRoute from "./PrivateRoute";

class Router extends Component<any> {

    render() {
        let id = sessionStorage.getItem('id');
        return(
            <Switch>
                <Route exact path="/">
                    {id ? <Redirect to={`/users/${id}` }/> : <Redirect to='/login' />}
                </Route>
                <Route exact path='/login'>
                    <Login/>
                </Route>
                <Route path='/registration'>
                    <Registration/>
                </Route>
                <Route exact path='/:id/friends'>
                    <Friends />
                </Route>
                <Route exact path='/:id/message/:id2'>
                    <Chat />
                </Route>
                <PrivateRoute path='/:id/users' component={Users}/>
                <PrivateRoute path='/:id/message' component={Chats}/>
                <Route path='/:id'>
                    <Profile/>
                </Route>
                <Route path="*" >
                    <NotFound />
                </Route>
            </Switch>
        )
    }
}

export default Router;

