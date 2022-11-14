import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
//components

import AddNewUsers from "./AddNewUsers";
import UserAccountControl from "./UserAccountControl";

export default () => {
    return <Router>
        <Switch>
            <Route exact path={"/admin"}>
                 <AddNewUsers/>
            </Route>
            <Route exact path={"/admin/uam"}>
                <AddNewUsers/>
            </Route>
            <Route exact path={"/admin/uac"}>
                <UserAccountControl/>
            </Route>
        </Switch>
    </Router>;
}