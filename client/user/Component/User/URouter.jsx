import React from "react";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import UDashboard from "./UDashboard";
import WorkerHome from "../Worker/WorkerHome";
export default () => {
    return <Router>
        <Switch>
            <Route exact path={"/user"}>
                <UDashboard/>
            </Route>
            <Route exact path={"/user/dashboard"}>
                <UDashboard/>
            </Route>
            <Route exact path={"/user/messages"}>
                <WorkerHome/>
            </Route>
        </Switch>
    </Router>;
}