import {Route, Switch} from "react-router";
import UsersTable from "./Table";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import UserForm from "./UsersForm";

const AppRouter = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/users">
                <UsersTable/>
            </Route>
            <Route exact path="/users/edit/:id" render={props => {return <UserForm id={props.match.params.id}  isAdd={false}/>}} />
            <Route path="/users/add">
                <UserForm isAdd={true} />
            </Route>
        </Switch>
    </BrowserRouter>
);

export default AppRouter;
