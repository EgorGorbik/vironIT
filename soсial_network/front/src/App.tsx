import React, {Component} from 'react';
import './App.css';
import {BrowserRouter, withRouter} from "react-router-dom";
import { Provider } from 'react-redux';
import {store} from "./Redux/Store/configureStore";
import Router from "./Components/Router";
import Initialization from "./Components/Initialization";

class App extends Component<any> {
  render() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Initialization/>
            </BrowserRouter>
        </Provider>
    )
  }
}

export default (App);
