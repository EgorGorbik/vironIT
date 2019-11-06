import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ProtectedRoute from "./Protected";
import auth from './Auth';
import {Route, Switch, withRouter} from "react-router-dom";
import {PrivateInfo} from './PrivateInfo';
import Login from "./Components/Login";
import Registration from "./Components/Registration";
import Info from "./Info";
import * as path from "path";
import { Provider } from 'react-redux';
import {store} from "./Store/configureStore";
import User from "./Components/User";
import TempProtected from "./TempProtected";

class App extends Component<any>{
  render() {
    return (
        <Provider store={store}>
            <Switch>
                <Route path='/login'>
                    <Login/>
                </Route>
                <Route path='/registration'>
                    <Registration/>
                </Route>
                <Route path='/users/:id'>
                    <User />
                </Route>
            </Switch>
        </Provider>
       /* <div>
          <ProtectedRoute path='/app' component={PrivateInfo}></ProtectedRoute>
          <button onClick={() => {auth.login(() => {
                return this.props.history.push('/app');
              }
          )}}>Login</button>
            <Login/>
            <Switch>
                <Route path='/users/:id'>
                    <Info />
                </Route>
            </Switch>
        </div>*/
    )
  }

}

export default withRouter(App);
